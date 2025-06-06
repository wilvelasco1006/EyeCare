/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Canvas } from "@react-three/fiber";
import "./sectionThreeM.css";
import VideoMacular from "../../../Videos/TreatmentMacular";
import { OrbitControls, Text, Html, Sky, Text3D, Stars } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef, Suspense } from "react";
import Lights from "./../../lights/Lights";

import Floor from "./../../models-3d/Floor";
import { TreatmentModel } from "../../models-3d/TreatmentModel";


import tooltips from "/src/microcopy/Tooltips.js";


const SectionThreeM = () => {
    // const [showHint, setShowHint] = useState(true);
    const videoRef = useRef(null);// Referencia al video
    const [showAnimation, setShowAnimation] = useState(false); // Estado para mostrar/ocultar la animación
    const handlePlay = () => videoRef.current?.play(); // Función para reproducir el video
    const handlePause = () => videoRef.current?.pause();// Función para pausar el video
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };


    return (
        <div className="container-section3-M">
            <div className="treatment-M">
                <Canvas camera={{ position: [0, 3, 8], fov: 50 }} shadows={true}>
                    <Lights />
                    <Sky />
                    <Stars
                        radius={100} // Radio de la esfera de estrellas
                        depth={50} // Profundidad del campo de estrellas
                        count={5000} // Número de estrellas
                        factor={6} // Tamaño de las estrellas
                        saturation={0} // Saturación del color (0 = blanco)
                        fade={true} // Las estrellas se desvanecen al acercarse
                    />
                    <Floor />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        maxDistance={10}
                        minDistance={3}
                    />
                    <TreatmentModel 
                    scale={6.5} 
                    position={[2.5, 0, -2]}
                    />
                    {/* Modelo 3D de Sketchfab */}

                    {/* Sección de video (lado izquierdo) */}
                    <group position={[-2.5, 0.4, -2]} scale={0.6} rotation={[0, 0.3, 0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="#2c3e50">
                            VIDEO INFORMATIVO
                        </Text>

                        <VideoMacular videoRef={videoRef} />

                        <Html transform scale={0.4} position={[0, -1.5, 0]} center>
                            <div className="video-controls-M">
                                <button onClick={handlePlay} title={tooltips.videoControls.play}>
                                <FaPlay />
                                </button>
                                <button onClick={handlePause} title={tooltips.videoControls.pause}>
                                <CiPause1 />
                                </button>
                                <button onClick={handleToggleMute} title={tooltips.videoControls.mute}>
                                <AiFillMuted />
                                </button>
                            </div>
                            </Html>
                    </group>

                    {/* Título principal */}
                    <group position={[-1, 3.5, -3]}>
                        <Text3D
                            font="/fonts/B20_Sans.json"
                            position={[-4.5, -0.9, 0]}
                            size={0.4}
                            height={0.1}
                            curveSegments={12}
                            bevelEnabled={true}
                            bevelThickness={0.02}
                            bevelSize={0.02}
                            bevelOffset={0}
                            bevelSegments={5}
                            castShadow 
                            receiveShadow
                            transform={false}
                        >
                            TRATAMIENTO PARA LA DEGENERACIÓN MACULAR
                            <meshStandardMaterial
                                color="#52a1c0"
                                metalness={0.1}
                                roughness={0.8}
                            />
                        </Text3D>
                    </group>

                    {/* Información adicional flotante */}
                    <group position={[0, -2, 0]}>
                        <Html transform scale={0.3} position={[0, 1, 0]} center>
                            <div className="info-panel-3d-M">
                                <div className="info-item-M">
                                    <h4>Medicamentos</h4>
                                    <p> Algunos ejemplos de estos medicamentos son Bevacizumab (Avastin), Ranibizumab (Lucentis), Fórmula AREDS2, etc. </p>
                                </div>
                                <div className="info-item-M">
                                    <h4>Métodos</h4>
                                    <p>Inyecciones intraoculares y suplementos en pastilla. 
                                        Estos ayudan a detener el crecimiento de vasos sanguíneos anormales en la retina
                                    </p>
                                </div>
                                <div className="info-item-M">
                                    <h4>Consulta primero</h4>
                                    <p>Es muy vital pasar con tu médico oftalmólogo antes de ingerir cualquier medicamento</p>
                                </div>
                            </div>
                        </Html>
                    </group>
                </Canvas>

            </div>
        </div>
    )
}

export default SectionThreeM