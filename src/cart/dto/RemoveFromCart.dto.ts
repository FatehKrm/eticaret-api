import { IsInt } from "class-validator";

export class RemoveFromCartDto
{
    @IsInt()
    productId: number;
}