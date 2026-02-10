import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { UpdateCartQuantityDto } from './dto/UpdateCartQuantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  add(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto, dto.userId); // 👈 DTO'dan al
  }
  
  @Get(':userId') // 👈 URL'den userId al
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCartItems(+userId);
  }

  @Delete()
  remove(@Body() dto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(dto.userId, dto); // 👈 DTO'dan al
  }

  @Patch()
  update(@Body() dto: UpdateCartQuantityDto) {
    return this.cartService.updateCartQuantity(dto.userId, dto); // 👈 DTO'dan al
  }

  @Delete('clear/:userId') // 👈 URL'den userId al
  clear(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}