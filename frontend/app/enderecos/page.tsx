import { Endereco } from '@/types/endereco';
import Link from 'next/link';
import BotaoExcluir from './BotaoExcluir';

async function getEnderecos(): Promise<Endereco[]>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos`, {
        cache: 'no-store', // Não guarda em cache a resposta, sempre buscar dados novos
    });
    return res.json();
}
// componente assincrono. Só é possível em Server Component
export default async function EnderecosPage(){
    const enderecos = await getEnderecos();

    return(
        <div>
            <h1>Endereços cadastrados</h1>
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