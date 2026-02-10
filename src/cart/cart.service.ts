import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/AddToCart.dto';
import { RemoveFromCartDto } from './dto/RemoveFromCart.dto';
import { UpdateCartQuantityDto } from './dto/UpdateCartQuantity.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ){}

  async addToCart(addToCartDto: AddToCartDto, userId:number) 
  {
    const existing = await this.cartRepository.findOne({
      where : { 
        user :{id: userId},// user id yi kullanarak cart tablosunda user id'si eşleşen bir kayıt var mı diye kontrol ediyoruz
        product : {id : addToCartDto.productId} // product id'si eşleşen bir kayıt var mı diye kontrol ediyoruz
      },
      relations : ['user','product'] // user ve product ilişkilerini de dahil ediyoruz
    });
    if(existing){
      existing.quantity += addToCartDto.quantity; // eğer kayıt varsa quantity'yi güncelliyoruz
      return this.cartRepository.save(existing); // güncellenmiş kaydı kaydediyoruz
    }

    const item = this.cartRepository.create({ // yeni bir cart kaydı oluşturuyoruz
      user:{id: userId},
      product:{id: addToCartDto.productId},
      quantity: addToCartDto.quantity
    });
    return this.cartRepository.save(item); // yeni kaydı kaydediyoruz
  }

  async getCartItems(userId:number){
    return this.cartRepository.find({
      where : {user : {id: userId}},
      relations : ['product'] // product ilişkisini de dahil ediyoruz
    });
  }

  async removeFromCart(userId:number, dto: RemoveFromCartDto){
    const item = await this.cartRepository.findOne({
      where : {
        user : {id: userId},
        product : {id : dto.productId},
      },
    });

    if(!item)
      throw new NotFoundException('Cart item not found'); // eğer kayıt bulunamazsa hata fırlatıyoruz
      return this.cartRepository.remove(item); // kaydı siliyoruz
    
  }

  async updateCartQuantity(userId:number , dto: UpdateCartQuantityDto){ // cart item'ının quantity'sini güncellemek için önce item'ı bulmamız gerekiyor
    const item = await this.cartRepository.findOne({
      where : {
        user : {id: userId}, // where User.userid = parametreden gelen userId'ye eşit olan kayıtları buluyoruz
        product : {id : dto.productId},
      },
    });
    if(!item) throw new NotFoundException('Cart item not found'); // eğer kayıt bulunamazsa hata fırlatıyoruz
    
    item.quantity = dto.quantity; // quantity'yi güncelliyoruz
    return this.cartRepository.save(item); // güncellenmiş kaydı kaydediyoruz
  }

  async clearCart(userId:number){
    const items = await this.getCartItems(userId); // önce kullanıcının cart item'larını buluyoruz
    return this.cartRepository.remove(items); // tüm item'ları siliyoruz
  }


}
