import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; senha: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, usuario } = await this.authService.login(body.email, body.senha);

    res.cookie('token', access_token, { // seta o cookie nas respostas
      httpOnly: true,  // impede que o js no navegador leia esse cookie
      secure: false, 
      sameSite: 'lax', // controla em quais situações o cookie é enviado entre sites diferentes
      maxAge: 24 * 60 * 60 * 1000, // validade do cookie em milissegundos 24horas
    });

    return { usuario };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token'); // limpa o cookie do navegador
    return {message: 'Logout realizado com sucesso'};
  }
}