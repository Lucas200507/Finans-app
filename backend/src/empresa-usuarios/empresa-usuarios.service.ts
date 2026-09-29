import { ForbiddenException, Injectable, ConflictException } from '@nestjs/common';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';
import { UpdateEmpresaUsuarioDto } from './dto/update-empresa-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusConvite } from '@prisma/client';

@Injectable()
export class EmpresaUsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmpresaUsuarioDto, usuarioLogadoId: number) {
    const vinculoDoLogado = await this.prisma.empresa_Usuario.findUnique({
      where: {
        empresaId_usuarioId: {
          empresaId: dto.empresaId,
          usuarioId: usuarioLogadoId,
        },
      },
    });

    const podeConvidar =
      vinculoDoLogado?.status === 'ACEITO' &&
      (vinculoDoLogado.papel === 'ADMINISTRADOR' || vinculoDoLogado.papel === 'SOCIO');

    if (!podeConvidar) {
      throw new ForbiddenException('Você não pode convidar colaboradores para esta empresa');
    }

    const vinculoJaExiste = await this.prisma.empresa_Usuario.findUnique({
      where: {
        empresaId_usuarioId: {
          empresaId: dto.empresaId,
          usuarioId: dto.usuarioId,
        },
      },
    });

    if (vinculoJaExiste) {
      throw new ConflictException('Este usuário já possui um vínculo com esta empresa');
    }

    return this.prisma.empresa_Usuario.create({
      data: dto,
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
  private async atualizarStatus(id: number, status: StatusConvite, usuarioLogadoId: number) {
    const vinculo = await this.prisma.empresa_Usuario.findUnique({
      where: { id },
    });

    if (!vinculo) {
      throw new ForbiddenException('Convite não encontrado');
    }

    if (vinculo.usuarioId !== usuarioLogadoId) {
      throw new ForbiddenException('Você não pode responder a este convite');
    }

    return this.prisma.empresa_Usuario.update({
      where: { id },
      data: { status },
    });
  }

  aceitar(id: number, usuarioLogadoId: number) {
    return this.atualizarStatus(id, 'ACEITO', usuarioLogadoId);
  }

  recusar(id: number, usuarioLogadoId: number) {
    return this.atualizarStatus(id, 'RECUSADO', usuarioLogadoId);
  }  

  findConvitesPendentes(usuarioId: number) {
    return this.prisma.empresa_Usuario.findMany({
      where: {
        usuarioId,
        status: 'PENDENTE',
      },
      include: {
        empresa: {
          select: {
            id: true,
            nome: true,
            cnpj: true,
          },
        },
      },
    });
  }
}

