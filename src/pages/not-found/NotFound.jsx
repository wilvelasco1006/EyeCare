import "./NotFound.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa Outlet


const Error = [
  {
    name: "NotFound",
    ruta: "/diseases/glaucoma", // Ruta correspondiente
  }]

const NotFound = () => {
  const [index, setIndex] = useState(1); 
  const navigate = useNavigate(); 
  return (
    <div className="not-found-page">
      <h1>Página no encontrada</h1>
      <h2>Oops... Por aquí no era :c</h2>
      <p>Parece que te perdiste, pero no te preocupes, te ayudamos a volver.</p>
      <button
          className="button-home"
          aria-label="Regresar al inicio"
          onClick={() => navigate("/")}>
        Regresar al inicio
      </button>
    </div>
  )
}

export default NotFound;
