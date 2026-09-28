import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import type { Response , Request} from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard) // Somente com cookie (Logado)
  @Get('me')
  async me(@Req() req: Request){ // @Req -> é o decorator que dá acesso ao objeto de requisição do Express
      return req.user; // Retorna os dados do usuário logado
  }

}