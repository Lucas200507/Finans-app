'use client';
import { useRouter } from 'next/navigation';

interface BotaoExluirProps {
    id: number; // Não preciso receber o objeto, apenas o id
}

export default function BotaoExcluir({id}: BotaoExluirProps){
    const  router = useRouter();

    async function handleDelete(){
        const resposta = window.confirm('Tem certeza que deseja excluir este Endereço ?');

        if (resposta){
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                
                if (!res.ok){
                    throw new Error('Erro ao deletar endereço');
                }
                   
                router.refresh(); // recarrega a pagina
            }  catch (error)      {
                // Erro no servidor antes de chegar uma reposta
                window.alert('Erro no servidor');
            }
        }
    
    }    
    return (
        <button onClick={handleDelete}>Excluir</button>
    )
}