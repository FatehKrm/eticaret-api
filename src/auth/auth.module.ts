import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { StrategiesModule } from './strategies/strategies.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET') || 'fallback-secret',
      signOptions: { 
      expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN') || '3600')  
    },
  }),
}),
    StrategiesModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}