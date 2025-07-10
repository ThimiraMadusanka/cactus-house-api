import { IsNotEmpty } from 'class-validator';

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  amount: string;
};

export class OrderUpdateDto {
  @IsNotEmpty()
  productList: Product[];
  @IsNotEmpty()
  totalAmount: string;
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  shippingAddress: string;
}
