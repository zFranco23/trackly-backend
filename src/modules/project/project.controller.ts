import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { SecurityGuard } from '../security/security.guard';
import { ProjectGuard } from './project.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(SecurityGuard)
  @Get()
  getProjects(@Req() req: Request): Promise<Project[]> {
    const userId = (req['user'] as { id: string }).id;
    return this.projectService.getProjectsByUserId(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SecurityGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const userId = (req['user'] as { id: string }).id;
    return this.projectService.createProject(userId, createProjectDto);
  }

  @UseGuards(SecurityGuard, ProjectGuard)
  @Get(':id')
  getProjectById(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.getProjectById(id);
  }
}
