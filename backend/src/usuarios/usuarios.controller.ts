import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';

interface RequestComUsuario extends Request {
  user: { id: number; email: string };
}

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard) // Somente com cookie (Logado)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // Somente com cookie (Logado)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Req() req: RequestComUsuario) {
    // Somente o usuario logado pode atualizar seus dados
    const usuarioLogado = req.user as {id: number}; // Pegando o id do usuario logado do request
    if (usuarioLogado.id !== +id) { // Se o id do usuario logado for diferente do id do usuario que está tentando atualizar
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário'); // Erro 403 Forbidden, eu sei quem você é, mas não tem permissão para fazer isso
    }
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard) // Somente com cookie (Logado)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  // Para o caso de enviar um convite para um usuário  
  @UseGuards(JwtAuthGuard)
  @Get('buscar/:email')
  async buscarPorEmail(@Param('email') email: string) {
    const usuario = await this.usuariosService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}
