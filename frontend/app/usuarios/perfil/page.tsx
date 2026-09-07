import { Usuario } from "@/types/usuario";
import  UsuarioForm  from "../novo/UsuarioForm";
import { cookies } from "next/headers";

async function getUsuarioLogado(cookieHeader: string): Promise<Usuario> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        cache: 'no-store', // Não guarda em cache a resposta, sempre buscar dados novos
        headers: {
            // Pega o cookie do navegador e envia para a API
            cookie: cookieHeader,
        },
    });

    return res.json();
} 

export default async function PerfilPage(){
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
    const usuarioLogado = await getUsuarioLogado(cookieHeader); // Passando o cookie do cabeçalho
    return (
        <div>
            <h1>Perfil do Usuário</h1>
            <UsuarioForm usuarioExistente={usuarioLogado}/> 
        </div>
    )
}