import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { StrategiesModule } from './strategies/strategies.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule,// PassportModule, JWT stratejisi gibi kimlik doğrulama stratejilerini kullanmak için gerekli olan modül.
    UsersModule,
    JwtModule.register({
      secret:'supersecret',
      signOptions:{expiresIn:'1h'}
    }),
    StrategiesModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
// jwt yapılandırma yapıldı, secret key ve token süresi belirlendi. 
// UsersModule de import edildi çünkü auth service içinde user servisi kullanılacak.