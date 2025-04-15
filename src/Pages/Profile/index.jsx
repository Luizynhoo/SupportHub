import { useContext, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/FBConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import Header from '../../components/Header/header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'

import { toast } from 'react-toastify'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'

import './profile.css'
import firebase from 'firebase/compat/app'

export default function Profile() {

    const { user, storageUser, setUser, logout } = useContext(AuthContext);


    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imgAvatar, setImgAvatar] = useState(null)

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                //Exibindo avatar
                setImgAvatar(image)
                //criando um objectURL
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                toast.warn("Envie uma imagem do tipo PNG ou JPEG");
                setImgAvatar(null);
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadRef = ref(storage, `img/${currentUid}/${imgAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef, imgAvatar)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then( async (downloadURL)=>{
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome, 
                })
                .then(()=>{
                    let data = {
                        //pegando todas inforações do user do contexto 
                        ...user,
                        nome: nome,
                        avatarUrl: urlFoto,
                    }

                    toast.success(`Atualizado com sucesso, ${data.nome}`);
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (imgAvatar === null && nome !== '') {
            //Atualizar somente o nome do usuario no banco 
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: nome,
            })
                .then(() => {
                    let data = {
                        //pegando todas inforações do user do contexto 
                        ...user,
                        nome: nome,
                    }

                    toast.success(`Nome alterado com sucesso, ${data.nome}`);
                    setUser(data);
                    storageUser(data);
                })
        } else if (nome !== '' && imgAvatar !== null) {
            toast.error('Nosso sistema não conseguiu salvar a foto agora. Tente mais tarde.');
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

                    <form className='form-profile' onSubmit={handleSubmit}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#f8f8f8' size={25} />
                            </span>


                            <input type="file" accept='image/*' onChange={handleFile} />
                            {/* Se o usuario não tiver foto = avatarGenerico se não a foto dele mesmo */}
                            {avatarUrl === null ? (
                                <img src={avatar} alt='foto de perfil' width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                            )}

                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>E-mail</label>
                        <input type="text" value={email} disabled={true} />

                        <button className='btnP' type='submit'>Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='Logout-btn' onClick={() => logout()}>Sair</button>
                </div>

            </div>
        </div>
    )
}