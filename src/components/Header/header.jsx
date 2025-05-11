import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiChevronUp, FiChevronDown } from "react-icons/fi";
import avatarImg from "../../assets/avatar.png";
import "./header.css";

export default function Header() {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="mobile-header">
                <button
                    className="toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isOpen ? <FiChevronDown size={24} color="#fff" /> : <FiChevronUp size={24} color="#fff" />}
                </button>
            </div>

            <div className={`sideBar ${isOpen ? "open" : "closed"}`}>
                <div className="avatar-container">
                    <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do usuario" />
                </div>

                <div className="icons">
                    <Link to="/dashboard">
                        <FiHome size={24} />
                        Chamados
                    </Link>

                    <Link to="/customers">
                        <FiUser size={24} />
                        Clientes
                    </Link>

                    <Link to="/profile">
                        <FiSettings size={24} />
                        Perfil
                    </Link>
                </div>
            </div>
        </>
    );
}