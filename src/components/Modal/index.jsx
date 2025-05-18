import './modal.css'

import { FiX, FiUser, FiCalendar, FiTag } from 'react-icons/fi'

export default function Modal({ conteudo, close }) {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={20} color='#f8f8f8' />
                    Fechar
                </button>

                <main>
                    <h2>Detalhes do Chamado</h2>

                    <div className='row'>
                        <span>
                            <FiUser className='icon' size={18} />
                            Cliente: <i>{conteudo.cliente}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            <FiTag className='icon' size={18} />
                            Assunto: <i>{conteudo.assunto}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            <FiCalendar className='icon' size={18} />
                            Cadastrado em: <i>{conteudo.createdFormat}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            <FiTag className='icon' size={18} />
                            Status: 
                            <i className='status-badge' style={{ color: "#fff", backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                                {conteudo.status}
                            </i>
                        </span>
                    </div>

                    {conteudo.complemento !== '' && (
                        <div className='complemento-section'>
                            <h3>Complemento</h3>
                            <p>{conteudo.complemento}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}