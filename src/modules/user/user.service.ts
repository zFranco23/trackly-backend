import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    console.log('[SERVICE] createUserDto', createUserDto);

    // return {
    //   id: '1',
    //   name: createUserDto.name,
    //   email: createUserDto.email,
    //   password: createUserDto.password,
    // };
  }
}
