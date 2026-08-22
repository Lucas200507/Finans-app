import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'; // Para criptografar senha

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService){}
  async create(createUsuarioDto: CreateUsuarioDto) {

    const senhaHash = await bcrypt.hash(createUsuarioDto.senha, 10); // 10x gerados, complicando o hash

    return this.prisma.usuario.create({
      // ALTERANDO APENAS SENHA
      data: {
        ...createUsuarioDto,
        senha: senhaHash,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        telefone: true,
        email: true,
        status: true,
        enderecoId: true,
        created: true,
        modified: true,
        // senha
      },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        telefone: true,
        email: true,
        status: true,
        enderecoId: true,
        created: true,
        modified: true,
        // senha
      },
    });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {id},
      select: {
        id: true,
        nome: true,
        cpf: true,
        telefone: true,
        email: true,
        status: true,
        enderecoId: true,
        created: true,
        modified: true,
        // senha
      },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: {id},
      data: updateUsuarioDto,
      select: {
        id: true,
        nome: true,
        cpf: true,
        telefone: true,
        email: true,
        status: true,
        enderecoId: true,
        created: true,
        modified: true,
        // senha
      },
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: {id},      
    });
  }

  // Buscando todos os campos pelo email do usuário, para criar o token
  async findByEmail(email: string){
    return this.prisma.usuario.findUnique({
      where: {email},
    })
  }

}
