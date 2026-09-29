export interface Convite {
  id: number;
  empresaId: number;
  usuarioId: number;
  papel: 'CONTRIBUIDOR' | 'ADMINISTRADOR' | 'SOCIO';
  status: 'PENDENTE' | 'ACEITO' | 'RECUSADO';
  created: string;
  modified: string;
  empresa: {
    id: number;
    nome: string;
    cnpj: string;
  };
}