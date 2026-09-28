export interface Empresa{
    id: number;
    cnpj: string;
    nome: string;
    telefone: string;
    email: string;
    status: 'ATIVA' | 'INATIVA' | 'SUSPENSA';
    enderecoId: number;
    created: string;
    modified: string;
}