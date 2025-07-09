import { IsNotEmpty } from 'class-validator';

export class ChatResourceCreateDto {
  @IsNotEmpty()
  description: string;
}
