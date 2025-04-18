import React from "react";
import "./Cataracts.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeCataractModel } from "./EyeCataractModel"; // Importa el modelo
const Cataracts = () => {
  return (
    <div className="cataracts-page">
      <h1>¿Qué son las Cataratas?</h1>
      <p>
        Las cataratas son una opacidad o nubosidad en el cristalino del ojo, el
        lente natural que permite enfocar la luz y formar imágenes claras en la
        retina, con el tiempo, esta nubosidad dificulta la visión, afectando la
        calidad de vida de quien la padece. Aunque las cataratas esta
        relacionadas con el envejecimiento,también se puede desarrollar por
        lesiones oculares.
      </p>
      <div className="model-container">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <OrbitControls />
          <EyeCataractModel /> {/* Renderiza el modelo */}
        </Canvas>
      </div>
    </div>
  );
};

export default Cataracts;
