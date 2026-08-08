// Server Component importando um Client Component
import EnderecosForm from "./EnderecoForm";
export default function NovoEnderecoPage(){
    return (    
        <div>
            <h1>Cadastrar Novo endereço</h1>
            <EnderecosForm />
        </div>
    );
}