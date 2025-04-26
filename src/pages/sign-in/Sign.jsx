// Sign.jsx
import React from "react";
import "./Sign.css";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Sign = ({ closeModal }) => {
    return (
        <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content-sign" onClick={(e) => e.stopPropagation()}>
            <div className="section-one">
            <button className="close-modal" onClick={closeModal}>
                <FaTimes style={{ fontSize: "1.5rem" }} />
            </button>
            <h2>Iniciar Sesión</h2>
            <p>
                Inicia sesión para acceder a tu cuenta y disfrutar de todas las
                funcionalidades de nuestra aplicación.
            </p>
            <form className="login-form">
                <input type="text" placeholder="Correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <a href="">¿Olvidaste tu contraseña?</a>
                <button type="submit">Iniciar Sesión</button>
            </form>
            </div>
            <div className="section-two">
            <h2>¡Bienvenido!</h2>
            <p>Regístrate ahora y comienza a disfrutar</p>
            <button className="register-button">Registrarse</button>
            </div>
            <button className="google-button"> <FcGoogle style={{ fontSize: '3rem', marginRight: '8px' }}/> Iniciar sesión con Google</button>
        </div>
        </div>
    );
    };

export default Sign;
