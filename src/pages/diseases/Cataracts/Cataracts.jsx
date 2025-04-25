import React, { useState, useEffect } from "react";
import "./Cataracts.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeCataractModel } from "./Model-3d/EyeCataractModel";
import Floor from "./Model-3d/Floor";

const Cataracts = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [tooltipMessage, setTooltipMessage] = useState(
    "Usa click izquierdo para rotar el modelo o la rueda para acercar o alejar"
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Alternar entre los mensajes y visibilidad cada 5 segundos
    const interval = setInterval(() => {
      setShowTooltip((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cataracts-page">
      {/* Contenedor principal */}
      <div className="cataracts-container">
        {/* Columna izquierda: Información */}
        <div className="Text-container-sectionOne">
          <h1 className="cataracts-title">Cataratas</h1>
          <h2 className="subtitle">¿Qué son las cataratas?</h2>
          <p className="cataracts-description">
            Las cataratas son una opacidad o nubosidad en el cristalino del ojo,
            el lente natural que permite enfocar la luz y formar imágenes claras
            en la retina. Con el tiempo, esta nubosidad dificulta la visión,
            afectando la calidad de vida de quien la padece. Aunque las
            cataratas están relacionadas con el envejecimiento, también se
            pueden desarrollar por lesiones oculares.
          </p>

          {/* Información de causas y efectos */}
          <details className="details-transition">
            <summary className="cataracts-summary">
              Causas y efectos en la visión
            </summary>
            <div className="cataracts-section">
              <div>
                <h4 className="cataracts-heading">Causas:</h4>
                <ul className="cataracts-sublist">
                  <li>Envejecimiento natural del ojo.</li>
                  <li>Lesiones oculares que dañan el cristalino.</li>
                  <li>Exposición prolongada a la luz ultravioleta.</li>
                  <li>Enfermedades como la diabetes.</li>
                  <li>Uso prolongado de medicamentos como corticosteroides.</li>
                </ul>
              </div>
              <div>
                <h4 className="cataracts-heading">Efectos en la visión:</h4>
                <ul className="cataracts-sublist">
                  <li>Visión borrosa o nublada.</li>
                  <li>Sensibilidad a la luz.</li>
                  <li>Colores menos brillantes.</li>
                  <li>Dificultad para ver de noche.</li>
                </ul>
              </div>
            </div>
          </details>

          {/* Botón para mostrar la imagen en una ventana emergente */}
          <button className="modal-button" onClick={() => setShowModal(true)}>
            ¿Cómo se ve la visión con cataratas?
          </button>
        </div>

        {/* Columna derecha: Modelo 3D */}
        <div className="model-container">
          <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight castShadow intensity={0.5} />
            <directionalLight castShadow position={[2, 2, 2]} intensity={2} />
            <OrbitControls minDistance={0.5} maxDistance={1} />
            <EyeCataractModel scale={10} position={[0, 0, 0]} />
            <Floor />
          </Canvas>
          {showTooltip && <div className="model-tooltip">{tooltipMessage}</div>}

          {/* Mensaje debajo del modelo */}
        </div>
      </div>

      {/* Ventana emergente */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¿Cómo se ve la visión con cataratas?</h2>
            <img
              src="https://res.cloudinary.com/dijh9two4/image/upload/v1745616701/cataract-vision_spvbi3.jpg"
              alt="Visión con cataratas"
              className="vision-image"
            />
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cataracts;
