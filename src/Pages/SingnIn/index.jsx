import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import ParticlesComponent from '../../components/Particles/particles'

import './SingnIn.css'

import logo from '../../assets/Logo2.png'

export default function SingnIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { singIn, loadingAuth } = useContext(AuthContext)

    async function handleSignIn(e) {
        e.preventDefault();


        if (email !== '' && password !== '') {
            await singIn(email, password, setEmail, setPassword);
        }
    }

    return (
            <div className='container-center'>
                <div className="particles-wrapper">
                    <ParticlesComponent id="particles" />
                </div>
                <div className='login'>
                    <div className='login-area'>
                        <img src={logo} alt="Logo SupportHub" />
                    </div>

                    <form onSubmit={handleSignIn}>
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

                        <button type='submit' value='Entrar'>
                            {/* Se tiver true vai aparecer se não  */}
                            {loadingAuth ? 'Carregando...' : 'Acessar'}
                        </button>
                    </form>

                    <Link to="/register">Criar Conta</Link>

                </div>
            </div>
    )
}