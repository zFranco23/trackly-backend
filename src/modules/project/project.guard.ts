import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const projectResourceId = request.params.id;

    const userId = (request['user'] as { id: string }).id;

    const project = await this.projectService.getProjectById(projectResourceId);

    if (project.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );
    }

    return true;
  }
}
