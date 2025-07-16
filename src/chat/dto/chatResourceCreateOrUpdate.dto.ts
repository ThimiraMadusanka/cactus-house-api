import { IsNotEmpty } from 'class-validator';

export class ChatResourceCreateOrUpdateDto {
  @IsNotEmpty()
  description: string;
}
