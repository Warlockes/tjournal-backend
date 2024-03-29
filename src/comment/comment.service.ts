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

  async create(dto: CreateCommentDto, userId: number) {
    const { text, postId } = dto;

    const comment = await this.repository.save({
      text,
      post: { id: postId },
      user: { id: userId },
    });

    return this.repository.findOne({
      where: { id: comment.id },
      relations: ['user'],
    });
  }

  async findAll(postId: number) {
    const queryBuilder = this.repository.createQueryBuilder('c');

    if (postId) {
      queryBuilder.where('c.postId = :postId', { postId });
    }

    const result = await queryBuilder
      .leftJoinAndSelect('c.post', 'post')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    return result.map((obj) => ({
      ...obj,
      post: { id: obj.post.id, title: obj.post.title },
    }));
  }

  async findOne(id: number) {
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
