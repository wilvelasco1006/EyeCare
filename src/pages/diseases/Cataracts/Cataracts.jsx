import React, { useState, useEffect } from "react";
import "./Cataracts.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeCataractModel } from "./Model-3d/EyeCataractModel";
import Floor from "./Model-3d/Floor";

const Cataracts = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipMessage, setTooltipMessage] = useState(
    "Usa click izquierdo para rotar el modelo o la rueda para acercar o alejar"
  );
  const [fadeActive, setFadeActive] = useState(true);

  useEffect(() => {
    // Alternar entre los mensajes y visibilidad cada 5 segundos
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev); // Alterna la visibilidad
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleNext = () => {
    setFadeActive(false); // Oculta la sección con animación
    setTimeout(() => {
      setSectionIndex((prevIndex) => (prevIndex + 1) % sections.length);
      setFadeActive(true); // Muestra la nueva sección con animación
    }, 300); // Espera 300ms para que la animación de salida ocurra antes del cambio
  };

  const sections = [
    {
      title: "¿En qué consiste?",
      content: (
        <p>
          Las cataratas son una opacidad o nubosidad en el cristalino del ojo,
          el lente natural que permite enfocar la luz y formar imágenes claras
          en la retina. Con el tiempo, esta nubosidad dificulta la visión,
          afectando la calidad de vida de quien la padece. Aunque las cataratas
          están relacionadas con el envejecimiento, también se pueden
          desarrollar por lesiones oculares.
        </p>
      ),
    },
    {
      title: "Causas",
      content: (
        <>
          <p>
            Las cataratas pueden ser causadas por diversos factores, entre
            ellos:
          </p>
          <ul className="animated-list">
            {[
              "Envejecimiento natural del ojo.",
              "Lesiones oculares que dañan el cristalino.",
              "Exposición prolongada a la luz ultravioleta.",
              "Enfermedades como la diabetes.",
              "Uso prolongado de medicamentos como corticosteroides.",
            ].map((item, index) => (
              <li
                key={index}
                style={{ animationDelay: `${index * 0.3}s` }}
                className="fade-in-item"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "Efectos en la visión",
      content: (
        <>
          <p>Las cataratas afectan la visión de varias maneras, como:</p>
          <ul className="animated-list">
            {[
              "Visión borrosa o nublada.",
              "Sensibilidad a la luz.",
              "Colores menos brillantes.",
              "Dificultad para ver de noche.",
            ].map((item, index) => (
              <li
                key={index}
                style={{ animationDelay: `${index * 0.3}s` }}
                className="fade-in-item"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "¿Cómo se ve la visión con cataratas?",
      content: (
        <div className="vision-images">
          <img
            src="/cataract-vision.jpg"
            alt="Visión con cataratas"
            className="vision-image"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="cataracts-page">
      {/* Contenedor principal con dos columnas */}
      <div className="cataracts-container">
        {/* Columna izquierda: Información */}
        <div className="cataracts-text">
          <h1>Cataratas</h1>
          <h2>{sections[sectionIndex].title}</h2>
          <div
            className={`cataracts-content fade-transition ${
              fadeActive ? "active" : ""
            }`}
          >
            {sections[sectionIndex].content}
          </div>

          <button className="next-button" onClick={handleNext}>
            <img
              src="/doble-flecha.png"
              alt="Siguiente"
              className="next-icon"
            />
          </button>
        </div>

        {/* Columna derecha: Modelo 3D */}
        <div className="model-container">
          <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight castShadow intensity={1} />
            <directionalLight castShadow position={[2, 2, 2]} intensity={2} />
            <OrbitControls minDistance={0.5} maxDistance={1} />
            <EyeCataractModel scale={10} position={[0, 0, 0]} />
            <Floor />
          </Canvas>
          {showTooltip && <div className="model-tooltip">{tooltipMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Cataracts;
