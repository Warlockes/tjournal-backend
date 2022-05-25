import { Exclude } from 'class-transformer';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    nullable: false,
    eager: false,
  })
  comments: CommentEntity[];

  @Column({
    default: 0,
  })
  rating: number;

  @Column({ nullable: true, select: false })
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
