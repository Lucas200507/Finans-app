
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function LoginPage() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
      .map((c) => `${c.name}=${c.value}`).join('; ');
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
            'Cookie': cookieHeader
        },
        cache: 'no-store' // impede que o Next.js faça cache da resposta
    });
    // para impedir que o usuário logado acesse a página de login, redirecionando para a página de endereços
    if (res.ok) {
        redirect('/enderecos');
    }

    return <LoginForm />;

}