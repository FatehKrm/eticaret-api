import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CreateOrderFromCartDto } from './dto/create-order-from-cart.dto';


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,  

  ) {}

    async createOrderFromCart(userId: number, createOrderDto: CreateOrderFromCartDto){
    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
    if(cartItems.length===0) throw new BadRequestException("Sepetiniz boş!");
    
    const order = this.orderRepository.create({
      user: { id: userId },
      shippingAddress: createOrderDto.shippingAddress,
      phoneNumber: createOrderDto.phone,
      status: OrderStatus.PENDING,
      totalAmount:0,
    });
    
    const saveOrder = await this.orderRepository.save(order);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];
    for ( const cartItem of cartItems) // foreach ile sepet ürünlerini dolaşıyoruz
      {
         if(cartItem.product.stock < cartItem.quantity) // stok kontrolü yapıyoruz
         {
          throw new BadRequestException(`${cartItem.product.name} ürününden yeterli stok bulunmamaktadır!`);
         }
         const orderItem = this.orderItemRepository.create({
          order :saveOrder,
          product : cartItem.product,
          quantity : cartItem.quantity,
          price : cartItem.product.price,
         });
         orderItems.push(orderItem);
         totalAmount += cartItem.product.price * cartItem.quantity;

         cartItem.product.stock -= cartItem.quantity; // stoktan düşüyoruz
         await this.productRepository.save(cartItem.product); // güncellenmiş ürünü kaydediyoruz
        }

        await this.orderItemRepository.save(orderItems); // order itemları kaydediyoruz
        saveOrder.totalAmount = totalAmount; // toplam tutarı güncelliyoruz
        await this.orderRepository.save(saveOrder); // güncellenmiş orderı kaydediyoruz

        await this.cartRepository.remove(cartItems); // sepeti temizliyoruz

        return this.orderRepository.findOne({
          where : { id: saveOrder.id },
          relations : ['orderItems', 'orderItems.product', 'user']
        });
  }
  async getUserOrders(userId:number){
    return this.orderRepository.find({
      where:{user : {id : userId}}, //c# daki karşılığı : where: x => x.user.id == userId
      relations : ['orderItems','orderItems.product'],
      order : { createdAt : 'DESC'}, // c# daki karşılığı : orderBy: x => x.createdAt, direction: 'DESC'
    });
  }
  async getOrderById(orderId:number, userId:number)
  {
     const order = await this.orderRepository.findOne({
      where : {id :orderId, user: {id : userId}},
      relations : ['orderItems','orderItems.product', 'user'],
     });
     if(!order) throw new NotFoundException("Sipariş bulunamadı!");
      return order;
  }

  async cancelOrder(orderId:number, userId:number){
    const order = await this.orderRepository.findOne({
      where : {id :orderId, user: {id : userId}},
      relations :['orderItems','orderItems.product'],
    });

    if(!order) throw new NotFoundException("Sipariş bulunamadı!");
    if(order.status !== OrderStatus.PENDING) throw new BadRequestException("Sadece bekleyen siparişler iptal edilebilir!");
 
    for(const item of order.orderItems)
    {
      item.product.stock += item.quantity; // stokları geri ekliyoruz
      await this.productRepository.save(item.product); // güncellenmiş ürünü kaydediyoruz
    }

    order.status = OrderStatus.CANCELLED; // siparişi iptal ediyoruz
    return this.orderRepository.save(order); // güncellenmiş siparişi kaydediyoruz
  }



}

