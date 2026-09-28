import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpresaUsuariosService } from './empresa-usuarios.service';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';
import { UpdateEmpresaUsuarioDto } from './dto/update-empresa-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('empresa-usuarios')
export class EmpresaUsuariosController {
  constructor(private readonly empresaUsuariosService: EmpresaUsuariosService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmpresaUsuarioDto: CreateEmpresaUsuarioDto) {
    return this.empresaUsuariosService.create(createEmpresaUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.empresaUsuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaUsuariosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaUsuarioDto: UpdateEmpresaUsuarioDto) {
    return this.empresaUsuariosService.update(+id, updateEmpresaUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaUsuariosService.remove(+id);
  }

  // Caso do envio de convite para o usuário, o status do convite será "PENDENTE" e o usuário poderá aceitar ou recusar o convite.
  @Patch(':id/aceitar')
  aceitar(@Param('id') id: string) {
    return this.empresaUsuariosService.atualizarStatus(+id, 'ACEITO');
  }

  @Patch(':id/recusar')
  recusar(@Param('id') id: string) {
    return this.empresaUsuariosService.atualizarStatus(+id, 'RECUSADO');
  }
}
