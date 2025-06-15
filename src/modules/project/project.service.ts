import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  async getProjects() {
    return this.projectRepository.find({
      relations: ['user'],
    });
  }

  async getProjectById(id: string) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createProject(createProjectDto: CreateProjectDto) {
    const { userId, ...projectData } = createProjectDto;

    const user = await this.userService.getUser(userId);

    const project = this.projectRepository.create({
      ...projectData,
      user,
    });
    return this.projectRepository.save(project);
  }
}
