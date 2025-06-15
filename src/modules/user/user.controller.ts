import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

import { SecurityGuard } from '@security/security.guard';
import { UserGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // TODO: for admin version
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.getUsers();
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(SecurityGuard, UserGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @UseGuards(SecurityGuard, UserGuard)
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
