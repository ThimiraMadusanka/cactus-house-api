import { IsNotEmpty } from 'class-validator';

export class ContentCreateDto {
  @IsNotEmpty()
  name: string;
}
