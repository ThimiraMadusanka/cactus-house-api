import { IsNotEmpty } from 'class-validator';

export class ProductUpdateDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  imageUrl: string;
  @IsNotEmpty()
  tags: string;
}
