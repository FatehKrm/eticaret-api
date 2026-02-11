import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderFromCartDto } from './dto/create-order-from-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createFromCart(
    @GetUser('userId') userId: number,
    @Body() createOrderDto: CreateOrderFromCartDto, 
  ) {
    return this.orderService.createOrderFromCart(userId, createOrderDto);
  }

  @Get()
  getUserOrders(@GetUser('userId') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':orderId')
  getOrder(
    @Param('orderId') orderId: string, 
    @GetUser('userId') userId: number
  ) {
    return this.orderService.getOrderById(+orderId, userId);
  }

  @Delete(':orderId')
  cancelOrder(
    @Param('orderId') orderId: string,
    @GetUser('userId') userId: number
  ) {
    return this.orderService.cancelOrder(+orderId, userId);
  }
}