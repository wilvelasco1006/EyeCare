// Header.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sign from "./../../pages/sign-in/Sign";
import "./Header.css"; // Asegúrate de tener el CSS correspondiente 

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <header>
        <nav className="nav">
          <img src="/images/nobackground.png" alt="eye" className="logo" />
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/diseases/content-diseases" end>Enfermedades</NavLink>
          <NavLink to="/quiz" end>Quiz</NavLink>
          <NavLink to="/about-us" end>Sobre nosotros</NavLink>

          {/* Este es el botón que abre el modal */}
          <button className="sign-in-link" onClick={openModal}>
            Sign in
          </button>
        </nav>
      </header>

      {/* Renderiza el modal si está activo */}
      {showModal && <Sign closeModal={closeModal} />}
    </>
  );
};

export default Header;
