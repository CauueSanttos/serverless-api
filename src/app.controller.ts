import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.getUsers();
  }

  @Post()
  insert(@Body() createUserDto: CreateUserDto) {
    return this.appService.insertUser(createUserDto);
  }
}
