import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(1, null, { message: 'Поле не может быть пустым' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, null, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
