'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Importa o hook useParams do Next.js para acessar os parâmetros da rota

interface UsuarioEncontrado {
  id: number;
  nome: string;
  email: string;
}

export default function ColaboradoresPage() {
  const params = useParams();
  const empresaId = Number(params.id);

  const [email, setEmail] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<UsuarioEncontrado | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function handleBuscar() {
    if (!email) return;

    setBuscando(true);
    setUsuarioEncontrado(null);
    setNaoEncontrado(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/buscar/${encodeURIComponent(email)}`,
        { credentials: 'include' }
      );

      if (res.status === 404) {
        setNaoEncontrado(true);
        return;
      }

      if (!res.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const data = await res.json();
      setUsuarioEncontrado(data);
    } catch (error) {
      setMensagem('Erro ao buscar usuário');
    } finally { // roda sempre, independente de sucesso ou falha, garante que o estado de buscando seja atualizado para false
      setBuscando(false);
    }
  }

  async function handleConvidar() {
    if (!usuarioEncontrado) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa-usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          empresaId,
          usuarioId: usuarioEncontrado.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Erro ao enviar convite');
      }

      setMensagem(`Convite enviado para ${usuarioEncontrado.nome}!`);
      setUsuarioEncontrado(null);
      setEmail('');
    } catch (error) {
      setMensagem('Erro ao enviar convite. Talvez esse usuário já tenha um vínculo com a empresa.');
    }
  }

  return (
    <div>
      <h1>Convidar colaborador</h1>

      <div>
        <input
          type="email"
          placeholder="Digite o email do colaborador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleBuscar} disabled={buscando}>
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {naoEncontrado && <p>Usuário não encontrado.</p>}

      {usuarioEncontrado && (
        <div>
          <p>Nome: {usuarioEncontrado.nome}</p>
          <p>Email: {usuarioEncontrado.email}</p>
          <button onClick={handleConvidar}>Convidar</button>
        </div>
      )}

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}