import { IsEnum } from 'class-validator';
import { PapelUsuario } from '@prisma/client';

// ALTERA SOMENTE O PAPEL DO USUÁRIO COM A EMPRESA, NÃO ALTERA NENHUM DADO DO USUÁRIO OU DA EMPRESA
export class UpdateEmpresaUsuarioDto {
  @IsEnum(PapelUsuario)
  papel: PapelUsuario;
}
