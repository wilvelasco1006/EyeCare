import { Canvas } from "@react-three/fiber";
import "./SectionThreeCT.css";
import VideoCataracts from "../../../Videos/TreatmentCataracts";
import { OrbitControls, Text, Html, Sky, Text3D, useFont } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef } from "react";

import Floor from "./../../Model-3d/Floor";
import {SurgicalToolSet} from "../../Model-3d/SurgicalToolSet";

const SectionThreeCT = () => {
    // Carga la fuente para Text3D
    const font = useFont(undefined);
    const videoRef = useRef(null);// Referencia al video
    const [showAnimation, setShowAnimation] = useState(false); // Estado para mostrar/ocultar la animación
    
    const handlePlay = () => videoRef.current?.play(); // Función para reproducir el video
    const handlePause = () => videoRef.current?.pause();// Función para pausar el video
    // Función para alternar el estado de silencio del video
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };

    return (
        <div className="container-section3-CT">
            <div className="treatment-CT">
                <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={0.8} />
                    <Sky />
                    <Floor />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        maxDistance={10}
                        minDistance={3}
                    />

                    {/* Herramientas quirúrgicas */}
                    <SurgicalToolSet scale={3.5} />
                    {/* Modelo 3D de Sketchfab */}
                    
                    {/* Sección de video (lado izquierdo) */}
                    <group position={[-4, 0.4, -2]} scale={0.6} rotation={[0, 0.3, 0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="#2c3e50">
                            VIDEO INFORMATIVO
                        </Text>

                        <VideoCataracts videoRef={videoRef} />

                        <Html transform scale={0.4} position={[0, -1.5, 0]} center>
                            <div className="video-controls-CT">
                                <button onClick={handlePlay} title="Reproducir">
                                    <FaPlay />
                                </button>
                                <button onClick={handlePause} title="Pausar">
                                    <CiPause1 />
                                </button>
                                <button onClick={handleToggleMute} title="Mutear">
                                    <AiFillMuted />
                                </button>
                            </div>
                        </Html>
                    </group>

                    {/* Sección de animación Sketchfab (lado derecho) */}
                    <group position={[4, 0.2, -2]} scale={0.6} rotation={[0, -0.3, 0]}>
                        <Text position={[0, 3, 0]} fontSize={0.4} color="#e74c3c">
                            ANIMACIÓN 3D INTERACTIVA
                        </Text>

                        {!showAnimation ? (
                            // Botón para mostrar animación
                            <Html transform scale={0.5} position={[0, 0, 0]} center>
                                <div className="animation-preview">
                                    <div className="preview-content">
                                        <h3>Cirugía de Cataratas</h3>
                                        <p>Visualización 3D del procedimiento quirúrgico</p>
                                        <button
                                            className="show-animation-btn"
                                            onClick={() => setShowAnimation(true)}
                                        >
                                            Ver Animación
                                        </button>
                                    </div>
                                </div>
                            </Html>
                        ) : (
                            // Iframe de Sketchfab
                            <Html
                                transform
                                scale={0.6}
                                position={[1.5, -0.5,  0]}
                                center
                                style={{ width: '600px', height: '400px' }}
                            >
                                <div className="sketchfab-container-3d">
                                    <div className="sketchfab-header">
                                        <button
                                            className="close-animation-btn"
                                            onClick={() => setShowAnimation(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="sketchfab-embed-wrapper-3d">
                                        <iframe
                                            title="Cataract Surgery Animation"
                                            frameBorder="0"
                                            allowFullScreen
                                            mozallowfullscreen="true"
                                            webkitallowfullscreen="true"
                                            allow="autoplay; fullscreen; xr-spatial-tracking"
                                            src="https://sketchfab.com/models/375ec3c07a0f42108da9334b6f9c1f85/embed?autostart=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_stop=1&ui_watermark=0"
                                        />
                                    </div>

                                    <div className="sketchfab-attribution-3d">
                                        <small>
                                            Animación por <strong>Holoxica</strong> en Sketchfab
                                        </small>
                                    </div>
                                </div>
                            </Html>
                        )}
                    </group>

                    {/* Título principal */}
                    <group position={[0, 4, -1]}>
                        {font ? (
                            <Text
                                //font={font}
                                position={[0, -0.9, 0]}
                                fontSize={0.6}
                                color="#2c3e50"
                                anchorX="center"
                                anchorY="middle"
                            >
                                TRATAMIENTO DE CATARATAS
                            </Text>
                        ) : (
                            <Text
                                position={[0, 0, 0]}
                                fontSize={0.6}
                                color="#2c3e50"
                                anchorX="center"
                                anchorY="middle"
                            >
                                TRATAMIENTO DE CATARATAS
                            </Text>
                        )}
                    </group>

                    {/* Información adicional flotante */}
                    <group position={[0, -2, 0]}>
                        <Html transform scale={0.4} position={[0, 0, 0]} center>
                            <div className="info-panel-3d">
                                <div className="info-item">
                                    <h4>Técnica Principal</h4>
                                    <p>Facoemulsificación con implante de lente intraocular</p>
                                </div>
                                <div className="info-item">
                                    <h4>Duración</h4>
                                    <p>15-30 minutos por ojo</p>
                                </div>
                                <div className="info-item">
                                    <h4>Recuperación</h4>
                                    <p>Ambulatoria, visión mejorada en 24-48 horas</p>
                                </div>
                            </div>
                        </Html>
                    </group>
                </Canvas>

            </div>
            
        </div>
    );
};

export default SectionThreeCT;
