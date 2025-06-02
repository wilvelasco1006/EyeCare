import { Canvas } from "@react-three/fiber";
import "./sectionThreeCT.css";
import VideoCataracts from "../../../Videos/TreatmentCataracts";
import { OrbitControls, Text, Html, Sky, Text3D, Stars } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef, Suspense } from "react";

import Floor from "./../../Model-3d/Floor";
import { SurgicalToolSet } from "../../Model-3d/SurgicalToolSet";

const SectionThreeCT = () => {

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
                <Canvas camera={{ position: [0, 2, 8], fov: 50 }} shadows>
                    <ambientLight castShadow intensity={0.6} />
                    <directionalLight
                        position={[1, 1, 1]}
                        intensity={1.2}
                        castShadow={true}
                        shadow-mapSize={[2048, 2048]}
                    />
                    <hemisphereLight
                        skyColor="#87CEEB" // Azul cielo
                        groundColor="blue" // Azul para el suelo
                        intensity={0.3}
                    />
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
                        <Text position={[0, 3, 0]} fontSize={0.4} color="#2b67c0">
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
                                position={[1.5, -0.5, 0]}
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
                        <Text3D
                            font="/fonts/B20_Sans.json"
                            position={[-4.5, -0.9, 0]}
                            size={0.6}
                            height={0.1}
                            curveSegments={12}
                            bevelEnabled={true}
                            bevelThickness={0.02}
                            bevelSize={0.02}
                            bevelOffset={0}
                            bevelSegments={5}
                            castShadow
                            receiveShadow
                        >
                            TRATAMIENTO DE LAS CATARATAS
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
