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
  fileContent: string;
  @IsNotEmpty()
  fileName: string;
  @IsNotEmpty()
  contentType: string;
  @IsNotEmpty()
  tags: string[];
}
