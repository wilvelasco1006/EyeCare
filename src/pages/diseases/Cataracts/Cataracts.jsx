import React, { useState } from "react";
import "./Cataracts.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeCataractModel } from "./Model-3d/EyeCataractModel";
import Floor from "./Model-3d/Floor";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Cataracts = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
        <ul>
          <li>Envejecimiento natural del ojo.</li>
          <li>Lesiones oculares que dañan el cristalino.</li>
          <li>Exposición prolongada a la luz ultravioleta.</li>
          <li>Enfermedades como la diabetes.</li>
          <li>Uso prolongado de medicamentos como corticosteroides.</li>
        </ul>
      ),
    },
    {
      title: "Efectos en la visión",
      content: (
        <ul>
          <li>Visión borrosa o nublada.</li>
          <li>Sensibilidad a la luz.</li>
          <li>Colores menos brillantes.</li>
          <li>Dificultad para ver de noche.</li>
        </ul>
      ),
    },
  ];

  const handleNext = () =>
    setSectionIndex((prev) => (prev + 1) % sections.length);
  const handlePrev = () =>
    setSectionIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1));

  return (
    <div className="cataracts-page">
      <div className="cataracts-container">
        {/* Columna izquierda: Texto e interacción */}
        <div className="text-container-section-one">
          <h1 className="cataracts-title">Cataratas</h1>
          <h2 className="cataracts-subtitle">{sections[sectionIndex].title}</h2>

          {/* Zona scrollable */}
          <div className="cataracts-content">
            {sections[sectionIndex].content}
          </div>

          {/* Zona fija inferior: navegación + botón */}
          <div className="actions">
            <div className="navigation">
              <button onClick={handlePrev} className="nav-button">
                <FaChevronLeft />
              </button>
              <div className="dots">
                {sections.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === sectionIndex ? "active" : ""}`}
                  >
                    •
                  </span>
                ))}
              </div>
              <button onClick={handleNext} className="nav-button">
                <FaChevronRight />
              </button>
            </div>
            <button
              className="cataracts-modal-button"
              onClick={() => setShowModal(true)}
            >
              ¿Cómo ve una persona con cataratas?
            </button>
          </div>
        </div>
        {/* Columna derecha: Modelo 3D */}
        <div className="cataracts-model-container">
          <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight castShadow intensity={0.5} />
            <directionalLight castShadow position={[2, 2, 2]} intensity={2} />
            <OrbitControls minDistance={0.5} maxDistance={1} />
            <EyeCataractModel scale={10} position={[0, 0, 0]} />
            <Floor />
          </Canvas>
        </div>
      </div>

      {/* Ventana emergente (modal) */}
      {showModal && (
        <div
          className="cataracts-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="cataracts-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>¿Cómo se ve la visión con cataratas?</h2>
            <img
              src="https://res.cloudinary.com/dijh9two4/image/upload/v1745616701/cataract-vision_spvbi3.jpg"
              alt="Visión con cataratas"
              className="vision-image"
            />
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cataracts;
