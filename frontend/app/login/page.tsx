"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail ] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    
    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        try{
            // irá retornar o token
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', // para enviar o cookie de volta para o navegador
                body: JSON.stringify({email, senha})
            });

            if(!res.ok){
                throw new Error('Credenciais inválidas');
            }            
            
            router.push('/enderecos');
        } catch(error){
            setMensagem('Email ou senha inválidos');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email: 
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />                    
            </label>
            <label>
                Senha:
                <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>
            <button type='submit'>Entrar</button>
            {mensagem && <p style={{color: 'red'}}>{mensagem}</p>}
        </form>
    );    
}