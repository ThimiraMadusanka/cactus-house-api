import { IsNotEmpty } from 'class-validator';

export class chatCreateDto {
  @IsNotEmpty()
  name: string;
}
