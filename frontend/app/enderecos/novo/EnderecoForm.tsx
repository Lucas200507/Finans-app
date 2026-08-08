'use client';
import { useState } from 'react'; // para guardar os valores digitados de forma simutânea
import { useRouter } from 'next/navigation';

// Criando a interface, para descrever o que o componente espera receber
interface EnderecosFormProps {    
    enderecoExistente?: Endereco; // Precisa ser opcional, pois para criação, não será passado o props
}

export default function EnderecosForm({enderecoExistente}: EnderecosFormProps){
    const router = useRouter();
    // Se enderecoExistente existir, pega o seu valor
    const [cep, setCep] = useState(enderecoExistente?.cep ?? '');
    const [estado, setEstado] = useState(enderecoExistente?.estado ?? '');
    const [pais, setPais] = useState(enderecoExistente?.pais ?? '');
    const [complemento, setComplemento] = useState(enderecoExistente?.complemento ?? '');
    const [bairro, setBairro] = useState(enderecoExistente?.bairro ?? '');
    const [numero, setNumero] = useState(enderecoExistente?.numero ?? '');
    const [cidade, setCidade] = useState(enderecoExistente?.cidade ?? '');    

    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Bloqueia o carregamento da página

        if(!cep || !estado || !pais || !cidade){
            setTipoMensagem('erro');
            setMensagem('Preencha todos os campos obrigatórios');
            return;
        }
        // Se for edição, será verdadeiro
        const modoEdicao = !!enderecoExistente; // !! -> converte qualquer valor para boolean puro

        const url = modoEdicao ? `${process.env.NEXT_PUBLIC_API_URL}/enderecos/${enderecoExistente.id}` : `${process.env.NEXT_PUBLIC_API_URL}/enderecos`;

        const metodo = modoEdicao ? 'PATCH' : 'POST'; // Editar ou criar

        try {
            const res = await fetch(url, {
                method: metodo,
                // Corpo vem em formato json
                headers: {'Content-Type': 'application/json'},
                // Converte o conteudo em JSON
                body: JSON.stringify({
                    cep,
                    estado,
                    pais,
                    complemento,
                    bairro,
                    numero,
                    cidade
                })
            });
    
            if(!res.ok){
                // SERVIDOR RESPONDEU COM ERRO
                throw new Error('Erro ao salvar endereço');
            }
    
            setTipoMensagem('sucesso');
            setMensagem(modoEdicao ? 'Endereço editado com sucesso!!' : 'Endereço salvo com sucesso!!');

            if (!modoEdicao){
                setCep(''); 
                setBairro('');
                setCidade('');
                setComplemento('');
                setEstado('');
                setNumero('');
                setPais('');
            }

            setTimeout(() => {
                router.push('/enderecos');
            }, 1500);
        } catch (error){
            // ERRO DO SERVIDOR, ANTES DE CHEGAR UMA RESPOSTA
            setTipoMensagem('erro');
            setMensagem('Não foi possível salvar o endereço, tente novamente');
        }
    }

    return(
        // onSubmit: intecepta o envio de dados e nos deixa controlar tudo via JS 
        // ao escrever o value={}, diz que o campo não está mandando no próprio valor - quem manda é a variável. 
        // com o onchange, a cada alteração no input, ele altera o valor da variável
        // Essa é a forma componente controlado, onde o react tem o controle dos campos a partir de qualquer interação - useState
        <form onSubmit={handleSubmit}>
            <label>
                CEP: *
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)}/>
            </label>
            <label>
                ESTADO: *
                <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)}/>
            </label>
            <label>
                PAÍS: *
                <input type="text" value={pais} onChange={(e) => setPais(e.target.value)}/>
            </label>
            <label>
                COMPLEMENTO:
                <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)}/>
            </label>
            <label>
                BAIRRO:
                <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
            </label>
            <label>
                NÚMERO:
                <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)}/>
            </label>
            <label>
                CIDADE: *
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
            </label>
            <button type="submit">Enviar</button>
            {/* Só renderiza se mensagem não estiver vazio */}
            {mensagem && (
                <p style={{color: tipoMensagem === 'erro' ? 'red' : 'green'}}>
                    {mensagem}
                </p>
            )}
        </form>
    )
}