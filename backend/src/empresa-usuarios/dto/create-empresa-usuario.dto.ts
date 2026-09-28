import { PapelUsuario } from '@prisma/client';
import {IsString, IsOptional, IsNotEmpty, IsNumber, IsEnum, IsEmail, IsInt} from 'class-validator'; // importando validações

export class CreateEmpresaUsuarioDto {
  @IsInt()
  @IsNotEmpty()
  empresaId: number;

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsEnum(PapelUsuario)
  @IsOptional()
  papel?: PapelUsuario;
}