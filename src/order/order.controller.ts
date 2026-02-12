import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderFromCartDto } from './dto/create-order-from-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Sepetten sipariş oluştur' })
  @ApiResponse({ status: 201, description: 'Sipariş başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Sepet boş veya stok yetersiz' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı' })
  createFromCart(
    @GetUser('userId') userId: number,
    @Body() createOrderDto: CreateOrderFromCartDto, 
  ) {
    return this.orderService.createOrderFromCart(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Kullanıcının tüm siparişlerini listele' })
  @ApiResponse({ status: 200, description: 'Sipariş listesi başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  getUserOrders(@GetUser('userId') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Belirli bir siparişin detaylarını getir' })
  @ApiResponse({ status: 200, description: 'Sipariş detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Sipariş bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  @ApiResponse({ status: 403, description: 'Bu siparişe erişim yetkiniz yok' })
  getOrder(
    @Param('orderId') orderId: string, 
    @GetUser('userId') userId: number
  ) {
    return this.orderService.getOrderById(+orderId, userId);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Siparişi iptal et' })
  @ApiResponse({ status: 200, description: 'Sipariş başarıyla iptal edildi' })
  @ApiResponse({ status: 404, description: 'Sipariş bulunamadı' })
  @ApiResponse({ status: 400, description: 'Sadece bekleyen (pending) siparişler iptal edilebilir' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  @ApiResponse({ status: 403, description: 'Bu siparişe erişim yetkiniz yok' })
  cancelOrder(
    @Param('orderId') orderId: string,
    @GetUser('userId') userId: number
  ) {
    return this.orderService.cancelOrder(+orderId, userId);
  }
}