'use client';
import { useRouter } from 'next/navigation';

interface BotaoRecusarProps {
  id: number;
}

export default function BotaoRecusar({ id }: BotaoRecusarProps) {
  const router = useRouter();

  async function handleRecusar() {
    const confirmou = window.confirm('Tem certeza que deseja recusar este convite?');

    if (!confirmou) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa-usuarios/${id}/recusar`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Erro ao recusar convite');
      }

      router.refresh();
    } catch (error) {
      window.alert('Não foi possível recusar o convite.');
    }
  }

  return (
    <button onClick={handleRecusar}>Recusar</button>
  );
}