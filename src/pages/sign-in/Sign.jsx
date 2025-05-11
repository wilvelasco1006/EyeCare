import React, { useCallback } from "react";
import "./Sign.css";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom"; // Asegúrate de usar react-router-dom

const Sign = ({ closeModal }) => {
  const { loginGoogleWithPopup } = useAuthStore(); // Método para iniciar sesión con Google
  const navigate = useNavigate(); // Para redirigir después del inicio de sesión

  const handleLogin = useCallback(() => {
    
    loginGoogleWithPopup()
    closeModal()
      .then(() => {
        // Redirige al usuario a la página principal después de iniciar sesión
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con Google:", error);
        // Redirige al usuario a la página de inicio de sesión en caso de error
        navigate("/sign-in");
      });
  }, [loginGoogleWithPopup, navigate]   
);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content-sign" onClick={(e) => e.stopPropagation()}>
        <div className="section-one">
          <button className="close-modal-sign-in" onClick={closeModal}>
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
        <button onClick={handleLogin} className="google-button">
          <FcGoogle style={{ fontSize: "3rem", marginRight: "8px" }} /> Iniciar
          sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Sign;
