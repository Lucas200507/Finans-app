import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable() // AuthGuard('jwt'): classe generica do @nestjs/passport que sabe explicar qualquer estratégia registrada -> jwt é o nome padrão que a Strategy do passport-jwt se registra automaticamente
export class JwtAuthGuard extends AuthGuard('jwt'){} // não tem corpo ois toda a lógic pesada já está no AuthGuard genérico e na JwtGuard

