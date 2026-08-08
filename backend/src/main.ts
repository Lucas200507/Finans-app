import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aceitando requisições vinda da porta 3000 ->  front end
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  app.useGlobalPipes(new ValidationPipe()); // lê os decorators do DTO e rejeita a requisição se não bater com as validações
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
