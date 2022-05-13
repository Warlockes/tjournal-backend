import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { UniqueOnDatabase } from '../validations/UniqueValidation';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Пользователь с такой почтой уже существует',
  })
  email: string;

  @MinLength(6, { message: 'Длина пароля не менее 6 символов' })
  password?: string;
}
