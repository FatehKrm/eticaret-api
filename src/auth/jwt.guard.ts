import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jWTGuard extends AuthGuard('jwt') {}
// JWTGuard, Passport'ın AuthGuard sınıfını genişleterek oluşturulmuş bir kimlik doğrulama koruyucusudur. 'jwt' stratejisini kullanarak gelen isteklerde JWT doğrulaması yapar. Bu guard, belirli rotalara erişimi korumak için kullanılabilir ve geçerli bir JWT içeren isteklerin geçmesine izin verir.