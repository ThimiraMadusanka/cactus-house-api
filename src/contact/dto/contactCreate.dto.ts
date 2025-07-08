import { IsNotEmpty } from 'class-validator';

export class ContactCreateDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  message: string;
}
