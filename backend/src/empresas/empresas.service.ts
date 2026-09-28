import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(private prisma: PrismaService) {}
  create(createEmpresaDto: CreateEmpresaDto, usuarioId: number) {
    const { endereco, ...dadosEmpresa } = createEmpresaDto; // Desestruturação do objeto createEmpresaDto para separar o endereço dos demais dados da empresa

    return this.prisma.empresa.create({
      data: {
        ...dadosEmpresa,
        endereco: {
          create: endereco, // Cria um novo endereço associado à empresa
        },
        empresaUsuarios: {
          create: {
            usuarioId: usuarioId, // Associa o usuário que criou a empresa
            papel: 'ADMINISTRADOR', // Define o papel do usuário como ADMINISTRADOR
            status: 'ACEITO', // Define o status do usuário como ATIVO
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.empresa.findMany({
      include: {
        endereco: true, // Inclui os dados do endereço associado à empresa
      },
    });
  }

  findOne(id: number) {
    return this.prisma.empresa.findUnique({
      where: { id },
      include: {
        endereco: true, // Inclui os dados do endereço associado à empresa
      },
    });
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const { endereco, ...dadosEmpresa } = updateEmpresaDto;

    return this.prisma.empresa.update({
        data: dadosEmpresa,
        where: { id },
        // Endereco só é alterado por enderecos/:id PATH
        include: {
          endereco: true,
        },
    });
  }

  remove(id: number) {
    return this.prisma.empresa.delete({
      where: { id },
    });
  }

  findAllPorUsuario(usuarioId: number) {
    return this.prisma.empresa.findMany({
      where: {
        empresaUsuarios: {
          some: { // some -> verifica se existe pelo menos um registro que satisfaça a condição
            usuarioId: usuarioId,
            status: 'ACEITO', // Filtra apenas empresas onde o usuário tem status ACEITO
          },
        },
      },
      include: {
        endereco: true,
      },
    });
  }
}
