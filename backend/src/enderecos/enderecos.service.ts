import { Injectable } from '@nestjs/common';
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

  remove(id: number) {
    return this.prisma.endereco.delete({
      where: {id},
    });
  }
}
