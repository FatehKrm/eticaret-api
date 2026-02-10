import { IsInt, Min } from "class-validator";
export class AddToCartDto 
{
    @IsInt()
    userId: number; // 👈 EKLE

    @IsInt()
    productId: number;

    @IsInt()
    @Min(1)
    quantity: number;
}