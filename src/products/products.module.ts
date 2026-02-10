import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // bu satırın c# da karşılığı yoktur, bu satır TypeORM modülünü ürünler modülüne dahil eder ve Product entity'sini kullanıma açar
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
