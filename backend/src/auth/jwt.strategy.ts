import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsuariosService } from '../usuarios/usuarios.service';

function extrairTokenDoCookie(req: Request): string | null {
  if (req && req.cookies) {
    return req.cookies['token'];
  }
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET não está definida no .env');
    }

    super({
      jwtFromRequest: extrairTokenDoCookie,
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    return this.usuariosService.findOne(payload.sub); // sub é o id do usuário que foi colocado no payload
  }
}