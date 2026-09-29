import { PartialType } from '@nestjs/mapped-types';
import { CreateTipopagamentoDto } from './create-tipopagamento.dto';

export class UpdateTipopagamentoDto extends PartialType(CreateTipopagamentoDto) {}
