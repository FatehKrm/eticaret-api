import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { Order } from './order/entities/order.entity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host : process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', 
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// bu sayfada genel olarak uygulamanın modüllerini,
//  controllerlarını ve servislerini tanımlıyoruz.
//  ConfigModule ile .env dosyasını global olarak kullanıma açıyoruz.
// TypeOrmModule ile de veritabanı bağlantısını yapılandırıyoruz.