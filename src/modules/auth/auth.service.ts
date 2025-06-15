import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email, sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
