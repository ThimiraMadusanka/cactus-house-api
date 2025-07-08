import { IsNotEmpty } from 'class-validator';

export class UserResetPasswordDto {
  @IsNotEmpty()
  password: string;
}
