import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/services/prisma.service';
import { ClsService } from './shared/services/cls.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, ClsService],
})
export class AppModule {}
