import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, null, { message: 'Пароль должен быть минимум 6 символов' })
  password?: string;
}
