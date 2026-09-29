/*
  Warnings:

  - You are about to drop the column `aceita_parcelamento` on the `TipoPagamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TipoPagamento" DROP COLUMN "aceita_parcelamento",
ADD COLUMN     "aceitaParcelamento" BOOLEAN NOT NULL DEFAULT true;
