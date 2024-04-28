import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsService } from './cls.service';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

if (process.env.NODE_ENV === 'dev') {
  prisma.$on('query', (e) => {
    console.debug('Query: ' + e.query);
    console.debug('Params: ' + e.params);
    console.debug('Duration: ' + e.duration + 'ms');
  });
}

@Injectable()
export class PrismaService implements OnModuleDestroy {
  private prisma?: PrismaClient;

  constructor(private clsService: ClsService) {}

  onModuleDestroy() {
    if (this.prisma) {
      this.prisma.$disconnect();
    }
  }

  private createClient() {
    if (this.prisma) {
      return this.prisma;
    }

    this.prisma = prisma;

    return this.prisma;
  }

  public getClient() {
    const prisma = this.clsService.prismaTransaction.getStore();

    return prisma || this.createClient();
  }
}
