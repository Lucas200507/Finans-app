# FINANS

Sistema pessoal de controle financeiro, desenvolvido como projeto de estudo e uso prático, com foco em consolidar uma stack full-stack moderna em TypeScript. Motivado pela necessidade de organizar as finanças de pequenos negócios de revenda de produtos administrados por familiares. Hoje é também o principal projeto de portfólio de Lucas em sua busca por vagas de desenvolvedor.

> 📄 Para a documentação completa do sistema (visão geral, modelagem de dados, decisões técnicas), veja `FINANS-Documentacao-Tecnica.docx`.

---

## ✨ Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Frontend | [Next.js 15](https://nextjs.org/) (App Router) |
| Backend | [NestJS](https://nestjs.com/) |
| Banco de dados | [PostgreSQL](https://www.postgresql.org/) |
| ORM | [Prisma](https://www.prisma.io/) v6 |
| Validação de dados | class-validator / DTOs |
| Hash de senha | bcrypt |
| Autenticação | JWT (JwtStrategy + JwtAuthGuard), migrando para cookie HttpOnly |
| Estrutura de projeto | Monorepo (Git) |

> ℹ️ O projeto usa Prisma **v6** (não a v7) devido a conflitos de compatibilidade ESM/CommonJS encontrados durante a configuração inicial.

---

## 📁 Estrutura do projeto

```
finans/
├── apps/
│   ├── frontend/        # Aplicação Next.js (App Router)
│   └── backend/         # API NestJS
├── prisma/
│   └── schema.prisma    # Modelagem das entidades (Endereco, Usuario, Empresa...)
├── package.json
└── README.md
```

> ⚠️ Ajuste esta árvore de diretórios para refletir a estrutura real do seu monorepo (nomes de pastas, ferramenta de workspaces usada, etc.).

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando localmente (ou acessível via URL de conexão)
- Gerenciador de pacotes: npm, yarn ou pnpm (ajustar conforme o usado no projeto)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd finans
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou dentro de `apps/backend`, conforme a configuração) com a URL de conexão do banco e o segredo do JWT:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/finans?schema=public"
JWT_SECRET="sua-chave-secreta"
```

### 4. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

Isso cria as tabelas no banco de dados de acordo com o `schema.prisma` (atualmente contendo as entidades `Endereco` e `Usuario`, com enums e relacionamentos).

### 5. (Opcional) Gerar o Prisma Client

```bash
npx prisma generate
```

### 6. Rodar o backend (NestJS)

```bash
cd apps/backend
npm run start:dev
```

### 7. Rodar o frontend (Next.js)

Em outro terminal:

```bash
cd apps/frontend
npm run dev
```

O frontend fica disponível em `http://localhost:3000` e o backend em `http://localhost:3001`.

---

## 🧩 Status atual

- [x] Setup do monorepo em Git
- [x] Entidade **Endereco** — schema, migration, DTOs, endpoints CRUD e telas implementados
- [x] Entidade **Usuario** — schema com enums/relações, DTOs, endpoints CRUD, senhas com bcrypt
- [x] **Autenticação JWT** — JwtStrategy + JwtAuthGuard implementados
- [ ] **Migração de auth para cookie HttpOnly** — backend parcialmente ajustado, frontend pendente
- [ ] Entidade **Empresa**
- [ ] Lançamentos financeiros (receitas/despesas)
- [ ] Relatórios e dashboards

---

## 🛠️ Problemas conhecidos / decisões técnicas relevantes

- **Prisma v7 → v6:** downgrade necessário por conflitos de ESM/CommonJS.
- **Next.js 15 — `params` assíncrono:** rotas dinâmicas exigem `await` ao acessar `params`.
- **CORS:** configurado no NestJS para permitir requisições do frontend em desenvolvimento.
- **Auth: localStorage → cookie HttpOnly:** o token JWT era guardado no localStorage (vulnerável a XSS); migração em andamento para cookies HttpOnly. Backend parcialmente atualizado, frontend ainda pendente.

Mais detalhes sobre cada decisão estão na documentação técnica completa.

---

## 📌 Notas

Este README cobre a configuração técnica do projeto. Para entender o *porquê* de cada decisão de arquitetura e o histórico de desenvolvimento, consulte `FINANS-Documentacao-Tecnica.docx`.
