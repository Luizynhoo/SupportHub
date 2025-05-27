import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header/header';
import Title from '../../components/Title/';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter, query, doc } from 'firebase/firestore';
import { db } from '../../services/FBConnection';
import { format } from 'date-fns';
import Modal from '../../components/Modal';

import './dashboard.css';

const listRef = collection(db, "Chamados");

export default function Dashboard() {
    const { logout } = useContext(AuthContext);

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [lastDocs, setLastDocs] = useState();
    const [loadingMore, setLoadingMore] = useState(false);
    const [filterCliente, setFilterCliente] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const listVisible = 2;
    const listLoading = 5;

    useEffect(() => {
        async function loadChamados() {
            const startTime = Date.now();
            const q = query(listRef, orderBy('created', 'desc'), limit(listVisible));
            const querySnapshot = await getDocs(q);
            setChamados([]);
            await updateState(querySnapshot);

            const elapsed = Date.now() - startTime;
            const delay = Math.max(1500 - elapsed, 0);
            setTimeout(() => setLoading(false), delay);
        }
        loadChamados();
    }, []);

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0;
        if (!isCollectionEmpty) {
            let lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                assunto: doc.data().assunto,
                cliente: doc.data().cliente,
                clienteID: doc.data().clienteID,
                created: doc.data().created,
                createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                status: doc.data().status,
                complemento: doc.data().complemento,
            }));
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        } else {
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className='content'>
                    <Title name="Chamados"><FiMessageSquare size={25} color="#f8f8f8" /></Title>
                    <div className="container dashboard">
                        <div className="spinner"></div>
                        <span className="loading-message">Buscando chamados...</span>
                    </div>
                </div>
            </div>
        );
    }

    async function handleMore() {
        setLoadingMore(true);
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        try {
            const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(listLoading));
            const [querySnapshot] = await Promise.all([getDocs(q), delay(500)]);
            await updateState(querySnapshot);
        } finally {
            setLoadingMore(false);
        }
    }

    function toggleModal(item) {
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    // Filtrar chamados com base nos critérios
    const filteredChamados = chamados.filter(chamado => {
        const matchesCliente = !filterCliente || chamado.cliente.toLowerCase().includes(filterCliente.toLowerCase());
        const matchesStatus = !filterStatus || chamado.status === filterStatus;
        return matchesCliente && matchesStatus;
    });

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Chamados"><FiMessageSquare size={25} color="#f8f8f8" /></Title>

                {chamados.length === 0 ? (
                    <div className="container dashboard">
                        <span>Nenhum chamado encontrado...</span>
                        <Link to="/Dashboard/New" className="new">
                            <FiPlus color="#f8f8f8" size={25} /> Novo chamado
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="filter-container">
                            <div style={{ display: 'flex', gap: '10px', flexGrow: 1 }}>
                                <input
                                    type="text"
                                    placeholder="Filtrar por cliente..."
                                    value={filterCliente}
                                    onChange={(e) => setFilterCliente(e.target.value)}
                                    className="filter-input"
                                />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">Todos os status</option>
                                    <option value="Aberto">Aberto</option>
                                    <option value="Progresso">Progresso</option>
                                    <option value="Fechado">Fechado</option>
                                </select>
                            </div>
                            <Link to="/Dashboard/New" className="new">
                                <FiPlus color="#f8f8f8" size={25} /> Novo chamado
                            </Link>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrando em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredChamados.map((item, index) => (
                                    <tr key={index}>
                                        <td data-label="Cliente">{item.cliente}</td>
                                        <td data-label="Assunto">{item.assunto}</td>
                                        <td data-label="Status">
                                            <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#28a745' : item.status === 'Fechado' ? '#6c757d' : '#ffc107' }}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td data-label="Cadastrado">{item.createdFormat}</td>
                                        <td data-label="#">
                                            <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => toggleModal(item)}>
                                                <FiSearch color='#FFF' size={17} />
                                            </button>
                                            <Link to={`/Dashboard/New/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                                                <FiEdit2 color='#FFF' size={17} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {loadingMore && <div className="loading-more"><span className="spinner"></span></div>}
                        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}><span>VER MAIS</span></button>}
                    </>
                )}
            </div>

            {showPostModal && (
                <Modal conteudo={detail} close={() => setShowPostModal(!showPostModal)} />
            )}
        </div>
    );
}