import { IsNotEmpty } from 'class-validator';

export class OrderUpdateDto {
  @IsNotEmpty()
  productList: any;
  @IsNotEmpty()
  totalAmount: string;
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  shippingAddress: string;
}
