import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EmpresaUsuariosModule } from './empresa-usuarios/empresa-usuarios.module';

@Module({
  imports: [UsuariosModule, TransacoesModule, EnderecosModule, PrismaModule, AuthModule, EmpresasModule, EmpresaUsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
