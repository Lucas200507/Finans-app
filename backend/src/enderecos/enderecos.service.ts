import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from '../prisma/prisma.service'; // para conexão ao banco

@Injectable()
export class EnderecosService {
  constructor(private prisma: PrismaService){}
  create(createEnderecoDto: CreateEnderecoDto) {
    return this.prisma.endereco.create({
      data: createEnderecoDto,
    });
  }

  findAll() {
    return this.prisma.endereco.findMany();
  }

  findOne(id: number) {
    return this.prisma.endereco.findUnique({
      where: {id},
    });
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return this.prisma.endereco.update({
      where: { id },
      data: updateEnderecoDto,
    });
  }

 async remove(id: number) {
    const empresaVinculada = await this.prisma.empresa.findFirst({
      where: { enderecoId: id },
    });

    if (empresaVinculada) {
      throw new ConflictException('Não é possível excluir: este endereço está vinculado a uma empresa.');
    }

    return this.prisma.endereco.delete({
      where: { id },
    });
  }
}
