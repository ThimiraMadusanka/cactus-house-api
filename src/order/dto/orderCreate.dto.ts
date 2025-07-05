import { IsNotEmpty } from 'class-validator';

export class OrderCreateDto {
  @IsNotEmpty()
  name: string;
}
