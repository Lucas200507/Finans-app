import { Endereco } from '@/types/endereco';
import EnderecosForm from '../../novo/EnderecoForm'; // Reutilizando o mesmo form (ClienteComponent)

async function getEndereco(id: string): Promise<Endereco> {
    // Recuperando os dados do BackEnd
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos/${id}`, {
        cache: 'no-store',
    });
    return res.json();
}
// params, recupera pela url
export default async function EditarEnderecoPage({params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    const endereco = await getEndereco(id);
    return (
        <div>
            <h1>Editar Endereço</h1>
            <EnderecosForm enderecoExistente={endereco} />
        </div>
    );
}

