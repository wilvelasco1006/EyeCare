/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, KeyboardControls, useKeyboardControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import InfectedEye from "../../model-3d/EyeInfected";
import EyeHealthModel from "../../model-3d/EyeHealthModel";
import Floor from "../../model-3d/Floor";
import Staging from "../../../staging/Staging";
import "./SectionTwoC.css";

const Scene = () => {
    const healthyEyeRef = useRef();
    const infectedEyeRef = useRef();
    const healthyModelRef = useRef();
    const infectedModelRef = useRef();
    const { camera } = useThree();

    const initialCameraPos = new THREE.Vector3(0, 0.3, 2.5);

    const [healthyMessage, setHealthyMessage] = useState(false);
    const [infectedMessage, setInfectedMessage] = useState(false);
    const [target, setTarget] = useState(null);
    const [rotateHealthy, setRotateHealthy] = useState(false);
    const [rotateInfected, setRotateInfected] = useState(false);
    const [cameraLocked, setCameraLocked] = useState(false);

    const [subscribeKeys] = useKeyboardControls();

    // Movimiento de cámara y rotación de modelos
    useFrame(() => {
        if (target && cameraLocked) {
            camera.position.lerp(target, 0.05);
            camera.lookAt(0, 0, 0);
        }

        if (rotateHealthy && healthyModelRef.current) {
            healthyModelRef.current.rotation.y += 0.02;
        }

        if (rotateInfected && infectedModelRef.current) {
            infectedModelRef.current.rotation.y += 0.02;
        }
    });

    const resetView = () => {
        setTarget(initialCameraPos.clone());
        setHealthyMessage(false);
        setInfectedMessage(false);
        setRotateHealthy(false);
        setRotateInfected(false);
        setCameraLocked(false);

        // Resetear rotación de los ojos
        if (healthyModelRef.current) healthyModelRef.current.rotation.set(0, 0, 0);
        if (infectedModelRef.current) infectedModelRef.current.rotation.set(0, 0, 0);
    };

    // Manejar tecla R
    useEffect(() => {
        const unsubscribe = subscribeKeys(
            (state) => state.reset,
            (value) => {
                if (value) resetView();
            }
        );
        return () => unsubscribe();
    }, [subscribeKeys]);

    const handleHealthyClick = () => {
        const targetPos = healthyEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(true);
        setInfectedMessage(false);
        setRotateHealthy(true);
        setRotateInfected(false);
        setTarget(targetPos);
        setCameraLocked(true);
    };

    const handleInfectedClick = () => {
        const targetPos = infectedEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(false);
        setInfectedMessage(true);
        setRotateHealthy(false);
        setRotateInfected(true);
        setTarget(targetPos);
        setCameraLocked(true);
    };

    return (
        <>
            {/* Ojo sano */}
            <group
                ref={healthyEyeRef}
                position={[-0.9, 0, 1.2]}
                rotation={[0, Math.PI, 0]}
                onClick={handleHealthyClick}
            >
                <EyeHealthModel ref={healthyModelRef} scale={[0.5, 0.5, 0.5]} />
            </group>

            {/* Ojo infectado */}
            <group ref={infectedEyeRef} position={[0.6, 0, 1]} onClick={handleInfectedClick}>
                <InfectedEye ref={infectedModelRef} scale={[0.5, 0.5, 0.5]} />
            </group>

            <Html occlude position={[0, 2, -3]} transform center distanceFactor={5} wrapperClass="title">
                <h1>Síntomas de la conjuntivitis</h1>
            </Html>

            {/* Mensaje para ojo sano */}
            {healthyMessage && (
                <Html position={[-1.5, -1, 0]} center distanceFactor={6}>
                    <div className="mensaje-info mensaje-sano">
                        Ojo sano: sin enrojecimiento ni inflamación.
                    </div>
                </Html>
            )}

            {/* Mensaje para ojo infectado */}
            {infectedMessage && (
                <Html position={[1.5, -1, 0]} center distanceFactor={6}>
                    <div className="mensaje-info mensaje-infectado">
                        Síntomas de conjuntivitis: enrojecimiento, inflamación, secreción purulenta.
                    </div>
                </Html>
            )}

            <Floor />
            <Staging />
        </>
    );
};

const SectionTwoC = () => {
    return (
        <div className="section2-container">
            <div className="presentation-container-2">
                <h2>Conoce los síntomas de la conjuntivitis</h2>
                <p>Dale click a cada ojo para conocer la información, y sumérgete en el aprendizaje</p>
            </div>
            <div className="model-container-s">
                <KeyboardControls
                    map={[
                        { name: 'reset', keys: ['r', 'R'] },
                    ]}
                >
                    <Canvas camera={{ position: [0, 0.3, 2.5], fov: 70 }} shadows={true}>
                        <ambientLight intensity={0.5} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={3}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                        <OrbitControls enablePan={false} maxDistance={4} minDistance={1.5} />
                        <Scene />
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionTwoC;
