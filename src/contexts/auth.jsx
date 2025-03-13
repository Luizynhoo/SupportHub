import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/FBConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    //Criando um loading para a hora do cadastro
    const [loadingAuth, setLoadingAuth] = useState(false)

    //Utilização para após login entrar no Dash 
    const navigate = useNavigate();

    async function singIn(email, password, setEmail, setPassword) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                //Buscando os dados do usuario
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    nome: docSnap.data().nome,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                }


                setUser(data);
                storageUser(data);
                setLoadingAuth(false)
                toast.success(`Bem-vindo(a), ${data.nome}!`);
                navigate("/dashboard")
            })
            .catch((error) => {
                toast.warning("Ops..E-mail ou senha incorretos");
                setEmail("");   
                setPassword(""); 
                setLoadingAuth(false);
            })
    }

    //Cadastro de novo usuario
    async function signUp(email, password, nome) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid

                await setDoc(doc(db, "users", uid), {
                    nome: nome,
                    avatarUrl: null
                })
                    .then(() => {

                        //Criando dados para poder salvar no User
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };


                        setUser(data);
                        storageUser(data)
                        toast.success(`Bem-vindo(a), ${data.nome}!`);
                        setLoadingAuth(false)
                        navigate("/dashboard")

                    })

            })
            //Caso tenha algum erro..
            .catch((error) => {
                toast.error("Ops..algo deu errado, tente novamente mais tarde!");
                setLoadingAuth(false);
            })
    }

    //Salvando infos no servidor local
    function storageUser(data) {
        localStorage.setItem('@ticketLocal', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                singIn,
                signUp,
                loadingAuth,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;