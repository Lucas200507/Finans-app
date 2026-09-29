import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tipoPagamento.createMany({ // Cria vários registros na tabela tipoPagamento
    data: [
      { nome: 'PIX', aceitaParcelamento: false },
      { nome: 'Dinheiro', aceitaParcelamento: false },
      { nome: 'Cartão de Crédito', aceitaParcelamento: true },
      { nome: 'Cartão de Débito', aceitaParcelamento: false },
      { nome: 'Boleto', aceitaParcelamento: true },
    ],
    skipDuplicates: true, // Ignora registros duplicados com base na chave única (nome)
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
