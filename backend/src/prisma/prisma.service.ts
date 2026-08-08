import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

// extends PrismaClient -> o PrismaService é um Prisma Client, só que agora gerenciado pelo Nest (injetável em qualquer lugar via DI)
// implements OnModuleinit -> é um 'hook' do ciclo de vida do NEST. Quando a aplicação sobe, o método onModuleInit() roda automaticamente, garantindo que a conexão com o banco $connect() já esteja aberta antes de qualquer request chegar.
// O import do PrismaClient vem de ../..generated/prisma pois lembra que o schema.prima o generator tem output = "../generated/prisma" - é ali que o Prisma gera o client, nã oem node_modules como era antes no Prisma 6