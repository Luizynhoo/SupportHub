import { useContext, useState } from 'react'

import Header from '../../components/Header/header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'

import './profile.css'

export default function Profile() {

    const { user, storageUser, setUser, logout} = useContext(AuthContext);

    
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imgAvatar, setImgAvatar] = useState(null)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                //Exibindo avatar
                setImgAvatar(image)
                //criando um objectURL
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                toast.warn (`${data.nome}, envie uma imagem do tipo PNG ou JPEG`);
                setImgAvatar(null);
                return;
            }
        }
    }

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


                            <input type="file" accept='image/*' onChange={handleFile}/>
                            {/* Se o usuario não tiver foto = avatarGenerico se não a foto dele mesmo */}
                            {avatarUrl === null ? (
                                <img src={avatar} alt='foto de perfil' width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                            )}

                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={() => setNome(e.target.value)} />

                        <label>E-mail</label>
                        <input type="text" value={email} disabled={true} />

                        <button className='btnP' type='submit'>Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='Logout-btn' onClick={ () => logout()}>Sair</button>
                </div>

            </div>
        </div>
    )
}