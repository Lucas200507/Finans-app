import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Convite } from '@/types/convite';
import BotaoAceitar from './BotaoAceitar';
import BotaoRecusar from './BotaoRecusar';

async function getConvitesPendentes(cookieHeader: string): Promise<Convite[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa-usuarios/meus-convites`, {
    cache: 'no-store',
    headers: {
      cookie: cookieHeader,
    },
  });

  if (res.status === 401) {
    redirect('/login');
  }

  if (!res.ok) {
    throw new Error('Erro ao buscar convites');
  }

  return res.json();
}

export default async function ConvitesPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const convites = await getConvitesPendentes(cookieHeader);

  return (
    <div>
      <h1>Convites pendentes</h1>

      {convites.length === 0 && <p>Você não tem convites pendentes.</p>}

      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Papel oferecido</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {convites.map((convite) => (
            <tr key={convite.id}>
              <td>{convite.empresa.nome}</td>
              <td>{convite.empresa.cnpj}</td>
              <td>{convite.papel}</td>
              <td>
                <BotaoAceitar id={convite.id} />
              </td>
              <td>
                <BotaoRecusar id={convite.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}