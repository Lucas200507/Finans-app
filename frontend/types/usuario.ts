export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  status: 'ATIVO' | 'INATIVO' | 'BLOQUEADO';
  enderecoId?: number;
  created: string;
  modified: string;
  // senha?: string; backend não retorna a senha do usuário, então não precisa ser incluída na interface
}