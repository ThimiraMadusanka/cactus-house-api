import { IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  contactNumber: string;
  @IsNotEmpty()
  billingAddress: string;
}
