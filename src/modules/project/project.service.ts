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

  async getProjectsByUserId(id: string) {
    return this.projectRepository.find({
      where: { user: { id } },
    });
  }

  async getProjectById(id: string) {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    const user = await this.userService.getUser(userId);

    const project = this.projectRepository.create({
      ...createProjectDto,
      user,
    });

    return this.projectRepository.save(project);
  }
}
