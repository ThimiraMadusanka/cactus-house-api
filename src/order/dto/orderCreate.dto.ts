import { IsNotEmpty } from 'class-validator';

export class OrderCreateDto {
  @IsNotEmpty()
  userRid: number;
  @IsNotEmpty()
  productList: any;
  @IsNotEmpty()
  totalAmount: string;
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  shippingAddress: string;
}
