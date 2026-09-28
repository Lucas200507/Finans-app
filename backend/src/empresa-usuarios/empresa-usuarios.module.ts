import { Module } from '@nestjs/common';
import { EmpresaUsuariosService } from './empresa-usuarios.service';
import { EmpresaUsuariosController } from './empresa-usuarios.controller';

@Module({
  controllers: [EmpresaUsuariosController],
  providers: [EmpresaUsuariosService],
})
export class EmpresaUsuariosModule {}
