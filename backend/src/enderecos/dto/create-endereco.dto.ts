// REPRESENTA OS CAMPOS QUE O FRONT DEVE ENVIAR PARA CRIAR UM ENDEREÇO. BASEADO NO MODEL PRISMA
import {IsString, IsOptional, IsNotEmpty} from 'class-validator'; // importando validações
export class CreateEnderecoDto {
    @IsString()
    @IsNotEmpty()
    cep: string;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsString()
    @IsNotEmpty()
    pais: string;

    @IsOptional() // PRECISA VIR ANTES, POIS SE ESTIVER VAZIO, PULA AS OUTRAS VALIDAÇÕES
    @IsString()
    complemento?: string;

    @IsOptional() // PRECISA VIR ANTES, POIS SE ESTIVER VAZIO, PULA AS OUTRAS VALIDAÇÕES
    @IsString()
    bairro?: string;

    @IsOptional() // PRECISA VIR ANTES, POIS SE ESTIVER VAZIO, PULA AS OUTRAS VALIDAÇÕES
    @IsString()
    numero?: string;

    @IsString()
    @IsNotEmpty()
    cidade: string;
}
