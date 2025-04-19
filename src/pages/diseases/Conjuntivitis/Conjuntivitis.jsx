/* eslint-disable react/no-unknown-property */
import "./Conjuntivitis.css";
import { Canvas } from "@react-three/fiber";
import { EyeHealthModel } from "./model-3d/EyeHealthModel";
import { OrbitControls } from "@react-three/drei";


const Conjuntivitis = () => {
    return (
        <div className="conjuntivitis-container">
            <div className="Text-container-sectionOne">
                <h2 className="conjuntivitis-title">Conjuntivitis</h2>
                <h3 className="subtitle">¿Que es?</h3>
                <p className="conjuntivitis-description">
                    La conjuntivitis es una inflamación de la membrana que recubre el interior del párpado y la parte blanca del ojo. Puede ser causada por infecciones, alergias o irritantes.
                </p>
            </div>
            <div className="model-container">
                <Canvas camera={{ position: [2, 0, 4], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} />
                    <OrbitControls />
                    <EyeHealthModel scale={[0.5, -0.5, -0.5]} position={[0, 0, 1]} />
                </Canvas>
            </div>
        </div>
    );
};

export default Conjuntivitis;