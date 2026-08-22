import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // conecta essa classe ao mecanismo do Passport usando a estratégia do JWT
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET não está definida no .env');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // diz onde procurar o token na requisição: no header Authorization, no formato Bearer <token>
      ignoreExpiration: false, // Não deve ignorar a expiração
      secretOrKey: jwtSecret, // chave utilizada para fazer a verificação
    });
  }

  async validate(payload: any) { // chamado automaticamente pelo Passport, só depois que ele já confirmou que a assinatura e expiração são válidads. Nest retorna esses dados, fica acessível pelo restante da aplicação via request.user dentro do controller
    return { id: payload.sub, email: payload.email };
  }
}