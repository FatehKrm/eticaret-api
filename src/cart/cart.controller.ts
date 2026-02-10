import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { UpdateCartQuantityDto } from './dto/UpdateCartQuantity.dto';
import { Req } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  add(@Req() req, @Body() dto: AddToCartDto) {
  return this.cartService.addToCart(dto,req.user.userId);
}
  
  @Get()
  getCart(@Req() req) {
    return this.cartService.getCartItems(req.user.userId);
  }

  @Delete()
  remove(@Req() req, @Body() dto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(req.user.userId, dto);
  }

  @Patch()
  update(@Req() req, @Body() dto: UpdateCartQuantityDto) {
    return this.cartService.updateCartQuantity(req.user.userId, dto);
  }

  @Delete('clear')
  clear(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }


}
