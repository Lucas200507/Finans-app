-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_enderecoId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "enderecoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
