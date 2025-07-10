import { IsNotEmpty } from 'class-validator';

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
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
