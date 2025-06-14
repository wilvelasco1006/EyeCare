/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, KeyboardControls, useKeyboardControls, Text3D } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import InfectedEye from "../../model-3d/EyeInfected";
import EyeHealthModel from "../../model-3d/EyeHealthModel";
import Floor from "../../model-3d/Floor";
import Staging from "../../../staging/Staging";
import "./SectionTwoC.css";

// Componente para el mensaje flotante de tecla R
const FloatingKeyHint = ({ show }) => {
    if (!show) return null;

    return (
        <div className="floating-key-hint">
            Presiona la tecla <span className="key-highlight">R</span> para volver atrás
        </div>
    );
};

const Scene = ({ setShowKeyHint }) => {
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
        setShowKeyHint(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeKeys]);

    const handleHealthyClick = () => {
        const targetPos = healthyEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(true);
        setInfectedMessage(false);
        setRotateHealthy(true);
        setRotateInfected(false);
        setTarget(targetPos);
        setCameraLocked(true);
        setShowKeyHint(true); // Mostramos el mensaje flotante al hacer clic en el ojo sano
    };


    const handleInfectedClick = () => {
        const targetPos = infectedEyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(false);
        setInfectedMessage(true);
        setRotateHealthy(false);
        setRotateInfected(true);
        setTarget(targetPos);
        setCameraLocked(true);
        setShowKeyHint(true); // Mostramos el mensaje flotante al hacer clic en el ojo infectado
    };

    return (
        <>
            {/* Ojo sano */}
            <group ref={healthyEyeRef} position={[-0.9, 0, 1.2]} rotation={[0, Math.PI, 0]} onClick={handleHealthyClick}
            >
                <EyeHealthModel ref={healthyModelRef} scale={[0.5, 0.5, 0.5]} />
            </group>

            {/* Ojo infectado */}
            <group ref={infectedEyeRef} position={[0.6, 0, 1]} onClick={handleInfectedClick}>
                <InfectedEye ref={infectedModelRef} scale={[0.5, 0.5, 0.5]} />
            </group>

            <Text3D
                castShadow
                position={[-1.9, 1.4, -1.1]}
                rotation={[0, 0, 0]}
                font="/fonts/Mofulina_Regular.json"
                size={0.4}
            >
                {`SINTOMAS DE LA\n  CONJUNTIVITIS`}
                <meshStandardMaterial color="#1034A6" />
            </Text3D>




            {/* Mensaje para ojo sano */}
            {healthyMessage && (
                <Html scale={0.5} position={[-2.3, 0.2, 0]} center distanceFactor={6}>
                    <div className="mensaje-inf">
                        Ojo sano: sin enrojecimiento ni inflamación.
                    </div>
                </Html>
            )}

            {/* Mensaje para ojo infectado */}
            {infectedMessage && (
                <Html scale={0.5} position={[2.4, 0.2, 0.2]} center distanceFactor={5}>
                    <div className="mensaje-inf">
                        <ul>
                            <li>Enrojecimiento del ojo</li>
                            <li>Inflamación del párpado</li>
                            <li>Secreción purulenta o acuosa</li>
                            <li>Picazón o ardor</li>
                            <li>Sensación de cuerpo extraño</li>
                            <li>Lagrimeo excesivo</li>
                            <li>Sensibilidad a la luz</li>
                        </ul>
                    </div>
                </Html>
            )}

            <Floor />
            <Staging />
        </>
    );
};

const SectionTwoC = () => {
    const [showKeyHint, setShowKeyHint] = useState(false);

    // Configurar temporizador para ocultar el mensaje después de 8 segundos cuando cambie a true
    useEffect(() => {
        let timer;
        if (showKeyHint) {
            timer = setTimeout(() => {
                setShowKeyHint(false);
            }, 8000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [showKeyHint]);

    return (
        <div className="section2-container">
            {/* Mensaje flotante para la tecla R */}
            <FloatingKeyHint show={showKeyHint} />

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
                        <Scene setShowKeyHint={setShowKeyHint} />
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionTwoC;