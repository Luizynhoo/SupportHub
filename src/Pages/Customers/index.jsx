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
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [complemento, setComplemento] = useState('')

  async function buscarEndereco(cepDigitado) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
      const data = await response.json()

      if (!data.erro) {
        setRua(data.logradouro || '')
        setBairro(data.bairro || '')
        setCidade(data.localidade || '')
        setEstado(data.uf || '')
        setComplemento(data.complemento || '')
      } else {
        toast.error("CEP não encontrado.")
        limparCamposEndereco()
      }
    } catch (error) {
      toast.error("Erro ao buscar o endereço.")
      limparCamposEndereco()
    }
  }

  function limparCamposEndereco() {
    setRua('')
    setBairro('')
    setCidade('')
    setEstado('')
    setComplemento('')
  }

  async function handleRegister(e) {
    e.preventDefault()

    if (nome && cnpj && cep && rua && bairro && cidade && estado) {
      await addDoc(collection(db, "Clientes"), {
        nomeEmpresa: nome,
        cnpj: cnpj,
        cep: cep,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        complemento: complemento
      })
        .then(() => {
          setNome('')
          setCnpj('')
          setCep('')
          limparCamposEndereco()
          toast.success('Empresa registrada com sucesso!')
        })
        .catch((error) => {
          console.error(error)
          toast.error("Erro ao registrar empresa.")
        })
    } else {
      toast.error("Preencha todos os campos obrigatórios.")
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
                const rawValue = e.target.value.replace(/\D/g, '')
                if (rawValue.length <= 14) {
                  setCnpj(
                    rawValue
                      .replace(/^(\d{2})(\d)/, '$1.$2')
                      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                      .replace(/\.(\d{3})(\d)/, '.$1/$2')
                      .replace(/(\d{4})(\d)/, '$1-$2')
                  )
                }
              }}
            />

            <label>CEP</label>
            <input
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '')
                setCep(value)
                if (value.length === 8) {
                  buscarEndereco(value)
                }
              }}
            />

            <label>Rua</label>
            <input
              type="text"
              placeholder="Rua / Avenida"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />

            <label>Bairro</label>
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />

            <label>Cidade</label>
            <input
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />

            <label>Estado</label>
            <input
              type="text"
              placeholder="Estado (UF)"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />

            <label>Complemento</label>
            <input
              type="text"
              placeholder="Complemento (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
