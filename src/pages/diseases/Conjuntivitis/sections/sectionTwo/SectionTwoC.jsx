/* eslint-disable react/no-unknown-property */
/** eslint-disable react/no-unknown-property **/
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { HealthyEye, InfectedEye } from "../../model-3d/EyeInfected"; // Updated import
import Floor from "../../model-3d/Floor";
import Staging from "../../../staging/Staging";
import "./SectionTwoC.css";

const Scene = () => {
    const healthyEyeRef = useRef();
    const infectedEyeRef = useRef();
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
        const targetPos = healthyEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setMessage("Ojo sano: sin enrojecimiento ni inflamación.");
        setTarget(targetPos);
    };

    const handleInfectedClick = () => {
        const targetPos = infectedEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setMessage("Síntomas de conjuntivitis: enrojecimiento, inflamación, secreción purulenta.");
        setTarget(targetPos);
    };

    return (
        <>
            {/* Título flotante */}
            <Html position={[0, 1, -2]} center distanceFactor={8} wrapperClass="title">
                <h1>Síntomas de la conjuntivitis</h1>
            </Html>
            
            {/* Ojo sano */}
            <group ref={healthyEyeRef} position={[-0.6, 0, 1]} onClick={handleHealthyClick}>
                <HealthyEye scale={[0.5, 0.5, 0.5]} />
            </group>
            
            {/* Ojo infectado */}
            <group ref={infectedEyeRef} position={[0.6, 0, 1]} onClick={handleInfectedClick}>
                <InfectedEye scale={[0.5, 0.5, 0.5]} />
            </group>
            
            {/* Mensaje flotante */}
            {message && (
                <Html position={[0, -1, 0]} center distanceFactor={6}>
                    <div className="mensaje-info">{message}</div>
                </Html>
            )}
            
            <Staging />
            <Floor />
        </>
    );
};

const SectionTwoC = () => {
    return (
        <div className="model-container">
            <Canvas camera={{ position: [0, 0.3, 2.5], fov: 60 }} shadows={true}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[2, 2, 2]}
                    intensity={3}
                    castShadow={true}
                    shadow-mapSize={[2048, 2048]}
                />
                <OrbitControls enablePan={false} maxDistance={4} minDistance={1.5} />
                <Scene />
            </Canvas>
        </div>
    );
};

export default SectionTwoC;