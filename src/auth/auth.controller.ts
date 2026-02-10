import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController 
{
    constructor(private readonly authService : AuthService){}

    @Post('login')
    login(@Body() dto:LoginDto){
        return this.authService.login(dto.email, dto.password); 
        // bu method auth service içindeki login methodunu çağıracak, dto içindeki email ve password bilgilerini parametre olarak verecek.
    }
}
// @Body() decorator'ı ile gelen request body'sindeki verileri
//  LoginDto'ya map ediyoruz, böylece email ve password 
// bilgilerini alabiliyoruz. LoginDto'da validation kuralları da var, 
// bu sayede geçersiz email veya boş password gibi durumlarda otomatik
//  olarak hata dönecektir.