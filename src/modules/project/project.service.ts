import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  createProject(createProjectDto: CreateProjectDto) {
    console.log('[SERVICE] createProjectDto', createProjectDto);

    // return {
    //   id: '1',
    //   name: createProjectDto.name,
    //   description: createProjectDto.description,
    //   repositoryUrl: createProjectDto.repositoryUrl,
    // };
  }
}
