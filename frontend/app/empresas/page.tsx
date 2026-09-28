import {Empresa} from '@/types/empresa';
import { table } from 'console';
import { cookies } from 'next/dist/server/request/cookies';
import {redirect} from 'next/navigation';

async function getEmpresas(cookieHeader: string): Promise<Empresa[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas`, {
        cache: 'no-store', // Não guarda em cache a resposta, sempre buscar dados novos
        headers: {
            // Pega o cookie do navegador e envia para a API
            cookie: cookieHeader,
        },
    });

    if (res.status === 401) {
        redirect('/login'); // redireciona para a página de login caso não tenha o cookie do token
    }

    return res.json();
}

async function getEndereco(id: number, cookieHeader: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos/${id}`, {
        cache: 'no-store', // Não guarda em cache a resposta, sempre buscar dados novos
        headers: {
            cookie: cookieHeader,
        },
    });

    if (res.status === 401) {
        redirect('/login'); // redireciona para a página de login caso não tenha o cookie do token
    }

    return res.json();
}

export default async function EmpresasPage() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
        .map((c) => `${c.name}=${c.value}`).join('; ');
    const empresas = await getEmpresas(cookieHeader);

    const empresasComEndereco = await Promise.all(empresas.map(async (empresa) => {
        const endereco = await getEndereco(empresa.enderecoId, cookieHeader);
        return { ...empresa, endereco };
    }));

    return (
        <div>
            <h1>Empresas cadastradas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CNPJ</th>
                        <th>NOME</th>
                        <th>TELEFONE</th>
                        <th>EMAIL</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empresasComEndereco.map((empresa) => ( 
                            <tr key={empresa.id}>
                                <td>{empresa.id}</td>
                                <td>{empresa.cnpj}</td>
                                <td>{empresa.nome}</td>
                                <td>{empresa.telefone}</td>
                                <td>{empresa.email}</td>
                                <td>{empresa.endereco.cep}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>            
        </div>
    );
}