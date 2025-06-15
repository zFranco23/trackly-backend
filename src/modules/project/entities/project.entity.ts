import { User } from '@/modules/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  repository: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
