import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  create(dto: CreateCommentDto) {
    const { text, postId } = dto;

    return this.repository.save({
      text,
      post: { id: postId },
      user: { id: 1 },
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateCommentDto) {
    const { text } = dto;

    return this.repository.update(id, {
      text,
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
