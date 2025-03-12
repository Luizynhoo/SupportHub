import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import './SingnIn.css'


import logo from '../../assets/Logo2.png'

export default function SingnIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { singIn } = useContext(AuthContext)

    function handleSignIn(e){
        e.preventDefault();


        if(email !== '' && password !== ''){
            singIn();
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo SupportHub" />
                </div>

                <form onSubmit = {handleSignIn}>
                    <h1>Entrar</h1>
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

                    <button type='submit' value='Entrar'>Acessar</button>
                </form>

                <Link to="/register">Criar Conta</Link>

            </div>
        </div>
    )
}