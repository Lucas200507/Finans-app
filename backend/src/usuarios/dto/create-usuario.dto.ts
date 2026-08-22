// REPRESENTA OS CAMPOS QUE O FRONT DEVE ENVIAR PARA CRIAR UM ENDEREÇO. BASEADO NO MODEL PRISMA
import { StatusUsuario } from '@prisma/client';
import {IsString, IsOptional, IsNotEmpty, IsNumber, IsEnum, IsEmail} from 'class-validator'; // importando validações
export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsEnum(StatusUsuario)
    status?: StatusUsuario;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsNumber()
    enderecoId: number;    

}