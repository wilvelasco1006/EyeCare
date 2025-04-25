import "./MacularDegeneration.css";
import { useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { MacularModel } from "./models-3d/MacularModel";
import { OrbitControls } from "@react-three/drei";
import Floor from "./models-3d/Floor";
import Lights from "./lights/Lights";
import { FaChevronRight } from "react-icons/fa";
import * as THREE from "three"; 

const CameraController = ({ viewIndex }) => {
  const { camera } = useThree();
  const targetRef = useRef({
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3()
  });

  const views = [
    { position: [0.9, 0.3, 2], lookAt: [0, 0, 0] },      // Frontal 
    { position: [1.5, 0.5, 0.7], lookAt: [0, 0, 0] },    // Lateral 
    { position: [0, 2.5, 1], lookAt: [0, 0, 0.5] }       // Superior 
  ];

  useEffect(() => {
    const { position, lookAt } = views[viewIndex];
    targetRef.current.position.set(...position);
    targetRef.current.lookAt.set(...lookAt);
  }
  , [viewIndex]);

  useFrame(() => {
    camera.position.lerp(targetRef.current.position, 0.05);
    camera.lookAt(targetRef.current.lookAt);
  });

  return null;

} 

const MacularDegeneration = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowInstruction(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const [viewIndex, setViewIndex] = useState(0); // control de la vista
  const handleClick = () => {
    // Cambia entre 3 vistas (0 → 1 → 2 → 0 ...)
    setViewIndex((prev) => (prev + 1) % 3);
  };

  // Mensajes flotantes según vista
  const messages = [
    "Vista frontal de la mácula.",
    "Vista lateral de la mácula.",
    "Vista superior para mejor panorama de la mácula.",
  ];

  return (
    <div className="macular-page">
      <div className="text">
        <h2>Degeneración Macular</h2>
        <h3>¿En qué consiste?</h3>
        <p>
          La <span>Degeneración Macular</span> es una enfermedad ocular que afecta la mácula, 
          la parte central de la retina encargada de la visión fina y detallada necesaria para leer, 
          conducir, reconocer rostros, etc. Con el tiempo, la mácula se deteriora y 
          causa visión borrosa o puntos ciegos en el centro del campo visual.
        </p>
        <details>
          <summary className="macular-summary">Más detalles</summary>
          <ul>
            <li>La degeneración macular puede ser seca o húmeda.</li>
            <li>La forma seca es más común y se produce por el adelgazamiento de la mácula.</li>
            <li>Las personas con DMAE pueden conservar la visión periférica</li>
            <li>Algunas investigaciones sugieren que la luz azul de pantallas podría contribuir al riesgo, pero aún no hay evidencia concluyente.</li>
            <li>Fumar duplica o triplica las probabilidades de desarrollar DMAE, ya que daña los vasos sanguíneos de la retina y acelera el estrés oxidativo en el ojo.</li>
          </ul>
        </details>
        <button className="modal-button" onClick={() => setShowModal(true)}>
          Causas y Efectos
        </button>
        {showInstruction && (
          <div className="instruction-message show">
            <div>
              <h3>¡Interactuemos un poco!</h3>
              <p>Presiona la flecha si quieres ver otras perspectivas de la mácula</p>
              <p>Presiona "Más detalles" si quieres saber más sobre esta enfermedad</p>
              <p>Presiona "Ver causas y efectos" para ver más información relevante</p>
            </div>  
          </div>
        )}
      </div>

      <div className="model-container">
        <button onClick={handleClick} className="btn-macular">
          <FaChevronRight />
        </button>
        <div className="float-message">
          {messages[viewIndex]}
        </div>
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows={true}>
          <OrbitControls autoRotate enableZoom={true} minDistance={1} maxDistance={5} />
          <MacularModel />
          <CameraController viewIndex={viewIndex} />
          <Floor />
          <Lights />
        </Canvas>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Factores y Efectos</h2>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Causas</th>
                  <th>Efectos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Biológicas</td>
                  <td>- Edad avanzada<br />- Genética/herencia<br />- Color de ojos claros</td>
                  <td>- Visión central borrosa<br />- Pérdida progresiva de detalles finos<br />- Manchas oscuras</td>
                </tr>
                <tr>
                  <td>Hábitos y estilo de vida</td>
                  <td>- Tabaquismo<br />- Dieta pobre en antioxidantes<br />- Sedentarismo</td>
                  <td>- Dificultad para leer, conducir o reconocer rostros<br />- Adaptación lenta a la oscuridad</td>
                </tr>
                <tr>
                  <td>Condiciones de salud</td>
                  <td>- Obesidad<br />- Hipertensión arterial<br />- Enfermedades cardiovasculares</td>
                  <td>- Necesidad de ayudas visuales<br />- Reducción de la capacidad funcional</td>
                </tr>
                <tr>
                  <td>Ambientales</td>
                  <td>- Exposición prolongada a la luz UV sin protección ocular</td>
                  <td>- Metamorfopsia<br />- Dificultad con los cambios de iluminación</td>
                </tr>
                <tr>
                  <td>Psicológicas/Sociales</td>
                  <td>- Impacto emocional de la pérdida visual</td>
                  <td>- Ansiedad<br />- Depresión<br />- Aislamiento social<br />- Disminución de la calidad de vida</td>
                </tr>
              </tbody>
            </table>
            <button className="close-button" onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacularDegeneration;
