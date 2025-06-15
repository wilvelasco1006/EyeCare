import React, { useCallback } from "react";
import "./Sign.css";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom"; // Asegúrate de usar react-router-dom

const Sign = ({ closeModal }) => {
  const { loginGoogleWithPopup, userLooged } = useAuthStore();
  const navigate = useNavigate();

  const createUserInDatabase = useCallback(async (userData) => {
    console.log("createUserInDatabase llamado con:", userData);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    console.log("VITE_API_BASE_URL:", API_BASE); // Verifica esto
    if (!API_BASE) {
      console.error("¡VITE_API_BASE_URL no está definida!");
      return; // No intentes el fetch si la URL base no existe
    }
    const API_URL = `${API_BASE}users`; // Asegúrate de que la concatenación sea correcta (ej. manejo de '/')
    console.log("Intentando POST a API_URL:", API_URL); // Verifica la URL completa
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}users`, //
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
    console.log("PRIMER LOG: handleLogin ha sido invocado DIRECTAMENTE."); // <--- ¡MUY IMPORTANTE!
    loginGoogleWithPopup()
      .then(async (loggedInUser) => {
        console.log("Login exitoso, usuario:", loggedInUser); // Este probablemente no se vea
        closeModal();

        if (loggedInUser) {
          // Verifica que estas propiedades existen y tienen valor
          console.log("loggedInUser.displayName:", loggedInUser.displayName);
          console.log("loggedInUser.email:", loggedInUser.email);

          const { displayName, email } = loggedInUser; // Esto debería funcionar
          const data = { displayName, email };
          console.log("Preparando para crear usuario en BD con:", data);
          await createUserInDatabase(data); // <--- EL FOCO ESTÁ AQUÍ AHORA
        } else {
          // Este bloque ya no debería ejecutarse
          console.log("loggedInUser es null o undefined después del login");
        }


        // Crear usuario en la base de datos si el login fue exitoso
        // if (userLooged) {
        //   const { displayName, email } = userLooged;
        //   const data = { displayName, email };
        //   await createUserInDatabase(data);
        // }

        // Redirige al usuario a la página principal después de iniciar sesión
        navigate("/");
      })
      .catch((error) => {
        // ESTE BLOQUE DEBERÍA EJECUTARSE SI LA PROMESA FALLA DEBIDO AL COOP
        console.error("ERROR EN CATCH de loginGoogleWithPopup:", error);
        console.error("Tipo de error:", error.name);
        console.error("Mensaje de error:", error.message);
        console.error("Código de error (si existe):", error.code);
        // Redirige al usuario a la página de inicio de sesión en caso de error
        //navigate("/sign-in");
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
