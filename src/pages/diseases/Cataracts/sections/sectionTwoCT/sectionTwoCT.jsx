import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import Staging from "../../../staging/Staging";
import { EyeBlank } from "../../model-3d/EyeBlank";
import "../../sections/sectionTwoCT/SectionTwoCT.css";
import Floor from "../../Model-3d/Floor";

const Scene = () => {
    const healthyEyeRef = useRef();
    const { camera } = useThree();
    const [message, setMessage] = useState(null);
    const [target, setTarget] = useState(null);

    // Movimiento suave de cámara
    useFrame(() => {
        if (target) {
            camera.position.lerp(target, 0.05);
            camera.lookAt(0, 0, 0);
        }
    });

    const handleHealthyClick = () => {
        const targetPos = healthyEyeRef.current
            .getWorldPosition(new THREE.Vector3())
            .add(new THREE.Vector3(0, 0, 1.5));
        setMessage("Este es un ojo afecatado por cataratas");
        setTarget(targetPos);
    };

    return (
        <>
            {/* Título flotante */}
            <Html
                position={[0, 1, -2]}
                center
                distanceFactor={8}
                wrapperClass="title"
                transform
            >
                <h1>Síntomas de cataratas</h1>
            </Html>

            {/* Ojo sano */}
            <group
                ref={healthyEyeRef}
                position={[0, 0, 0]} // Centra el modelo en la escena
                onClick={handleHealthyClick}
            >
                <Suspense fallback={null}>
                    <EyeBlank scale={[1, 1, 1]} /> {/* Aumenta el tamaño del modelo */}
                </Suspense>
            </group>

            {/* Mensaje flotante */}
            {message && (
                <Html position={[0, -1, 0]} center distanceFactor={6} transform>
                    <div className="mensaje-info">{message}</div>
                </Html>
            )}

            {/* Representación visual de los síntomas */}
            <Html
                position={[0, -1.5, 0]}
                center
                distanceFactor={6}
                transform
                wrapperClass="animated-symptoms"
            >
                <div className="sintomas-info">
                    <h3>Síntomas comunes:</h3>
                    <ul>
                        <li>Visión borrosa o nublada</li>
                        <li>Sensibilidad a la luz</li>
                        <li>Colores menos brillantes</li>
                        <li>Dificultad para ver de noche</li>
                    </ul>
                </div>
            </Html>

            <Staging />
            <Floor />
        </>
    );
};

const SectionTwoCT = () => {
    return (
        <div className="model-container">
            <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows={true}>
                <ambientLight castShadow intensity={0.5} />
                <directionalLight
                    position={[2, 2, 2]}
                    intensity={1.5}
                    castShadow={true}
                    shadow-mapSize={[2048, 2048]}
                />
                <OrbitControls enablePan={false} maxDistance={4} minDistance={1.5} />
                <Scene />
            </Canvas>
        </div>
    );
};

export default SectionTwoCT;
