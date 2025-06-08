/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./SectionThree.css";
import VideoConjuntivitis from "../../../Videos/TratamientoConjuntivitis";
import { OrbitControls, Text, Html, Sky, Text3D, Cloud } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import * as THREE from 'three';
import Floor from "../../model-3d/Floor";
import {CajaMedicamento} from "../../model-3d/dropperMedicine";
import BurbujaIndicadora from "./recursos/burbujaIndicadora";
import AnimatedFaceEye from "./recursos/AnimatedFaceEye";
import AnimatedDropper from "./recursos/AnimatedDropper";

const CameraController = ({ showMedicineInfo, focusOnVideo, orbitControlsRef, resetCamera }) => {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);
    const startPosition = useRef(new THREE.Vector3());
    const targetPosition = useRef(new THREE.Vector3());
    const startTarget = useRef(new THREE.Vector3());
    const targetTarget = useRef(new THREE.Vector3());
    const startTime = useRef(0);
    const animationDuration = 2; // 2 segundos para la animación

    useEffect(() => {
        if (showMedicineInfo) {
            
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(0, 0, 0));

            
            targetPosition.current.set(-1.5, 1.5, 2); 
            targetTarget.current.set(-2.5, 0, 0.5); 

            // Deshabilitar controles
            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = false;
            }
        } else if (focusOnVideo) {
            // Enfocar en el video
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(0, 0, 0));

            targetPosition.current.set(2.9,0,2.5); // Posición cerca del video
            targetTarget.current.set(2.5, 0.4, -2); // Mirar hacia el video

            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = false;
            }
        } else if (resetCamera) {
            // Volver a posición original
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(0, 0, 0));

            targetPosition.current.set(0, 0, 5); 
            targetTarget.current.set(0, 0, 0); 
        } else {
            return; 
        }

        setIsAnimating(true);
        startTime.current = Date.now();
    }, [showMedicineInfo, focusOnVideo, resetCamera, camera, orbitControlsRef]);

    useFrame(() => {
        if (isAnimating) {
            const elapsed = (Date.now() - startTime.current) / 1000;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Easing suave (ease-in-out)
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Interpolar posición de cámara
            camera.position.lerpVectors(startPosition.current, targetPosition.current, easeProgress);

            // Interpolar hacia dónde mira la cámara
            const currentLookAt = new THREE.Vector3();
            currentLookAt.lerpVectors(startTarget.current, targetTarget.current, easeProgress);
            camera.lookAt(currentLookAt);

            if (progress >= 1) {
                setIsAnimating(false);
                // Reactivar controles
                if (orbitControlsRef.current) {
                    orbitControlsRef.current.enabled = true;
                    orbitControlsRef.current.target.copy(targetTarget.current);
                    orbitControlsRef.current.update();
                }
            }
        }
    });

    return null;
};

// Componente para hacer girar la caja de medicina cuando está enfocada
const RotatingMedicine = ({ showMedicineInfo, ...props }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current && showMedicineInfo) {
            // Rotación continua en Y cuando está enfocada
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <CajaMedicamento
            ref={meshRef}
            {...props}
        />
    );
};

const FloatingKeyHint = ({ show }) => {
    if (!show) return null;

    return (
        <div className="floating-key-hint">
            Presiona la tecla <span className="key-highlight">R</span> para volver atrás
        </div>
    );
};

const SectionThree = () => {
    const videoRef = useRef(null);
    const orbitControlsRef = useRef(null);
    const [showMedicineInfo, setShowMedicineInfo] = useState(false);
    const [showInfoTratamiento, setShowInfoTratamiento] = useState(false);
    const [showBurbuja, setShowBurbuja] = useState(true);
    const [focusOnVideo, setFocusOnVideo] = useState(false);
    const [resetCamera, setResetCamera] = useState(false);
    const [showHelpInfo, setShowHelpInfo] = useState(false);

    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };
    const [lookUp, setLookUp] = useState(false);

    const handleLookUp = () => {
        setLookUp(!lookUp);
        setShowBurbuja(!showBurbuja);
        setShowInfoTratamiento(!showInfoTratamiento);
    };

    const handleInfoMedicine = () => {
        setShowMedicineInfo(!showMedicineInfo);
        setShowBurbuja(!showBurbuja);
    };

    // Función para reiniciar todo a la posición inicial
    const resetToInitial = () => {
        setShowMedicineInfo(false);
        setShowInfoTratamiento(false);
        setShowBurbuja(true);
        setFocusOnVideo(false);
        setShowHelpInfo(false);
        setLookUp(false);
        setResetCamera(true);
        
        // Reset del estado de resetCamera después de un breve delay
        setTimeout(() => setResetCamera(false), 100);
    };

    // Función para enfocar en el video
    const focusVideo = () => {
        setShowMedicineInfo(false);
        setShowInfoTratamiento(false);
        setShowBurbuja(false);
        setShowHelpInfo(false);
        setFocusOnVideo(true);
        
        // Reset del estado de focusOnVideo después de la animación
        setTimeout(() => setFocusOnVideo(false), 2100);
    };

    // Función para mostrar/ocultar información de ayuda
    const toggleHelpInfo = () => {
        setShowHelpInfo(!showHelpInfo);
    };

    // Event listeners para teclado
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();
            
            switch (key) {
                case 'r':
                    resetToInitial();
                    break;
                case 'v':
                    focusVideo();
                    break;
                case 'h':
                    toggleHelpInfo();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [showHelpInfo]);

    const InfoTratamiento = () => {
        if (!showInfoTratamiento) return null;

        return (
            <Html position={[0.8, 2, 0]}>
                <div className="container_box tratamiento">
                    <h2 className="title_box">
                        Dosis de Ciprofloxacina Gotas Oftálmicas
                    </h2>
                    <p className="info_box">
                        <ul>
                            <li>Días 1 y 2: Instilar 1 a 2 gotas en el ojo afectado cada 2 horas durante las horas de vigilia.</li>
                            <li>Días 3 al 7: Instilar 1 a 2 gotas cada 4 horas durante las horas de vigilia.</li>
                            <li>Duración total del tratamiento: Generalmente 7 días, o 48 horas después de la desaparición de los síntomas</li>
                        </ul>
                    </p>
                </div>
            </Html>
        )
    };

    const MedicineInfoBox = () => {
        if (!showMedicineInfo) return null;

        return (
            <Html position={[-2.5, 0.8, 1.5]} center>
                <div className="container_box">
                    <h2 className="title_box">
                        Ciprofloxacina en contra de la conjuntivitis
                    </h2>
                    <p className="info_box">
                        La solución de ciprofloxacina oftálmica se usa para tratar infecciones bacterianas del ojo, que incluyen conjuntivitis (infección de la membrana que cubre el exterior del globo ocular y el interior del párpado) y úlceras en la córnea (infección y pérdida de tejido en la parte delantera transparente del ojo).
                    </p>
                </div>
            </Html>
        );
    };

    const HelpInfoBox = () => {
        if (!showHelpInfo) return null;

        return (
            <Html position={[0, 1, 0]} center>
                <div className="container_box" >
                    
                    <h2 className="title_box" style={{ color: 'white', marginBottom: '15px' }}>
                        Controles de Teclado
                    </h2>
                    <div className="info_box">
                        <p><strong>R:</strong> Reiniciar todo a la posición inicial</p>
                        <p><strong>V:</strong> Enfocar cámara hacia el video</p>
                        <p><strong>H:</strong> Mostrar/ocultar esta ayuda</p>
                        <br />
                        <p style={{ fontSize: '12px', opacity: '0.8' }}>
                            También puedes hacer clic en los elementos de la escena marcados con el inidicador purpura para interactuar con ellos.
                        </p>
                    </div>
                </div>
            </Html>
        );
    };

    return (
        <div className="content-container">
            {/* Hint flotante que aparece cuando hay alguna interacción activa */}
            <FloatingKeyHint show={showMedicineInfo || showInfoTratamiento || focusOnVideo || showHelpInfo} />
            
            <div className="Container-tratamiento">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows={true}>
                    <ambientLight intensity={1} />

                    <directionalLight
                        position={[3, 5, 2]}
                        intensity={0.8}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    <spotLight
                        position={[1, 3, 1.6]}
                        angle={0.5}
                        penumbra={0.4}
                        intensity={2.5}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                    />

                    <Sky
                        distance={450000}
                        sunPosition={[0, 1, -15]}
                        inclination={0.49}
                        azimuth={0.15}
                        mieCoefficient={0.005}
                        mieDirectionalG={0.8}
                        rayleigh={6}
                        turbidity={10}
                    />

                    <Cloud
                        position={[-15, 8, -25]}
                        speed={0.1}
                        opacity={0.4}
                        segments={40}
                        bounds={[8, 3, 8]}
                        volume={6}
                        color="#ffeecc"
                    />
                    <Floor />

                    <OrbitControls ref={orbitControlsRef} enableZoom={false} />

                    <CameraController
                        showMedicineInfo={showMedicineInfo}
                        focusOnVideo={focusOnVideo}
                        resetCamera={resetCamera}
                        orbitControlsRef={orbitControlsRef}
                    />

                    <RotatingMedicine
                        onClick={handleInfoMedicine}
                        position={[-2.5, -0.1, 0.5]}
                        rotation={[0, -0.3, 0]}
                        showMedicineInfo={showMedicineInfo}
                    />

                    <Text3D
                        position={[-5, 3, -3]}
                        rotation={[0, 0.3, 0]}
                        font="/fonts/Mofulina_Regular.json"
                        size={0.5}
                    >
                        {`TRATAMIENTO DE\nLA CONJUNTIVITIS`}
                        <meshStandardMaterial color="#1034A6" />
                    </Text3D>

                    <AnimatedFaceEye lookUp={lookUp} onClick={handleLookUp} />
                    <AnimatedDropper lookUp={lookUp} />

                    <group position={[2.5, 0.4, -2]} scale={0.7} rotation={[0, 0, 0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="black" font="/fonts/Mofulina.ttf">
                            Dale Play y Enterate
                        </Text>

                        <VideoConjuntivitis videoRef={videoRef} />

                        <Html transform scale={0.5} position={[0, -1.2, 0]} center>
                            <div className="video-controls">
                                <button onClick={handlePlay} title="Reproducir"><FaPlay /></button>
                                <button onClick={handlePause} title="Pausar"><CiPause1 /></button>
                                <button onClick={handleToggleMute} title="Mutear"><AiFillMuted /></button>
                            </div>
                        </Html>
                    </group>

                    {showBurbuja && (
                        <>
                            <BurbujaIndicadora position={[-1.9, 0, 0.6]} />
                            <BurbujaIndicadora position={[-0.3, 0, -0.9]} />
                        </>
                    )}

                    <MedicineInfoBox />
                    <InfoTratamiento />
                    <HelpInfoBox />

                </Canvas>
            </div>
            <div className="mensaje-controls">
                <p>Presiona la tecla H para Ayudarte</p>
            </div>
        </div>
    );
};

export default SectionThree;