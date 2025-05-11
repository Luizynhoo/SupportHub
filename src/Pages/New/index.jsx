import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/FBConnection'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore'

import Header from '../../components/Header/header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'
import { toast } from 'react-toastify'

import './new.css'

//caminho do banco e criando referencia
const listRef = collection(db, "Clientes")

export default function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [IDCustomer, setIDCustomer] = useState(false)

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeEmpresa: doc.data().nomeEmpresa
            })
          })

          if (snapshot.docs.size === 0) {
            console.log("NENHUMA EMPRESA ENCONTRADA");
            setCustomers([{ id: '1', nomeEmpresa: 'FREELA' }])
            setLoadCustomer(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomer(false);

          //Criando uma função para puxar os dados do ID, caso tenha um ID
          if (id) {
            loadID(lista)
          }

        })
        .catch((error) => {
          console.log("ERRRO AO BUSCAR OS CLIENTES", error)
          setLoadCustomer(false);
          setCustomers([{ id: '1', nomeEmpresa: 'FREELA' }])
        })
    }

    loadCustomers();
  }, [])

  async function loadID(lista) {
    //Buscando o chamado e devolvendo para getDoc
    const docRef = doc(db, "Chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto)
        setStatus(snapshot.data().status)
        setComplemento(snapshot.data().complemento)

        //filtrando qual é o cliente
        let index = lista.findIndex(item => item.id === snapshot.data().clienteID)
        setCustomerSelected(index);
        setIDCustomer(true);
      })
      .catch((error) => {
        console.log(error);
        setIDCustomer(false);
      })
  }

  function hadleChangeCustomer(e) {
    setCustomerSelected(e.target.value)
    console.log(customers[e.target.value].nomeEmpresa);
  }


  //Recebendo o valor das opções selecionadas
  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  //Recebendo o valor das opções selecionadas
  function handleChangeSelect(e) {
    setAssunto(e.target.value)
  }

  //Função para registrar chamados
  async function handleRegister(e) {
    e.preventDefault();

    //Atualizando chamado
    if (IDCustomer) {
      const docRef = doc(db, "Chamados", id)
      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeEmpresa,
        clienteID: customers[customerSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid,
      })
      .then(()=>{
        toast.info("Chamado atualizado com sucesso!")
        setCustomerSelected(0);
        setComplemento('');
        navigate('/dashboard')
      })
      .catch((error)=>{
        console.log(error);
        toast.error("Erro ao atualizar chamado, tente novamente.")
      })

      return;
    }

    //Criando pasta no banco para registrar os chamados e rigistrando
    await addDoc(collection(db, "Chamados"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeEmpresa,
      clienteID: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Novo chamado registrado!")
        setComplemento("")
        setCustomerSelected(0)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao registrar chamado, tente novamente.")
      })
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name={ id ? "Editando Chamado" : "Novo Chamado"}>
          <FiPlusCircle size={25} color='#f8f8f8' />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>

            <label>Clientes</label>
            {
              loadCustomer ? (
                <input type="text" disabled={true} value="Carregando..." />
              ) : (
                <select value={customerSelected} onChange={hadleChangeCustomer}>
                  {customers.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.nomeEmpresa}
                      </option>
                    )
                  })}
                </select>
              )
            }

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>


            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">{ id ? "Atualizar" : "Registrar"}</button>

          </form>
        </div>
      </div>
    </div>
  )
}