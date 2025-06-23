/* eslint-disable react/no-unknown-property */
import "./sectionFourG.css";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Text, Float, Stars } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { BiReset } from "react-icons/bi";

import VideoPrevencionG from "../../model-3d/videoPrevencionG";
import Floor from "../../model-3d/Floor";
import BlinkingCircleG from "../../model-3d/BlinkingCircleG";
import Card3DG from "../../model-3d/Card3DG";

// Partículas flotantes para ambiente (NUEVA MEJORA)
const FloatingParticles = () => {
    const particlesRef = useRef();
    const particleCount = 30;
    
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }
    
    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001;
            const time = state.clock.elapsedTime;
            const positions = particlesRef.current.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + i) * 0.001;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });
    
    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#4FC3F7" transparent opacity={0.4} />
        </points>
    );
};

// Componente que aplica zoom a la cámara de forma suave (TU CÓDIGO ORIGINAL)
const CameraZoom = ({ show }) => {
    useFrame(({ camera }) => {
        const targetZ = show ? 3.5 : 5; // Zoom si hay cartas
        camera.position.z += (targetZ - camera.position.z) * 0.05;
    });
    return null;
};

// Wrapper mejorado para tu BlinkingCircle existente
const EnhancedBlinkingCircleGWrapper = ({ onClick }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <BlinkingCircleG onClick={onClick} />
        </Float>
    );
};

// Wrapper mejorado para tus Card3D existentes
const EnhancedCard3DGWrapper = ({ title, content, position, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);
    
    if (!isVisible) return null;
    
    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <Card3DG title={title} content={content} position={position} />
        </Float>
    );
};

// Wrapper mejorado para tu grupo de video existente
const EnhancedVideoGroup = ({ videoRef, handlePlay, handlePause, handleToggleMute }) => {
    const groupRef = useRef();
    
    useFrame((state) => {
        if (groupRef.current) {
            // Animación sutil de flotación para todo el grupo
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });
    
    return (
        <group ref={groupRef} position={[1.2, 0, 1]} scale={0.7} rotation={[0, -0.7, 0]}>
            <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    position={[0, 3, 0]}
                    fontSize={0.4}
                    color="#4FC3F7"
                    font="/fonts/Mofulina.ttf"
                >
                    🎬 Dale Play y Entérate
                </Text>
            </Float>

            {/* Tu componente VideoPrevencionC original */}
            <VideoPrevencionG videoRef={videoRef} />

            <Html transform scale={0.5} position={[0, -1.2, 0]} center>
                <div className="video-controlsG enhanced">
                    <button onClick={handlePlay} title="Reproducir" className="control-btnG play-btn">
                        <FaPlay />
                    </button>
                    <button onClick={handlePause} title="Pausar" className="control-btnG pause-btn">
                        <CiPause1 />
                    </button>
                    <button onClick={handleToggleMute} title="Mutear" className="control-btnG mute-btn">
                        <AiFillMuted />
                    </button>
                </div>
            </Html>
        </group>
    );
};

const SectionFourG = () => {
    const videoRef = useRef(null);
    const [showCards, setShowCards] = useState(false);

    const handlePlay = () => videoRef.current?.play();
    const handlePause = () => videoRef.current?.pause();
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };
    const handleReset = () => {
        setShowCards(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }
    };

    // Evento de teclado: presionar "R" para ocultar las tarjetas (TU CÓDIGO ORIGINAL)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "r" || e.key === "R") {
                setShowCards(false);
            }
            // NUEVA MEJORA: Espacio para play/pause
            if (e.key === " ") {
                e.preventDefault();
                videoRef.current?.paused ? handlePlay() : handlePause();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="sectionFourContainerG enhanced">
            {/* Tu header original mejorado */}
            <div className="header-contentG">
                <h2>💧 Prevención</h2>
                <p>Conoce algunas maneras de prevenir el glaucoma</p>
                
                {/* NUEVA MEJORA: Controles flotantes */}
                <div className="floating-controlsG">
                    <button onClick={handleReset} title="Reiniciar escena" className="floating-btn">
                        <BiReset />
                    </button>
                </div>
            </div>

            <div className="container__canvaG enhanced">
                <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
                    {/* Fondo estrellado (NUEVA MEJORA) */}
                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} />
                    
                    {/* Partículas flotantes (NUEVA MEJORA) */}
                    <FloatingParticles />
                    
                    {/* Tu iluminación original mejorada */}
                    <ambientLight intensity={0.3} />
                    <directionalLight intensity={5} position={[5, 5, 5]} />
                    <pointLight position={[-5, 5, 5]} intensity={0.5} color="#4FC3F7" />
                    <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.3} />
                    
                    <OrbitControls 
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        maxDistance={8}
                        minDistance={2}
                    />
                    <CameraZoom show={showCards} />
                    
                    {/* Tu componente Floor original */}
                    <Floor />

                    {/* Tu grupo de video mejorado */}
                    <EnhancedVideoGroup 
                        videoRef={videoRef}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                        handleToggleMute={handleToggleMute}
                    />

                    {/* Tu círculo interactivo mejorado */}
                    <EnhancedBlinkingCircleGWrapper onClick={() => setShowCards(true)} />

                    {/* Tus cards informativas 3D mejoradas */}
                    {showCards && (
                        <>
                            <EnhancedCard3DGWrapper
                                title="Hazte exámenes visuales"
                                content="Detectar el glaucoma a tiempo puede prevenir la pérdida de visión"
                                position={[-2.5, 1, -1.5]}
                                delay={0}
                            />

                            <EnhancedCard3DGWrapper
                                title="Sigue tu tratamiento"
                                content="Usa los medicamentos según indicaciones médicas"
                                position={[0, 1, -1.5]}
                                delay={0.3}
                            />

                            <EnhancedCard3DGWrapper
                                title="Conoce tus factores de riesgo"
                                content="Edad, antecedentes familiares y presión ocular alta"
                                position={[2.5, 1, -1.5]}
                                delay={0.6}
                            />
                        </>
                    )}
                </Canvas>
            </div>

            {/* NUEVA MEJORA: Instrucciones de uso */}
            <div className="usage-instructions">
                <p>🎮 Arrastra para rotar • 🔍 Scroll para zoom • ⌨️ R para ocultar cards • Espacio para play/pause</p>
            </div>
        </div>
    );
};

export default SectionFourG;