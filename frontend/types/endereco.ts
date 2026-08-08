export interface Endereco{
    id: number;
    cep: string;
    estado: string;
    pais: string;
    complemento?: string;
    bairro?: string;
    numero?: string;
    cidade: string;
    created: string;
    modified: string;
}