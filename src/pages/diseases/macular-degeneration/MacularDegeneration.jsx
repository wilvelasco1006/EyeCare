import "./MacularDegeneration.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { MacularModel } from "./models-3d/MacularModel";
import { OrbitControls } from "@react-three/drei";
import Floor from "./models-3d/Floor";
import Lights from "./lights/Lights";

const MacularDegeneration = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="macular-page">
      <div className="text">
        <h1>Degeneración Macular</h1>
        <p>
          La Degeneración Macular es una enfermedad ocular que afecta la mácula, 
          la parte central de la retina encargada de la visión fina y detallada necesaria para leer, 
          conducir, reconocer rostros, etc. Con el tiempo, la mácula se deteriora y 
          causa visión borrosa o puntos ciegos en el centro del campo visual.
        </p>
        <p>
          La degeneración macular puede ser seca o húmeda. 
          La forma seca es más común y se produce por el adelgazamiento de la mácula.
        </p>

        <button className="modal-button" onClick={() => setShowModal(true)}>
          Ver causas y efectos
        </button>
      </div>

      <div className="model-container">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows={true}>
          <OrbitControls autoRotate enableZoom={true} minDistance={1} maxDistance={5} />
          <MacularModel />
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
