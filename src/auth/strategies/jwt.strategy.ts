import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    async validate(payload:any){
        return {userId:payload.sub, email:payload.email};
    } // bu method, JWT'nin geçerli olduğunu doğruladıktan sonra çağrılır ve payload içindeki bilgileri döndürür. Bu bilgiler, daha sonra uygulamanın diğer bölümlerinde kullanılabilir.
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'supersecret',
        });
    }
}
// payload : JWT'nin içinde bulunan bilgileri temsil eder. Genellikle, kullanıcı kimliği (userId) ve e-posta gibi bilgileri içerir. Bu bilgiler, JWT'nin doğrulanması sırasında kullanılır ve uygulamanın diğer bölümlerinde erişilebilir hale gelir.