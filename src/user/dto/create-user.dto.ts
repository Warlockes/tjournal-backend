import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле не может быть пустым' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @MinLength(6, { message: 'Длина пароля не менее 6 символов' })
  password?: string;
}
