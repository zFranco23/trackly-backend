import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from '@/modules/project/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
