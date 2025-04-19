import "./MacularDegeneration.css";
import { Canvas } from "@react-three/fiber";
import { MacularModel } from "./models-3d/MacularModel";
import { OrbitControls } from "@react-three/drei";
// import { Environment } from '@react-three/drei';
import Floor from "./models-3d/Floor";
import Lights from "./lights/Lights";

const MacularDegeneration = () => {
  return (
    <div className="macular-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
      <div className="text" style={{ flex: 1 }}>
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
      </div>
      <div className="model-container" style={{ flex: 1, height: '400px' }}>
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows={true}>
          <OrbitControls autoRotate enableZoom={true} minDistance={1} maxDistance={5}/>
          <MacularModel/>
          <Floor/>
          <Lights/>
        </Canvas>
      </div>
    </div>
  );
};

export default MacularDegeneration;