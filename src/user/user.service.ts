import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    const { fullName, email, password } = dto;

    return this.repository.save({
      fullName,
      email,
      password,
    });
  }

  async findAll() {
    const arr = await this.repository
      .createQueryBuilder('u')
      .leftJoinAndMapMany(
        'u.comments',
        CommentEntity,
        'comment',
        'comment.userId = u.id',
      )
      .loadRelationCountAndMap('u.commentsCount', 'u.comments', 'comments')
      .getMany();

    return arr.map((obj) => {
      delete obj.comments;
      return obj;
    });
  }

  findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne({
      where: {
        ...cond,
      },
    });
  }

  update(id: number, dto: UpdateUserDto) {
    const { email, fullName, password } = dto;

    return this.repository.update(id, {
      fullName,
      email,
      password,
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async search(dto: SearchUserDto) {
    const queryBuilder = this.repository.createQueryBuilder('u');

    queryBuilder.limit(dto.limit || 0);
    queryBuilder.take(dto.take || 10);

    if (dto.fullName) {
      queryBuilder.andWhere(`u.fullName ILIKE :fullName`);
    }

    if (dto.email) {
      queryBuilder.andWhere(`u.email ILIKE :email`);
    }

    queryBuilder.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
    });

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      users,
      total,
    };
  }
}
