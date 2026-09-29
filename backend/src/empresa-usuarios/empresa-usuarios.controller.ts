import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmpresaUsuariosService } from './empresa-usuarios.service';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';
import { UpdateEmpresaUsuarioDto } from './dto/update-empresa-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface RequestComUsuario extends Request {
  user: { id: number; email: string };
}

@Controller('empresa-usuarios')
export class EmpresaUsuariosController {
  constructor(private readonly empresaUsuariosService: EmpresaUsuariosService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmpresaUsuarioDto: CreateEmpresaUsuarioDto, @Req() req: RequestComUsuario) {
    return this.empresaUsuariosService.create(createEmpresaUsuarioDto, req.user.id);
  }

  // Deve vir antes de rotas com parâmetros, para não ser confundida com a rota findOne
  @UseGuards(JwtAuthGuard)
  @Get('meus-convites')
  meusConvites(@Req() req: RequestComUsuario) {
    return this.empresaUsuariosService.findConvitesPendentes(req.user.id);
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
  @UseGuards(JwtAuthGuard)
  @Patch(':id/aceitar')
  aceitar(@Param('id') id: string, @Req() req: RequestComUsuario) {
    return this.empresaUsuariosService.aceitar(+id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/recusar')
  recusar(@Param('id') id: string, @Req() req: RequestComUsuario) {
    return this.empresaUsuariosService.recusar(+id, req.user.id);
  }  
}
