/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./sectionThreeCT.css";
import VideoCataracts from "../../../Videos/TreatmentCataracts";
import { OrbitControls, Text, Html, Sky, Text3D, Stars } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci"
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from 'three';
import Floor from "./../../Model-3d/Floor";
import { SurgicalToolSet } from "../../Model-3d/SurgicalToolSet";
import { useSkyConfig } from '../../Cataracts';
// Componente BurbujaIndicadora mejorado con animación más atractiva
const BurbujaIndicadora = ({ position = [0, 1.5, 0], scale = 0.28, onClick, isActive = false }) => {
    const ref = useRef();
    const pulseRef = useRef();
    const glowRef = useRef();
    const color = new THREE.Color(isActive ? "#6A0DAD" : "#2c3e50"); // Color azul cian llamativo
    const glowColor = new THREE.Color(isActive ? "#FF4757" : "#3742fa");

    // Animación de pulso y rotación mejorada
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const scaleValue = scale + Math.sin(time * 4) * 0.08;
        const glowScale = scale * 1.5 + Math.sin(time * 2) * 0.15;
        
        if (ref.current) {
            ref.current.scale.set(scaleValue, scaleValue, scaleValue);
            ref.current.rotation.y += 0.02;
            ref.current.rotation.x = Math.sin(time * 2) * 0.1;
        }
        
        if (pulseRef.current) {
            const opacity = 0.4 + Math.sin(time * 3) * 0.3;
            pulseRef.current.material.opacity = opacity;
            pulseRef.current.scale.set(glowScale, glowScale, glowScale);
        }

        if (glowRef.current) {
            glowRef.current.material.opacity = 0.2 + Math.sin(time * 5) * 0.1;
            glowRef.current.rotation.y -= 0.01;
        }
    });

    return (
        <group position={position} onClick={onClick} style={{ cursor: 'pointer' }}>
            {/* Resplandor exterior */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[scale * 2, 16, 16]} />
                <meshBasicMaterial color={glowColor} transparent opacity={0.1} />
            </mesh>

            {/* Círculo externo pulsante */}
            <mesh ref={pulseRef}>
                <sphereGeometry args={[scale * 1.3, 20, 20]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>

            {/* Burbuja principal con efecto cristal */}
            <mesh ref={ref}>
                <sphereGeometry args={[scale, 32, 32]} />
                <meshPhysicalMaterial 
                    color="white"
                    emissive={color} 
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    roughness={0.2}
                />
            </mesh>

            {/* Icono o símbolo en el centro */}
            <mesh position={[0, 0, scale * 0.6]}>
                <planeGeometry args={[scale * 0.8, scale * 0.8]} />
                <meshBasicMaterial 
                    color={isActive ? "#FFE66D" : "#FFFFFF"} 
                    transparent 
                    opacity={0.9}
                />
            </mesh>
            
            {/* Texto flotante */}
            <Text
                position={[0.100, -0.8, 0]} // Posición del texto 
                fontSize={scale * 0.6}
                color={isActive ? "#FF6B6B" : "#6A0DAD"}
                anchorX="center"
                anchorY="middle"
            >
                {isActive ? "🎬 VOLVER" : "👁️ VER VIDEO"}
            </Text>
        </group>
    );
};

// Componente para controlar la cámara con transiciones más suaves
const CameraController = ({ isVideoFocused, setIsVideoFocused, orbitControlsRef }) => {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(false);
    const startPosition = useRef(new THREE.Vector3());
    const targetPosition = useRef(new THREE.Vector3());
    const startTarget = useRef(new THREE.Vector3());
    const targetTarget = useRef(new THREE.Vector3());
    const startTime = useRef(0);
    const animationDuration = 2.5; // Animación más lenta y suave

    useEffect(() => {
        if (isVideoFocused) {
            // Posición inicial
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(0, 0, 0));

            // Posición objetivo: más cerca del video y con mejor ángulo
            targetPosition.current.set(-2.5, 2.0, 3.0); // Posición mejorada
            targetTarget.current.set(-4, 1, -2); // Mirar hacia el video

            // Deshabilitar controles
            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = false;
            }
        } else {
            // Volver a posición original
            startPosition.current.copy(camera.position);
            startTarget.current.copy(orbitControlsRef.current?.target || new THREE.Vector3(-4, 0.4, -2));

            targetPosition.current.set(0, 2, 9); // Posición original
            targetTarget.current.set(0, 0, 0); // Target original
        }

        setIsAnimating(true);
        startTime.current = Date.now();
    }, [isVideoFocused, camera, orbitControlsRef]);

    useFrame(() => {
        if (isAnimating) {
            const elapsed = (Date.now() - startTime.current) / 1000;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Easing cúbico más suave
            const easeProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

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

const SectionThreeCT = () => {
    const { currentSkyConfig, activeSection } = useSkyConfig();
    const videoRef = useRef(null);// Referencia al video
    const orbitControlsRef = useRef(null); // Referencia a los controles de órbita
    const [showAnimation, setShowAnimation] = useState(false); // Estado para mostrar/ocultar la animación
    const [isVideoFocused, setIsVideoFocused] = useState(false); // Estado para controlar el enfoque del video

    const handlePlay = () => videoRef.current?.play(); // Función para reproducir el video
    const handlePause = () => videoRef.current?.pause();// Función para pausar el video
    // Función para alternar el estado de silencio del video
    const handleToggleMute = () => {
        if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    };
    const handleBubbleClick = () => {
        setIsVideoFocused(!isVideoFocused);
    };

    return (
        <div className="container-section3-CT">
            <div className="treatment-CT">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows 
                    gl={{
                        shadowMap: {
                            enabled: true,
                            type: THREE.PCFSoftShadowMap, // Sombras suaves
                            autoUpdate: true
                        },
                        antialias: true,
                        alpha: true
                    }}
                >
                    <ambientLight castShadow intensity={0.6} />
                    <directionalLight
                        position={[1, 1, 1]}
                        intensity={1.2}
                        castShadow={true}
                        shadow-mapSize={[2048, 2048]}
                        
                        shadow-camera-far={50}
                        shadow-camera-left={-15}
                        shadow-camera-right={15}
                        shadow-camera-top={15}
                        shadow-camera-bottom={-15}
                        shadow-bias={-0.0001}
                        shadow-normalBias={0.02}
                        shadow-radius={4} // Radio de suavizado
                        shadow-blurSamples={25} // Muestras para suavizado
                    />
                    {/* En lugar de tus props actuales del Sky, usa: */}
                    {currentSkyConfig && activeSection === 2 && (
                        <Sky
                            key={currentSkyConfig.key}
                            sunPosition={currentSkyConfig.sunPosition}
                            turbidity={currentSkyConfig.turbidity}
                            rayleigh={currentSkyConfig.rayleigh}
                            mieCoefficient={currentSkyConfig.mieCoefficient}
                            mieDirectionalG={currentSkyConfig.mieDirectionalG}
                            inclination={currentSkyConfig.inclination}
                            azimuth={currentSkyConfig.azimuth}
                        />
                    )}
                    <hemisphereLight
                        skyColor="#87CEEB" // Azul cielo
                        groundColor="blue" // Azul para el suelo
                        intensity={0.3}
                    />
                    
                    <Stars
                        radius={100} // Radio de la esfera de estrellas
                        depth={50} // Profundidad del campo de estrellas
                        count={5000} // Número de estrellas
                        factor={6} // Tamaño de las estrellas
                        saturation={0} // Saturación del color (0 = blanco)
                        fade={true} // Las estrellas se desvanecen al acercarse
                    />
                    <Floor />
                    
                    {/* OrbitControls con rotación limitada */}
                    <OrbitControls
                        ref={orbitControlsRef}
                        enableZoom={true}
                        enablePan={true}
                        maxDistance={10}
                        minDistance={3}
                        // Limitar rotación horizontal (azimut)
                        minAzimuthAngle={-Math.PI / 3} // -60 grados
                        maxAzimuthAngle={Math.PI / 3}  // +60 grados
                        // Limitar rotación vertical (polar)
                        minPolarAngle={Math.PI / 6}    // 30 grados desde arriba
                        maxPolarAngle={Math.PI / 2}    // 90 grados (horizontal)
                        // Suavizar movimientos
                        enableDamping={true}
                        dampingFactor={0.05}
                    />

                    {/* Controlador de cámara */}
                    <CameraController 
                        isVideoFocused={isVideoFocused} 
                        setIsVideoFocused={setIsVideoFocused}
                        orbitControlsRef={orbitControlsRef}
                    />

                    {/* Herramientas quirúrgicas */}
                    <SurgicalToolSet scale={3.5} />

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
                                <button onClick={handleToggleMute} title="Mutear o Activar Sonido">
                                    <AiFillMuted />
                                </button>
                            </div>
                        </Html>

                        {/* Burbuja indicadora mejorada cerca del video */}
                        <BurbujaIndicadora
                            position={[2.5, 1.5, 0.5]}
                            scale={0.25}
                            onClick={handleBubbleClick}
                            isActive={isVideoFocused}
                        />
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
                    
                    {/* Indicador de instrucción cuando el video está enfocado - mejorado */}
                    {isVideoFocused && (
                        <Html
                            position={[-5, 1.4, -1]}
                            center
                            
                            scale={0.4}
                        >
                            <div className="video-focus-hint" style={{
                                background: 'linear-gradient(135deg, rgba(107, 211, 255, 0.95), rgba(91, 177, 220, 0.95))',
                                padding: '20px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 15px 30px rgba(255, 107, 107, 0.3)',
                                animation: 'pulse 2s infinite'
                            }}>
                                <p style={{ margin: '0 0 10px 0', fontSize: '18px' }}>🎬 Vista de video enfocada</p>
                                <p style={{ margin: '0', fontSize: '14px', opacity: '0.9' }}>
                                    Haz click en la burbuja roja para volver
                                </p>
                            </div>
                        </Html>
                    )}
                </Canvas>
            </div>
        </div>
    );
};

export default SectionThreeCT;