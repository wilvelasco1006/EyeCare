/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, KeyboardControls, useKeyboardControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import OjoSano from "../../model-3d/ojoSano";
import EyeGlaucomaModel from "../../model-3d/EyeGlaucomaModel";
import Floor from "../../model-3d/Floor";
import Staging from "../../../staging/Staging";
import "./SectionTwoG.css";

// Componente para el mensaje flotante de tecla R
const FloatingKeyHint = ({ show }) => {
    if (!show) return null;
    
    return (
        <div className="floating-key-hint">
            Presiona la tecla <span className="key-highligh">R</span> para volver atrás
        </div>
    );
};

const Scene = ({ setShowKeyHint }) => {
    const OjoSanoRef = useRef();
    const EyeGlaucomaRef = useRef();
    const { camera } = useThree();

    const initialCameraPos = new THREE.Vector3(0, 0.3, 2.5);

    const [healthyMessage, setHealthyMessage] = useState(false);
    const [target, setTarget] = useState(null);
    const [cameraLocked, setCameraLocked] = useState(false);
    const [currentSymptomIndex, setCurrentSymptomIndex] = useState(null);

    // Para animación suave
    const [eyeTargetRotation, setEyeTargetRotation] = useState(0);

    const symptoms = [
        "Pérdida de visión periférica.",
        "Dolor ocular intenso.",
        "Enrojecimiento del ojo.",
        "Visión borrosa o halos alrededor de las luces.",
        "Náuseas y vómitos (en casos graves)."
    ];

    // Detectar teclas presionadas
    const [subscribeKeys] = useKeyboardControls();

    // Movimiento de cámara y rotación de modelos
    useFrame(() => {
        if (target && cameraLocked) {
            camera.position.lerp(target, 0.05); // Mueve la cámara hacia el objetivo
            camera.lookAt(0, 0, 0); // Asegura que la cámara mire al centro
        }
        // Animación suave del ojo infectado
        if (EyeGlaucomaRef.current) {
            EyeGlaucomaRef.current.rotation.y += (eyeTargetRotation - EyeGlaucomaRef.current.rotation.y) * 0.1;
        }
    });

    // Cuando cambia el síntoma, anima el ojo
    useEffect(() => {
        if (currentSymptomIndex !== null) {
            setEyeTargetRotation(0.5); // Gira suavemente a la derecha
            const timeout = setTimeout(() => {
                setEyeTargetRotation(0); // Regresa suavemente al centro
            }, 600); // Duración de la animación (ms)
            return () => clearTimeout(timeout);
        }
    }, [currentSymptomIndex]);

    // Reiniciar la vista cuando se presione la tecla R
    useEffect(() => {
        const unsubscribe = subscribeKeys((state) => {
            if (state.reset) {
                resetView();
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeKeys]);

    const resetView = () => {
        setTarget(initialCameraPos.clone());
        setHealthyMessage(false);
        setCurrentSymptomIndex(null); // Oculta el síntoma del ojo infectado
        setCameraLocked(false);
        setShowKeyHint(false);

        // Resetear rotación de los ojos
        if (OjoSanoRef.current) OjoSanoRef.current.rotation.set(0, 0, 0);
        if (EyeGlaucomaRef.current) EyeGlaucomaRef.current.rotation.set(0, 0, 0);
    };

    const handleHealthyClick = () => {
        const targetPos = OjoSanoRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(true);
        setCurrentSymptomIndex(null); // Oculta el síntoma del ojo infectado
        setTarget(targetPos);
        setCameraLocked(true); // Bloquea la cámara
        setShowKeyHint(true);
    };

    const handleInfectedClick = () => {
        const targetPos = EyeGlaucomaRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2));
        setHealthyMessage(false); // Oculta el mensaje del ojo sano
        setCurrentSymptomIndex((prevIndex) => (prevIndex + 1) % symptoms.length); // Muestra el siguiente síntoma
        setTarget(targetPos);
        setCameraLocked(true); // Bloquea la cámara
        setShowKeyHint(true);
    };

    return (
        <>
            {/* Ojo sano */}
            <group
                ref={OjoSanoRef}
                position={[-0.6, 0, 1]}
                onClick={handleHealthyClick}
            >
                <OjoSano ref={OjoSanoRef} scale={[30, 30, 30]} />
            </group>

            {/* Ojo infectado */}
            <group
                ref={EyeGlaucomaRef}
                position={[0.6, 0, 1]}
                onClick={handleInfectedClick}
            >
                <EyeGlaucomaModel ref={EyeGlaucomaRef} scale={[30, 30, 30]} />
            </group>

            <Html occlude position={[0, 2, -3]} transform center distanceFactor={5} wrapperClass="title">
                <h1>Síntomas del Glaucoma</h1>
            </Html>

            {/* Mensaje para ojo sano */}
            {healthyMessage && (
                <Html position={[-1.5, -1, 0]} center distanceFactor={6}>
                    <div className="mensaje-info mensaje-sano">
                        Ojo sano: sin inflamación ni enrojecimiento.
                    </div>
                </Html>
            )}

            {/* Mensaje para ojo infectado */}
            {currentSymptomIndex !== null && (
                <Html position={[1.5, -1, 0]} center distanceFactor={6}>
                    <div className="mensaje-info mensaje-infectado">
                        {symptoms[currentSymptomIndex]}
                    </div>
                </Html>
            )}

            <Floor />
            <Staging />
        </>
    );
};

const SectionTwoG = () => {
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
                <h2>Conoce los síntomas del glaucoma</h2>
                <p>Dale click a cada ojo para conocer la información, y sumérgete en el aprendizaje</p>
            </div>
            <div className="model-container-s">
                <KeyboardControls
                    map={[
                        { name: 'reset', keys: ['r', 'R'] },
                    ]}
                >
                    <Canvas camera={{ position: [0.9, 0.3, 2], fov: 70 }} shadows={true}>
                        <ambientLight intensity={0.5} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={3}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                        <OrbitControls enablePan={false} maxDistance={4} minDistance={1.5} />
                        <Scene setShowKeyHint={setShowKeyHint} 
                        />
                        
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionTwoG;