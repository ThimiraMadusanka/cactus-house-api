import { IsNotEmpty } from 'class-validator';

export class ContactCreateDto {
  @IsNotEmpty()
  name: string;
}
