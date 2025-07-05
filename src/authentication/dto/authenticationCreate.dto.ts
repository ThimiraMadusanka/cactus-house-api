import { IsNotEmpty } from 'class-validator';

export class AuthenticationCreateDto {
  @IsNotEmpty()
  name: string;
}
