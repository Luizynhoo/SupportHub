import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header/header'
import Title from '../../components/Title/'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import './dashboard.css'

export default function Dashboard() {
    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Chamados">
                    <FiMessageSquare size={25} color="#f8f8f8" />
                </Title>

                <>

                    <Link className='new' to="/Dashboard/New">
                        <FiPlus size={25} color='#f8f8f8'/>
                        Novo chamado
                    </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td  data-label="Cliente">R11 Travel</td>
                                    <td  data-label="Assunto">Suporte</td>
                                    <td  data-label="Status">
                                        <span className='badge' style={{backgroundColor:"#999"}}>
                                            Em Aberto
                                        </span>
                                    </td>
                                    <td  data-label="Cadastrado">12/05/2022</td>
                                    <td  data-label="#">
                                        <button className='action' style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color='#f8f8f8' size={17}/>
                                        </button>
                                        <button className='action' style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color='#f8f8f8' size={17}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                </>
            </div>
        </div>
    )
}