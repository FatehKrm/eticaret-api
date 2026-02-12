import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yeni ürün oluştur (Admin)' })
  @ApiResponse({ status: 201, description: 'Ürün başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm aktif ürünleri listele' })
  @ApiResponse({ status: 200, description: 'Ürün listesi başarıyla getirildi' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir ürünün detaylarını getir' })
  @ApiResponse({ status: 200, description: 'Ürün detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ürün bilgilerini güncelle (Admin)' })
  @ApiResponse({ status: 200, description: 'Ürün başarıyla güncellendi' })
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ürünü sil (Admin)' })
  @ApiResponse({ status: 200, description: 'Ürün başarıyla silindi' })
  @ApiResponse({ status: 404, description: 'Ürün bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}