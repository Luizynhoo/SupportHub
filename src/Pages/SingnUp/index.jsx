import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/Logo2.png'



export default function SingnUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('')

    //chamando o nosso contexto 
    const { signUp, loadingAuth } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault();

        if (nome !== "" && password !== "" && email !== "") {
            await signUp(email, password, nome)
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo SupportHub" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>

                    <input
                        type="text"
                        placeholder="Nome do usuário"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit' value='Entrar'>
                        {/* Se tiver true vai aparecer se não  */}
                        {loadingAuth ? 'Carregando...' : 'Criar Conta'}
                    </button>
                </form>

                <Link to="/">Já possui uma conta ? Faça login !</Link>

            </div>
        </div>
    )
}