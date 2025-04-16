import { useState } from 'react'
import { db } from '../../services/FBConnection'
import { addDoc, collection } from 'firebase/firestore'

import Header from '../../components/Header/header'
import Title from '../../components/Title/index'

import { FiUser } from 'react-icons/fi'
import { toast } from 'react-toastify'


export default function Customers() {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')

  async function handleRegister(e) {
    e.preventDefault();

    if (nome !== '' && cnpj !== '' && endereco !== '') {
      await addDoc(collection(db, "Clientes"), {
        nomeEmpresa: nome,
        cnpj: cnpj,
        endereco: endereco
      })
        .then(() => {
          setNome('')
          setCnpj('')
          setEndereco('')
          toast.success('Empresa registrada')
        })
        .catch((error) => {
          console.log(error);
          toast.error("Não foi possível concluir o cadastro. Por favor, tente novamente.")
        })
    } else {
      toast.error("Preencha todos os campos")
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} color='#fff' />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Nome da Empresa</label>
            <input
              type="text"
              placeholder="Nome da empresa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
                if (rawValue.length <= 14) { // Limita o valor a 14 dígitos
                  setCnpj(
                    rawValue
                      .replace(/^(\d{2})(\d)/, '$1.$2') // Formata para o primeiro bloco
                      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Segundo bloco
                      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Formata o /
                      .replace(/(\d{4})(\d)/, '$1-$2') // Final com -
                  );
                }
              }}
            />
            
            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <button type="submit">
              Salvar
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}