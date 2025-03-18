import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

export default function Private({ children }){
    //Importando e utilizando objeto de controle de cadastro 
    //Caso houver um cadastro (true) entrará caso não (false)
    const {signed, loading} = useContext(AuthContext);
    
    if(loading){
        return(
            <div>
                
            </div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>
    }

    return children;
}