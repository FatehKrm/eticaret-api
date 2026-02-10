import { IsString, IsNotEmpty, IsArray, ValidateNested, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto 
{
    @IsInt()
    productId: number;  

    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto
{
    @IsInt()
    userId: number; 

    @IsArray() // items alanının bir dizi olduğunu belirtir
    @ValidateNested({ each: true }) // her bir öğe için doğrulama yapılacak
    @Type(() => CreateOrderItemDto ) // dönüşüm için gerekli
    items: CreateOrderItemDto[];  // bu bir dizi, çünkü bir sipariş birden fazla ürünü içerebilir

    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}