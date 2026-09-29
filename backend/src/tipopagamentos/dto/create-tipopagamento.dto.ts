import {IsString, IsOptional, IsNotEmpty, IsBoolean} from 'class-validator'; // importando validações
export class CreateTipopagamentoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @IsBoolean()
    aceitaParcelamento: boolean;
}