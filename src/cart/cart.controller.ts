import { Controller, Get, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { UpdateCartQuantityDto } from './dto/UpdateCartQuantity.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
@UseGuards(AuthGuard('jwt'))  
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Sepete ürün ekle' })
  @ApiResponse({ status: 201, description: 'Ürün sepete eklendi' })
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  add(@Body() dto: AddToCartDto, @GetUser('userId') userId: number) { 
    return this.cartService.addToCart(dto, userId);
  }
  
  @Get()
  @ApiOperation({ summary: 'Sepeti görüntüle' })
  @ApiResponse({ status: 200, description: 'Sepet içeriği başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  getCart(@GetUser('userId') userId: number) {  
    return this.cartService.getCartItems(userId);
  }

  @Delete('item')
  @ApiOperation({ summary: 'Sepetten ürün çıkar' })
  @ApiResponse({ status: 200, description: 'Ürün sepetten çıkarıldı' })
  @ApiResponse({ status: 404, description: 'Sepet öğesi bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  remove(@Body() dto: RemoveFromCartDto, @GetUser('userId') userId: number) {  
    return this.cartService.removeFromCart(userId, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Sepetteki ürün miktarını güncelle' })
  @ApiResponse({ status: 200, description: 'Miktar güncellendi' })
  @ApiResponse({ status: 404, description: 'Sepet öğesi bulunamadı' })
  @ApiResponse({ status: 400, description: 'Geçersiz miktar' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  update(@Body() dto: UpdateCartQuantityDto, @GetUser('userId') userId: number) {  
    return this.cartService.updateCartQuantity(userId, dto);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Sepeti tamamen temizle' })
  @ApiResponse({ status: 200, description: 'Sepet temizlendi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  clear(@GetUser('userId') userId: number) { 
    return this.cartService.clearCart(userId);
  }
}