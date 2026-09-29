import { Injectable } from '@nestjs/common';
import { CreateTipopagamentoDto } from './dto/create-tipopagamento.dto';
import { UpdateTipopagamentoDto } from './dto/update-tipopagamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipopagamentosService {
  constructor(private prisma: PrismaService){}
  create(createTipopagamentoDto: CreateTipopagamentoDto) {
    return this.prisma.tipoPagamento.create({
      data: createTipopagamentoDto,
    });
  }

  findAll() {
    return this.prisma.tipoPagamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoPagamento.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTipopagamentoDto: UpdateTipopagamentoDto) {
    return this.prisma.tipoPagamento.update({
      where: { id },
      data: updateTipopagamentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.tipoPagamento.delete({
      where: { id },
    });
  }
}
