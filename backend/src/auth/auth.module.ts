import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // CHAVE GLOBAL
      signOptions: {expiresIn: '1d'},  // 1 DIA DE EXPIRAÇÃO
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  
  exports: [JwtModule], // Exportando o jwt
})
export class AuthModule {}
