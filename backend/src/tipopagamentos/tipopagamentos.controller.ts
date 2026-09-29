import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipopagamentosService } from './tipopagamentos.service';
import { CreateTipopagamentoDto } from './dto/create-tipopagamento.dto';
import { UpdateTipopagamentoDto } from './dto/update-tipopagamento.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tipopagamentos')
export class TipopagamentosController {
  constructor(private readonly tipopagamentosService: TipopagamentosService) {}

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Post()
  create(@Body() createTipopagamentoDto: CreateTipopagamentoDto) {
    return this.tipopagamentosService.create(createTipopagamentoDto);
  }

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Get()
  findAll() {
    return this.tipopagamentosService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipopagamentosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipopagamentoDto: UpdateTipopagamentoDto) {
    return this.tipopagamentosService.update(+id, updateTipopagamentoDto);
  }

  @UseGuards(JwtAuthGuard) // Com isso, é necessário um token válido para executar o evento
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipopagamentosService.remove(+id);
  }
}
