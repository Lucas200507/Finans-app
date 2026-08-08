import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Olá lucas, a API do FINANS está rodando sem erro na porta: ${process.env.PORT}`;
  }
}
