import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';

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
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    const user = await this.userService.getUser(userId);

    const project = this.projectRepository.create({
      ...createProjectDto,
      user,
    });

    return this.projectRepository.save(project);
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.getProjectById(id);

    Object.assign(project, updateProjectDto);

    return this.projectRepository.save(project);
  }
}
