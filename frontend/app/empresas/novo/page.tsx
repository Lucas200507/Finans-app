// Server Component importando um Client Component
import EmpresaForm from "./EmpresaForm";
    export default function NovaEmpresaPage(){
    return (    
        <div>
            <h1>Cadastrar Nova Empresa</h1>
            <EmpresaForm />
        </div>
    );
}