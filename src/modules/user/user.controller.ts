import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // TODO: for admin version
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUser(id);
  }
}
