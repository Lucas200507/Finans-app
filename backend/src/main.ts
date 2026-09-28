import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aceitando requisições vinda da porta 3000 ->  front end
  app.use(cookieParser()); // para ler o cookie enviado pelo front end
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // obrigatorio para o uso de cookies
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // rejeita a requisição se tiver propriedades que não estão no DTO
  })); // lê os decorators do DTO e rejeita a requisição se não bater com as validações
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
