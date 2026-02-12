import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı kaydı oluştur (Kayıt)' })
  @ApiResponse({ status: 201, description: 'Kullanıcı başarıyla oluşturuldu' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri - Email formatı hatalı veya şifre 6 karakterden az' })
  @ApiResponse({ status: 409, description: 'Bu email adresi zaten kayıtlı' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Tüm kullanıcıları listele (Admin)' })
  @ApiResponse({ status: 200, description: 'Kullanıcı listesi başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Kendi profil bilgilerini getir' })
  @ApiResponse({ status: 200, description: 'Profil bilgileri başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  getProfile(@GetUser('userId') userId: number) {
    return this.usersService.findOne(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir kullanıcının detaylarını getir' })
  @ApiResponse({ status: 200, description: 'Kullanıcı detayı başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelle' })
  @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla güncellendi' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  @ApiResponse({ status: 400, description: 'Geçersiz veri' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Kullanıcıyı sil' })
  @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla silindi' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim - JWT token gerekli' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}