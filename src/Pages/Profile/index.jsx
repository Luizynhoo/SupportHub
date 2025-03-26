import { useContext, useState } from 'react'

import Header from '../../components/Header/header'
import Title from '../../components/Title'
import {AuthContext} from '../../contexts/auth'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'

export default function Profile() {

    const { user } = useContext(AuthContext);

    //Parei aqui 4:22
    const [avatarUrl, setAvatarUrl] = useState (user && user.avatarUrl)


    return (
        <div>
            <Header />


            <div className='content'>
                <Title name="Meu Perfil">
                    <FiSettings size={25} color="#f8f8f8" />
                </Title>
            </div>

            <div className='container'>
                <form className='form-profile'>
                    <label className='label-avatar'>
                        <label>
                            <FiUpload color='#f8f8f8' size={25}/>
                        </label>
                    <input type="file" accept='image/*'/>

                    </label>
                </form>
            </div>
        </div>
    )
}