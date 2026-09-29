import { Module } from '@nestjs/common';
import { TipopagamentosService } from './tipopagamentos.service';
import { TipopagamentosController } from './tipopagamentos.controller';

@Module({
  controllers: [TipopagamentosController],
  providers: [TipopagamentosService],
})
export class TipopagamentosModule {}
