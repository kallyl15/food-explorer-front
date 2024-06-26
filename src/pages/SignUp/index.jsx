import logoHeaderFoodExplorer from '../../assets/logoHeaderFoodExplorer.svg';

import {useNavigate} from 'react-router-dom';
import {api} from "../../services/api";
import {useState} from "react";

import {Button} from '../../components/Button';
import {Input} from '../../components/Input';

import {Container, Form} from './styles';

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 

    function handleTurnBack() {
        navigate(-1);
    };

     async function handleSignUp() {
        if(!name || !email || !password){
            return alert("Preencha todos os campos!");
        }

        if(password.length < 3){
            return alert("A senha deve ser no mínimo de 3 caracteres");
        }

        if(email.includes('@gmail.com') === false){
            return alert(`"${email}" não é um email válido!`)
        }
        setLoading(true);
        
        await api.post("/users", {name, email, password})
        .then(()=>{
            alert("Usuário cadastrado com sucesso!");
            handleTurnBack();
        })
        .catch(error =>{
            setLoading(false);
            if(error.response){
                alert(error.response.data.message);
            }else{
                alert("Não foi possível cadastrar.");
            }
        });
    };

    return(
        <Container>

            <div>
                <div className='wrapper_logo'>
                    <img id='logo' src={logoHeaderFoodExplorer} alt="logo Header Food Explorer" />
                </div>
            </div>

            <Form>
                
                <h1>Crie sua conta</h1>
                <label>
                    Seu nome
                    <Input 
                        placeholder="Exemplo: Maria da Silva"
                        type="text"
                        onChange={e=>setName(e.target.value)}
                    />
                </label>

                <label>
                    Email
                    <Input 
                        placeholder="Exemplo: maria@gmail.com.br"
                        type="text" 
                        onChange={e=>setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Senha
                    <Input 
                        placeholder="No mínimo 3 caracteres"
                        type="password"
                        maxLength="10"
                        onChange={e=>setPassword(e.target.value)}
                    />
                </label>

                <Button 
                loading={loading}
                title={loading ? 'Loading...' : 'Criar conta'} 
                onClick={handleSignUp}
                />
                <div>
                     <a onClick={handleTurnBack}>
                        Já tenho uma conta
                     </a>
                </div>

            </Form>
        </Container>
    )
}