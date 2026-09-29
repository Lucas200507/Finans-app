-- CreateTable
CREATE TABLE "TipoPagamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "aceita_parcelamento" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoPagamento_pkey" PRIMARY KEY ("id")
);
