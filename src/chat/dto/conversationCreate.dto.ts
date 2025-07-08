import { IsNotEmpty } from 'class-validator';

export class ConverstionCreateDto {
  @IsNotEmpty()
  messageContent: string;
}
