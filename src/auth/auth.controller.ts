import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController 
{
    constructor(private readonly authService : AuthService){}
    @Post('login')
    @ApiOperation({ summary: 'Kullanıcı girişi' })
    @ApiResponse({ status: 200, description: 'Giriş başarılı, JWT token döndü' })
    @ApiResponse({ status: 401, description: 'Geçersiz kimlik bilgileri' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }
}
// @Body() decorator'ı ile gelen request body'sindeki verileri
//  LoginDto'ya map ediyoruz, böylece email ve password 
// bilgilerini alabiliyoruz. LoginDto'da validation kuralları da var, 
// bu sayede geçersiz email veya boş password gibi durumlarda otomatik
//  olarak hata dönecektir.