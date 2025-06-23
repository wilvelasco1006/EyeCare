import React, { useCallback } from "react";
import "./Sign.css";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom"; 

const Sign = ({ closeModal }) => {
  const { loginGoogleWithPopup, userLooged } = useAuthStore();
  const navigate = useNavigate();

  const createUserInDatabase = useCallback(async (userData) => {
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/`, //ruta del index
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error creating user:`, error);
      throw error;
    }
  });

  const handleLogin = useCallback(() => {
    loginGoogleWithPopup()
      .then(async (loggedInUser) => {
        if (loggedInUser) {
          console.log("Usuario logueado:", loggedInUser);
          const { uid, displayName, email } = loggedInUser; // <-- Incluye el uid
          const data = { uid, displayName, email };         // <-- Incluye el uid
          await createUserInDatabase(data);
        } else {
          console.log("loggedInUser es null o undefined después del login");
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("ERROR EN CATCH de loginGoogleWithPopup:", error);
        // ...
      });
  }, [loginGoogleWithPopup, navigate, closeModal, userLooged]);


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
