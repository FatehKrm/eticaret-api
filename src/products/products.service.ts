import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';



@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ){}


  create(createProductDto: CreateProductDto) {
    const product = this._productRepository.create(createProductDto);
    return this._productRepository.save(product);
  }

  findAll() {
    return this._productRepository.find({where : {isActive: true}});
  }

  async findOne(id: number) {
    const product = await this._productRepository.findOne({where: {id}});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto); // DTO'daki alanları mevcut ürüne kopyala
    return this._productRepository.save(product); // Güncellenmiş ürünü kaydet

  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this._productRepository.remove(product);
  }
}
