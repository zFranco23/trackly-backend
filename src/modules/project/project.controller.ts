import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.getProjectById(id);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }
}
