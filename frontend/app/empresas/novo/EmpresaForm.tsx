'use client'; // formulário para cadastro de empresa
import { useState } from 'react'; // para guardar os valores digitados de forma simutânea
import { useRouter } from 'next/navigation';
import {Empresa} from '@/types/empresa'; // Importando a interface da empresa
import { maskCnpj, maskTelefone, maskCep, apenasDigitos } from '@/lib/masks'; // Importando a função de máscara

interface EmpresaFormProps {
    empresaExistente?: Empresa; // Precisa ser opcional, pois para criação, não será passado o props
}

interface FormData {
  cnpj: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: {
    cep: string;
    estado: string;
    pais: string;
    cidade: string;
    complemento: string;
    bairro: string;
    numero: string;
  };
}

export default function EmpresaForm({empresaExistente}: EmpresaFormProps){
    const router = useRouter();
    
    const [formData, setFormData] = useState<FormData>({
        cnpj: empresaExistente?.cnpj ?? '',
        nome: empresaExistente?.nome ?? '',
        telefone: empresaExistente?.telefone ?? '',
        email: empresaExistente?.email ?? '',
        endereco: {
        cep: '',
        estado: '',
        pais: '',
        cidade: '',
        complemento: '',
        bairro: '',
        numero: '',
        },
    });

    const [mensagem, setMensagem] = useState('');

    function handleChange(campo: keyof Omit<FormData, 'endereco'>, valor: string) {
        setFormData((prev) => ({ ...prev, [campo]: valor }));
    }

    function handleEnderecoChange(campo: keyof FormData['endereco'], valor: string) {
        setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [campo]: valor },
        }));
    }

    function handleCepChange(valor: string) {
        const cepFormatado = maskCep(valor);
        handleEnderecoChange('cep', cepFormatado);
    }

    function handleCnpjChange(valor: string) {
        const cnpjFormatado = maskCnpj(valor);
        handleChange('cnpj', cnpjFormatado);
    }

    function handleTelefoneChange(valor: string) {
        const telefoneFormatado = maskTelefone(valor);
        handleChange('telefone', telefoneFormatado);
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault(); // Bloqueia o carregamento da página

         if (!formData.cnpj || !formData.nome || !formData.telefone || !formData.email ||
        !formData.endereco.cep || !formData.endereco.estado || !formData.endereco.pais || !formData.endereco.cidade) {
            setMensagem('Preencha todos os campos obrigatórios');
            return;
        }

        const modoEdicao = !!empresaExistente; // !! -> converte qualquer valor para boolean puro

        const url = modoEdicao ? `${process.env.NEXT_PUBLIC_API_URL}/empresas/${empresaExistente.id}` : `${process.env.NEXT_PUBLIC_API_URL}/empresas`;

        const metodo = modoEdicao ? 'PATCH' : 'POST'; // Editar ou criar

        const dadosParaEnviar = {
            ...formData,
            cnpj: apenasDigitos(formData.cnpj),
            telefone: apenasDigitos(formData.telefone),
            endereco: {
                ...formData.endereco,
                cep: apenasDigitos(formData.endereco.cep),
            },
        };

        try {
            const res = await fetch(url, {                
                method: metodo,
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(dadosParaEnviar),
            });

            if(!res.ok){
                // Se a resposta não for ok, lança um erro
                throw new Error('Erro ao salvar empresa');
            }

            setMensagem('Empresa salva com sucesso!');
            router.push('/empresas'); // redireciona para a página de empresas após salvar
        } catch (error) {
            setMensagem('Erro ao salvar empresa');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Imformações do Endereço</h1>
            <div>
                <label>CEP:</label>
                <input type="text" value={formData.endereco.cep} onChange={(e) => handleCepChange(e.target.value)} required />
            </div>
            <div>
                <label>Estado:</label>
                <input type="text" value={formData.endereco.estado} onChange={(e) => handleEnderecoChange('estado', e.target.value)} required />
            </div>
            <div>
                <label>País:</label>
                <input type="text" value={formData.endereco.pais} onChange={(e) => handleEnderecoChange('pais', e.target.value)} required />
            </div>
            <div>
                <label>Cidade:</label>
                <input type="text" value={formData.endereco.cidade} onChange={(e) => handleEnderecoChange('cidade', e.target.value)} required />
            </div>
            <div>
                <label>Complemento:</label>
                <input type="text" value={formData.endereco.complemento} onChange={(e) => handleEnderecoChange('complemento', e.target.value)} />
            </div>
            <div>
                <label>Bairro:</label>
                <input type="text" value={formData.endereco.bairro} onChange={(e) => handleEnderecoChange('bairro', e.target.value)} />
            </div>
            <div>
                <label>Número:</label>
                <input type="text" value={formData.endereco.numero} onChange={(e) => handleEnderecoChange('numero', e.target.value)} />
            </div>
            <h1>Informações da Empresa</h1>
            <div>
                <label>CNPJ:</label>
                <input type="text" value={formData.cnpj} onChange={(e) => handleCnpjChange(e.target.value)} required />
            </div>
            <div>
                <label>Nome:</label>
                <input type="text" value={formData.nome} onChange={(e) => handleChange('nome', e.target.value)} required />
            </div>
            <div>
                <label>Telefone:</label>
                <input type="text" value={formData.telefone} onChange={(e) => handleTelefoneChange(e.target.value)}  required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required />
            </div>                      
            <button type="submit">{empresaExistente ? 'Editar' : 'Cadastrar'} Empresa</button>
            {mensagem && <p>{mensagem}</p>}
        </form>
    );
}