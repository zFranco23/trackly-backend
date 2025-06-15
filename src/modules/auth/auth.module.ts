import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SecurityModule } from '../security/security.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, SecurityModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
