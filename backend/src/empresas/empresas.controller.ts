import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';


interface RequestComUsuario extends Request {
  user: { id: number; email: string };
}

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto, @Req() req: RequestComUsuario) {
    return this.empresasService.create(createEmpresaDto, req.user.id);
  }

 @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: RequestComUsuario) {
    return this.empresasService.findAllPorUsuario(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto);
  }

  // O CLIENTE NÃO PODE TER A PERMISSÃO DE EXLUIR EMPRESA, CONTUDO, PODE ALTERAR O STATUS PARA 'INATIVA'
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.empresasService.remove(+id);
  // }    
}
