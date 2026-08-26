'use client';
import { useRouter } from 'next/navigation';

export default function BotaoLogout(){
    const router = useRouter();

    async function handleLogout(){
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include', // para enviar o cookie de volta para o navegador
        });

        router.push('/login');
    }
    return (
        <button onClick={handleLogout}>Sair</button>
    );
    
}