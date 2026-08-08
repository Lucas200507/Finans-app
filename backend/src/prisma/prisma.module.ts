import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// Precisa exportar o PrismaService para outros módulos poderem usá-lo:
@Global() // faz esse modulo ficar disponivel em toda a aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}