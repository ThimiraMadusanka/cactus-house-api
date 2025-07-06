import { IsNotEmpty } from 'class-validator';

export class OrderUpdateDto {
  @IsNotEmpty()
  productList: string;
  @IsNotEmpty()
  totalAmount: string;
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  shippingAddress: string;
}
