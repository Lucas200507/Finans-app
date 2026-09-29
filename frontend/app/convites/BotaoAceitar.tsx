'use client';
import { useRouter } from 'next/navigation';

interface BotaoAceitarProps {
  id: number;
}

export default function BotaoAceitar({ id }: BotaoAceitarProps) {
  const router = useRouter();

  async function handleAceitar() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa-usuarios/${id}/aceitar`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Erro ao aceitar convite');
      }

      router.refresh();
    } catch (error) {
      window.alert('Não foi possível aceitar o convite.');
    }
  }

  return (
    <button onClick={handleAceitar}>Aceitar</button>
  );
}