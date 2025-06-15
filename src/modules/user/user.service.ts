import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const { email, ...restUserData } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(restUserData.password, 10);

    const user = this.userRepository.create({
      ...restUserData,
      email,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restNewUserData } =
      await this.userRepository.save(user);
    return restNewUserData;
  }

  async getUsers() {
    return this.userRepository.find({
      relations: ['projects'],
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'lastName', 'password'],
    });
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.getUser(userId);

    Object.assign(user, {
      email: updateUserDto.email,
      name: updateUserDto.name,
      lastName: updateUserDto.lastName,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restNewUserData } =
      await this.userRepository.save(user);
    return restNewUserData;
  }
}
