import { IsNotEmpty } from 'class-validator';

export class ChatResourceUpdateDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  images: string;
}
