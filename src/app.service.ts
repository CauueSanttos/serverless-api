import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from './shared/services/prisma.service';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  getUsers() {
    return this.prismaService.getClient().user.findMany();
  }

  insertUser(createUser: CreateUserDto) {
    return this.prismaService.getClient().user.create({
      data: {
        ...createUser,
      }
    });
  }
}
