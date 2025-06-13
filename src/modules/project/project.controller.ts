import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): string {
    console.log('Creating project dto with', createProjectDto);

    return 'This action adds a new project';
  }
}
