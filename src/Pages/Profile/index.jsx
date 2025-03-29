import { useContext, useState } from 'react'

import Header from '../../components/Header/header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'

import './profile.css'

export default function Profile() {

    const { user } = useContext(AuthContext);

    //Parei aqui 4:22
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)


    return (
        <div>
            <Header />


            <div className='content'>
                <Title name="Meu Perfil">
                    <FiSettings size={25} color="#f8f8f8" />
                </Title>


                <div className='container'>

                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#f8f8f8' size={25} />
                            </span>


                            <input type="file" accept='image/*' />
                            {/* Se o usuario não tiver foto = avatarGenerico se não a foto dele mesmo */}
                            {avatarUrl === null ? (
                                <img src={avatar} alt='foto de perfil' width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                            )}

                        </label>

                        <label>Nome</label>
                        <input type="text" placeholder='Seu nome' />

                        <label>E-mail</label>
                        <input type="text" placeholder='teste@email.com' disabled={true} />

                        <button className='btnP' type='submit'>Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='Logout-btn'>Sair</button>
                </div>

            </div>
        </div>
    )
}