import { IsNotEmpty } from 'class-validator';

export class OrderUpdateDto {
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  shippingAddress: string;
}
