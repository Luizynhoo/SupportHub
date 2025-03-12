import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/FBConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    //Criando um loading para a hora do cadastro
    const [loadingAuth, setLoadingAuth] = useState(false)

    function singIn(email, password) {
        console.log(email)
        console.log(password);

        toast.success("USUÁRIO LOGADO COM SUCESSO")
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

                        toast.success("Novo usuario cadastrado com sucesso")
                        setLoadingAuth(false)
                    })

            })
            //Caso tenha algum erro..
            .cath((error) => {
                toast.warning(error);
                setLoadingAuth(false);
            })
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