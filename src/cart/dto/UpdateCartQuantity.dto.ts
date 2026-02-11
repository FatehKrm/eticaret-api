import { IsInt, Min } from 'class-validator';

export class UpdateCartQuantityDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}