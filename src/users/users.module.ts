import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],  // User Entity'sini TypeOrm'a tanıtıyoruz
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]  // UsersService'i diğer modüllerde kullanabilmek için export ediyoruz.
})
export class UsersModule {}
// Module sayfası genellikle controller ve service dosyalarını birbirine bağlamak için 
// kullanılır. Ayrıca burada TypeOrmModule'u import ederek User Entity'sini tanıtıyoruz.