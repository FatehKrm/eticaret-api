import { Controller, Get, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { UpdateCartQuantityDto } from './dto/UpdateCartQuantity.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('cart')
@UseGuards(AuthGuard('jwt'))  
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  add(@Body() dto: AddToCartDto, @GetUser('userId') userId: number) { 
    return this.cartService.addToCart(dto, userId);
  }
  
  @Get()  
  getCart(@GetUser('userId') userId: number) {  
    return this.cartService.getCartItems(userId);
  }

  @Delete('item')  
  remove(@Body() dto: RemoveFromCartDto, @GetUser('userId') userId: number) {  
    return this.cartService.removeFromCart(userId, dto);
  }

  @Patch()
  update(@Body() dto: UpdateCartQuantityDto, @GetUser('userId') userId: number) {  
    return this.cartService.updateCartQuantity(userId, dto);
  }

  @Delete('clear')  
  clear(@GetUser('userId') userId: number) { 
    return this.cartService.clearCart(userId);
  }
}