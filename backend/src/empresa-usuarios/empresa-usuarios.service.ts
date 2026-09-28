import { Injectable } from '@nestjs/common';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';
import { UpdateEmpresaUsuarioDto } from './dto/update-empresa-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusConvite } from '@prisma/client/wasm';

@Injectable()
export class EmpresaUsuariosService {
  constructor(private prisma: PrismaService) {}

  create(createEmpresaUsuarioDto: CreateEmpresaUsuarioDto) {
    return this.prisma.empresa_Usuario.create({
      data: createEmpresaUsuarioDto,
    });
  }

  findAll() {
    return this.prisma.empresa_Usuario.findMany({
      include:{
        empresa: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.empresa_Usuario.findUnique({
      where: { id },
      include: {
        empresa: {
          select: {
            id: true,
            nome: true,
            cnpj: true
          }
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            cpf: true,
            status: true            
          }
        }
      }
    });
  }

  update(id: number, updateEmpresaUsuarioDto: UpdateEmpresaUsuarioDto) {
    return this.prisma.empresa_Usuario.update({
      where: { id },
      data: updateEmpresaUsuarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.empresa_Usuario.delete({
      where: { id },
    });
  }

  // Para o envio do convite e caso o usuário aceite ou recuse o convite, será necessário atualizar o status do convite.
  async atualizarStatus(id: number, status: StatusConvite) {
    return this.prisma.empresa_Usuario.update({
      where: { id },
      data: { status },
    });
  }
}
