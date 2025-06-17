import {
  Controller,
  Get,
  // Post,
  Body,
  Param,
  Put,
  // HttpCode,
  // HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

import { SecurityGuard } from '@security/security.guard';
import { UserGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  // create(
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<Omit<User, 'password'>> {
  //   return this.usersService.createUser(createUserDto);
  // }

  @UseGuards(SecurityGuard)
  @Get('')
  getUser(@Req() req: Request): Promise<User> {
    const userId = (req['user'] as { id: string }).id;
    return this.usersService.getUser(userId);
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
