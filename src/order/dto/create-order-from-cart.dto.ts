import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderFromCartDto {
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}