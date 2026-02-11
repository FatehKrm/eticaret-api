import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderFromCartDto } from './dto/create-order-from-cart.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  
  @Post('add/:userId')
  createFromCart(
    @Param('userId') userId: string,
    @Body() createOrderDto: CreateOrderFromCartDto, 
  ) {
    return this.orderService.createOrderFromCart(+userId, createOrderDto);
  }
   @Get('user/:userId')
  getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getUserOrders(+userId);
  }
  @Get(':orderId/user/:userId')
  getOrder(@Param('orderId') orderId: string, @Param('userId') userId: string) {
    return this.orderService.getOrderById(+orderId, +userId);
  }

  @Delete(':orderId/user/:userId')
  cancelOrder(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {
    return this.orderService.cancelOrder(+orderId, +userId);
  }

}
