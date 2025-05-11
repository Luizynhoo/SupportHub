import { useContext, useState, useEffect } from 'react'
import Header from '../../components/Header/header'
import Title from '../../components/Title'
import { AuthContext } from '../../contexts/auth'

import { toast } from 'react-toastify'
import { FiSettings } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import avatar1 from '../../assets/avatar1.webp'
import avatar2 from '../../assets/avatar2.webp'
import avatar3 from '../../assets/avatar3.webp'

import './profile.css'

export default function Profile() {
    const { user, storageUser, setUser, logout } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [modalOpen, setModalOpen] = useState(false)
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    const avatarOptions = [
        { id: 1, src: avatar1, name: 'avatar1.png' },
        { id: 2, src: avatar2, name: 'avatar2.png' },
        { id: 3, src: avatar3, name: 'avatar3.png' },
    ]

    // Carregar avatar salvo no localStorage ao iniciar
    useEffect(() => {
        const savedAvatar = localStorage.getItem('selectedAvatar')
        if (savedAvatar && avatarOptions.find(option => option.name === savedAvatar)) {
            const selectedAvatarSrc = avatarOptions.find(option => option.name === savedAvatar).src
            setAvatarUrl(selectedAvatarSrc)
            // Atualizar o contexto com o avatar salvo
            const updatedUser = { ...user, avatarUrl: selectedAvatarSrc }
            setUser(updatedUser)
            storageUser(updatedUser)
        } else {
            setAvatarUrl(avatar) // Default avatar
        }
    }, [])

    function handleAvatarSelect(avatarName) {
        const selectedAvatar = avatarOptions.find(option => option.name === avatarName)?.src
        if (selectedAvatar) {
            setAvatarUrl(selectedAvatar)
            localStorage.setItem('selectedAvatar', avatarName)
            // Atualizar o user no contexto com a nova URL do avatar
            const updatedUser = { ...user, avatarUrl: selectedAvatar }
            setUser(updatedUser)
            storageUser(updatedUser)
            toast.success('Avatar atualizado com sucesso!')
            setModalOpen(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (nome !== '') {
            const data = {
                ...user,
                nome: nome,
            }
            toast.success(`Nome alterado com sucesso, ${data.nome}`)
            setUser(data)
            storageUser(data)
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
                        <div className='label-avatar' onClick={() => setModalOpen(true)}>
                            <img src={avatarUrl} alt='foto de perfil' width={250} height={250} />
                        </div>

                        {modalOpen && (
                            <div className="modal">
                                <div className='modal-content'>
                                    <h3>Escolha um Avatar</h3>
                                    <div className='avatar-options'>
                                        {avatarOptions.map(option => (
                                            <img
                                                key={option.id}
                                                src={option.src}
                                                alt={`Avatar ${option.id}`}
                                                width={100}
                                                height={100}
                                                style={{ cursor: 'pointer', borderRadius: '50%' }}
                                                onClick={() => handleAvatarSelect(option.name)}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={() => setModalOpen(false)}>
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        )}

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