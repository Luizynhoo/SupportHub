import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiChevronDown, FiChevronUp } from "react-icons/fi";
import avatarImg from "../../assets/avatar.png";
import "./header.css";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de abrir/fechar no mobile */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiChevronUp size={24} color="#fff" /> : <FiChevronDown size={24} color="#121212" />}
      </button>

      <div className={`sideBar ${isOpen ? "open" : "closed"}`}>
        <div>
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
