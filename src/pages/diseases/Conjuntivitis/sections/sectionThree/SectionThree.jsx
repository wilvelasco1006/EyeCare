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


const CameraController = ({ showMedicineInfo, orbitControlsRef }) => {
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
            // Posición inicial
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(0, 0, 0));

            // Posición objetivo: más cerca, más alto, mirando hacia la caja
            targetPosition.current.set(-1.5, 1.5, 2); // Frente y arriba
            targetTarget.current.set(-2.5, 0, 0.5); // Mirar hacia la caja

            // Deshabilitar controles
            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = false;
            }
        } else {
            // Volver a posición original
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(-2.5, 0, 0.5));

            targetPosition.current.set(0, 0, 5); // Posición original
            targetTarget.current.set(0, 0, 0); // Target original
        }

        setIsAnimating(true);
        startTime.current = Date.now();
    }, [showMedicineInfo, camera, orbitControlsRef]);

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

const SectionThree = () => {
    const videoRef = useRef(null);
    const orbitControlsRef = useRef(null);
    const [showMedicineInfo, setShowMedicineInfo] = useState(false);
    const [showInfoTratamiento, setShowInfoTratamiento] = useState(false);
    const [showBurbuja, setShowBurbuja] = useState(true);

    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };
    const [lookUp, setLookUp] = useState(false);

    const handleLookUp = () => {
        setLookUp(!lookUp);
        setShowBurbuja(!showBurbuja);
        setShowInfoTratamiento(!showInfoTratamiento); // Alterna entre mirar hacia arriba o estar normal
    };
    const handleInfoMedicine = () => {
        setShowMedicineInfo(!showMedicineInfo);
        setShowBurbuja(!showBurbuja);
    };
    const InfoTratamiento = () => {
        if (!showInfoTratamiento) return null;

        return (
            <Html
                position={[0.8, 2, 0]}
            >
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

    }

    const MedicineInfoBox = () => {
        if (!showMedicineInfo) return null;

        return (
            <Html
                position={[-2.5, 0.8, 1.5]} // Posición al lado de la caja
                center
            >
                <div
                    className="container_box"
                >
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

    return (
        <div className="content-container">
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
                        sunPosition={[0, 1, -15]}      // Sol más bajo para un atardecer más dramático
                        inclination={0.49}             // Justo en el horizonte para colores intensos
                        azimuth={0.15}                 // Posición del sol ligeramente hacia el este
                        mieCoefficient={0.005}         // Menos partículas para cielo más claro
                        mieDirectionalG={0.8}          // Luz más direccional para rayos de sol
                        rayleigh={6}                   // Intensidad alta para colores vibrantes (naranjas, rosas)
                        turbidity={10}                 // Atmósfera más densa para colores cálidos
                    />

                    {/* Múltiples nubes para más realismo */}
                    <Cloud
                        position={[-15, 8, -25]}
                        speed={0.1}
                        opacity={0.4}
                        segments={40}
                        bounds={[8, 3, 8]}             // Nubes más grandes y extendidas
                        volume={6}
                        color="#ffeecc"                // Tinte dorado suave
                    />
                    <Floor />

                    {/* OrbitControls con referencia */}
                    <OrbitControls ref={orbitControlsRef} enableZoom={false} />

                    {/* Controlador de cámara */}
                    <CameraController
                        showMedicineInfo={showMedicineInfo}
                        orbitControlsRef={orbitControlsRef}
                    />

                    {/* Caja de medicina con rotación */}
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

                    <group position={[2.5, 0.4, -2]} scale={0.7} rotation={[0, -0.5, 0]}>
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
                    )};


                    {/* Recuadro de información */}
                    <MedicineInfoBox />
                    <InfoTratamiento />

                </Canvas>
            </div>
        </div>
    );
};

export default SectionThree;