import { IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  userRid: number;
  @IsNotEmpty()
  productRid: number;
  @IsNotEmpty()
  amount: string;
}
