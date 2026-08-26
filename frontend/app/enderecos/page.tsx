import { Endereco } from '@/types/endereco';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // redireciona para outra página, caso não tenha o cookie do token (Server Component), router.push não funciona em Server Component apenas em Client Component
import Link from 'next/link';
import BotaoExcluir from './BotaoExcluir'
import BotaoLogout from './BotaoLogout';

async function getEnderecos(): Promise<Endereco[]>{
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
        .map((c) => `${c.name}=${c.value}`) // transforma o array de cookies em um array de strings no formato "nome=valor"
        .join('; '); // transforma o array de strings em uma única string separada por "; " (formato esperado pelo header cookie)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos`, {
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
// componente assincrono. Só é possível em Server Component
export default async function EnderecosPage(){
    const enderecos = await getEnderecos();

    return(
        <div>
            <h1>Endereços cadastrados</h1>
            <BotaoLogout/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CEP</th>
                        <th>ESTADO</th>
                        <th>PAÍS</th>
                        <th>COMPLEMENTO</th>
                        <th>BAIRRO</th>
                        <th>NÚMERO</th>
                        <th>CIDADE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      enderecos.map((endereco) => (                        
                        <tr key={endereco.id}>
                            <td>{endereco.id}</td>
                            <td>{endereco.cep}</td>
                            <td>{endereco.estado}</td>
                            <td>{endereco.pais}</td>
                            <td>{endereco.complemento}</td>
                            <td>{endereco.bairro}</td>
                            <td>{endereco.numero}</td>
                            <td>{endereco.cidade}</td>
                            <td>
                                <Link href={`/enderecos/${endereco.id}/editar`}>Editar</Link>
                            </td>
                            <td> 
                                <BotaoExcluir id={endereco.id}/>
                            </td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>            
        </div>
    )
}