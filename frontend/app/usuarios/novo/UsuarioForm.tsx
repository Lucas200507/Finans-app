'use client'; // O usuário vai interagir com o front, então precisa ser client
import { useState } from 'react'; // para guardar os valores digitados de forma simutânea
import { useRouter } from 'next/navigation';
import { Usuario } from '@/types/usuario'; // Importando a interface do usuário

// PARA EDITAR
interface UsuarioFormProps {
    usuarioExistente?: Usuario; // Precisa ser opcional, pois para criação, não será passado o props
}

export function maskCpf(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca o hífen
    .replace(/(-\d{2})\d+$/, '$1'); // Limita o tamanho máximo
}

export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
  
  if (cleaned.length > 10) {
    // Celular com 9 dígitos: (00) 00000-0000
    return cleaned
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+$/, '$1');
  } else {
    // Telefone fixo com 8 dígitos: (00) 0000-0000
    return cleaned
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+$/, '$1');
  }
}



export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps){
    const router = useRouter();
    const [nome, setNome] = useState(usuarioExistente?.nome ?? '');
    const [cpf , setCpf] = useState(usuarioExistente?.cpf ?? '');
    const [telefone, setTelefone] = useState(usuarioExistente?.telefone ?? '');
    const [email, setEmail] = useState(usuarioExistente?.email ?? '');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedCpf = maskCpf(e.target.value);
        setCpf(maskedCpf);
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedPhone = maskPhone(e.target.value);
        setTelefone(maskedPhone);
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Bloqueia o carregamento da página
        
        const modoEdicao = !!usuarioExistente; // !! -> converte qualquer valor para boolean puro
        
        if(!nome || !cpf || !telefone || !email || (!modoEdicao && (!senha  || !confirmarSenha))){
            setTipoMensagem('erro');
            setMensagem('Preencha todos os campos obrigatórios');
            return;
        }
        if(senha && senha !== confirmarSenha){ // Só no caso de estiver preenchido, pois no modo edição não é obrigatório alterar a senha
            setTipoMensagem('erro');
            setMensagem('As senhas não conferem');
            return;
        }       


        const url = modoEdicao ? `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${usuarioExistente.id}` : `${process.env.NEXT_PUBLIC_API_URL}/usuarios`;

        const metodo = modoEdicao ? 'PATCH' : 'POST'; // Editar ou criar

        const dadosParaEnviar: any = {nome, cpf, telefone, email};

        if(senha){ // Só envia a senha se estiver preenchida
            dadosParaEnviar.senha = senha;
        }

        try{
            const res = await fetch(url, {
                method: metodo,
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(dadosParaEnviar)
            });

            if(!res.ok){
                // SERVIDOR RESPONDEU COM ERRO
                throw new Error('Erro ao salvar usuário');
            }

            setTipoMensagem('sucesso');
            setMensagem(modoEdicao ? 'Usuário editado com sucesso!!' : 'Usuário salvo com sucesso!!');

            if (!modoEdicao){
                setNome('');
                setCpf('');
                setTelefone('');
                setEmail('');
                setSenha('');
                setConfirmarSenha('');
            }

            setTimeout(() => {
                setMensagem('');
                setTipoMensagem('');
                router.push('/login'); // Redireciona para a página de usuários
            }, 1500);

        } catch (error) {
            setTipoMensagem('erro');
            setMensagem('Erro ao salvar usuário');
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="nome">Nome: *</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="cpf">CPF: *</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="telefone">Telefone: *</label>
                <input
                    type="text"
                    id="telefone"
                    value={telefone}
                    onChange={handlePhoneChange}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="email">Email: *</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="senha">Senha: *</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="confirmarSenha">Confirmar Senha: *</label>
                <input
                    type="password"
                    id="confirmarSenha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Salvar
            </button>

            {mensagem && (
                <p style={{ color: tipoMensagem === 'erro' ? 'red' : 'green' }}>
                    {mensagem}
                </p>
            )}
        </form>
    )

}