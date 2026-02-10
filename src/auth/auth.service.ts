import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { access } from 'fs';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly userService : UsersService,
        private readonly JwtService : JwtService
    ){}

    async login(email : string, password : string)
    {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new UnauthorizedException('Invalid credentials');

        const payload = {sub: user.id, email: user.email};  // burda token içine user id ve email bilgisi koyuluyor, sub genelde user id için kullanılır.
        return {
    access_token: this.JwtService.sign(payload),
};
}
}
