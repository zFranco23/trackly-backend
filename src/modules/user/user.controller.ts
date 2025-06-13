import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all user';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    console.log('Creating userr dto with', createUserDto);

    return 'This action creates a new user';
  }
}
