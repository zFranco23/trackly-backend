import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const userResourceId = request.params.id;

    if (userResourceId !== (request['user'] as { id: string }).id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
