import { IsInt } from "class-validator";
export class RemoveFromCartDto
{
    @IsInt()
    userId: number; // 👈 EKLE

    @IsInt()
    productId: number;
}