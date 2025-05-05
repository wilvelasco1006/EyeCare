// Header.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./Header.css"; // Asegúrate de tener el CSS correspondiente
import Sign from "../../pages/sign-in/Sign"; // Asegúrate de que la ruta sea correcta
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { userLooged, Logout } = useAuthStore();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <header>
        <nav className="nav">
          <img src="/images/nobackground.png" alt="eye" className="logo" />
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/diseases/content-diseases" end>
            Enfermedades
          </NavLink>
          <NavLink to="/quiz" end>
            Quiz
          </NavLink>
          <NavLink to="/about-us" end>
            Sobre nosotros
          </NavLink>

          {userLooged ? (
            <>
              <span className="user-name">Hola, {userLooged.displayName}</span>
              <button className="sign-in-link" onClick={Logout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button className="sign-in-link" onClick={openModal}>
              Iniciar Sesión
            </button>
          )}
        </nav>
      </header>

      {/* Renderiza el modal si está activo */}
      {showModal && <Sign closeModal={closeModal} />}
    </>
  );
};

export default Header;