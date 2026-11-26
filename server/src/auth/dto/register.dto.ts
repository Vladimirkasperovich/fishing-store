import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString({ message: "Имя должно быть строкой" })
  @IsNotEmpty({ message: "Имя не может быть пустым" })
  name: string;

  @IsEmail({}, { message: "Введите корректный email" })
  email: string;

  @IsString({ message: "Пароль должен быть строкой" })
  @MinLength(8, {
    message: "Пароль должен содержать минимум 8 символов",
  })
  password: string;
}
