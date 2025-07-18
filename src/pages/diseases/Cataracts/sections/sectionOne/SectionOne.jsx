/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useNavigate } from "react-router";
import "./SectionOne.css";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useKeyboardControls } from "@react-three/drei";
import { FaChevronCircleRight, FaTimes, FaPause, FaPlay } from "react-icons/fa";
import Floor from "../../Model-3d/Floor";
// import Floor from "../../model-3d/Floor";
import SliderControls from "../../../utils/SliderControls/SliderControls";
import { EyeCataractModel } from "../../Model-3d/EyeCataractModel";
import Staging from "../../../staging/Staging";
import ScrollIndicator from "./ScrollIndicator";

// Componente controlador de cámara y modelo
const CameraAndModelController = ({ animationSpeed, setHoverMessage }) => {
    const { camera, size } = useThree();
    const controlsRef = useRef();
    const modelRef = useRef();

    // Función para obtener configuraciones responsivas
    const getResponsiveConfig = () => {
        const isMobile = size.width < 768;
        const isTablet = size.width >= 768 && size.width < 1200;
        const isSmallHeight = size.height < 600;
        const isVerySmallScreen = size.width < 480;

        return {
            isMobile,
            isTablet,
            isSmallHeight,
            isVerySmallScreen,
            cameraDistance: isMobile ? 2.5 : isTablet ? 2.2 : 2,
            modelScale: isMobile ? 8 : isTablet ? 9 : 10,
            minDistance: isMobile ? 0.8 : isTablet ? 0.6 : 0.5,
            maxDistance: isMobile ? 1.5 : isTablet ? 1.2 : 1
        };
    };

    // Función para resetear la vista
    const resetView = () => {
        const config = getResponsiveConfig();

        // Resetear cámara con posición responsiva
        camera.position.set(0, 0, config.cameraDistance);
        camera.lookAt(0, 0, 0);

        // Resetear controles
        if (controlsRef.current) {
            controlsRef.current.reset();
        }

        // Resetear modelo si es accesible
        if (modelRef.current) {
            modelRef.current.position.set(0, 0, 0);
            modelRef.current.rotation.set(0, 0, 0);
        }
    };

    // Manejar la tecla R para resetear
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "r" || event.key === "R") {
                resetView();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [camera]);

    // Configurar cámara inicial responsiva
    useEffect(() => {
        const config = getResponsiveConfig();
        camera.position.set(0, 0, config.cameraDistance);
        camera.lookAt(0, 0, 0);
    }, [size.width, size.height, camera]);

    const config = getResponsiveConfig();

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                minDistance={config.minDistance}
                maxDistance={config.maxDistance}
                enablePan={true}
                enableRotate={true}
                enableZoom={true}
            />
            <Suspense fallback={null}>
                <EyeCataractModel
                    ref={modelRef}
                    scale={config.modelScale}
                    position={[0, 0, 0]}
                    setHoverMessage={setHoverMessage}
                    animationSpeed={animationSpeed}
                />
            </Suspense>
        </>
    );
};

const SectionOne = () => {
    const [hoverMessage, setHoverMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    const [animationSpeed, setAnimationSpeed] = useState(1); // Estado para la velocidad de animación
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowInstruction(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const messages = ["Ojo medianamente afectado por las cataratas"];
    const totalViews = messages.length;
    const [viewIndex, setViewIndex] = useState(0);
    const handlePrev = () =>
        setViewIndex((prev) => (prev === 0 ? totalViews - 1 : prev - 1));
    const handleNext = () => setViewIndex((prev) => (prev + 1) % totalViews);
    const handleSelect = (idx) => setViewIndex(idx);

    // Función para cambiar la velocidad de animación
    const toggleAnimationSpeed = () => {
        // Alterna entre velocidades
        if (animationSpeed === 1) {
            setAnimationSpeed(0.5); // Más lento
        } else if (animationSpeed === 0.5) {
            setAnimationSpeed(0); // Detener
        } else {
            setAnimationSpeed(1); // Velocidad normal
        }
    };

    // Slider informativo de causas
    const causas = [
        {
            titulo: "¿En qué consiste?",
            descripcion: (
                <>
                    Las cataratas son una opacidad o nubosidad en el cristalino del ojo,
                    el lente natural que permite enfocar la luz y formar imágenes claras
                    en la retina. Con el tiempo, esta nubosidad dificulta la visión,
                    afectando la calidad de vida de quien la padece. Aunque las cataratas
                    están relacionadas con el envejecimiento, también se pueden
                    desarrollar por las siguientes causas.
                </>
            ),
        },
        {
            titulo: "Envejecimiento natural del ojo",
            descripcion:
                "Generalmente aparece después de los 50 años debido a cambios naturales en el cristalino.",
        },
        {
            titulo: "Lesiones oculares",
            descripcion:
                "Golpes o traumatismos pueden dañar el cristalino y acelerar la formación de cataratas.",
        },
        {
            titulo: "Exposición prolongada a rayos UV",
            descripcion:
                "El contacto constante con luz solar sin protección puede aumentar el riesgo de cataratas.",
        },
        {
            titulo: "Diabetes",
            descripcion:
                "Los niveles altos de azúcar en sangre alteran la estructura del cristalino, favoreciendo su opacidad.",
        },

    ];
    const [causaIndex, setCausaIndex] = useState(0);
    const handleCausaPrev = () =>
        setCausaIndex((prev) => (prev === 0 ? causas.length - 1 : prev - 1));
    const handleCausaNext = () =>
        setCausaIndex((prev) => (prev + 1) % causas.length);
    const handleCausaSelect = (index) => setCausaIndex(index);

    // Función para obtener el icono según la velocidad de animación
    const getSpeedIcon = () => {
        if (animationSpeed === 0) {
            return <FaPlay style={{ fontSize: "2rem" }} />;
        } else if (animationSpeed === 0.5) {
            return <FaChevronCircleRight style={{ fontSize: "2rem" }} />;
        } else {
            return <FaChevronCircleRight style={{ fontSize: "2rem" }} />;
        }
    };

    return (
        <>
            <div className="sectionOneCT"> 
                <div className="Text-container-sectionOne">
                    <button className="btn-atras" onClick={() => navigate('/diseases/content-diseases?from=cataratas')}> 
                        Atrás
                    </button>
                    <h2 className="cataracts-title">Cataratas</h2>
                    {/* Slider informativo de causas */}
                    <div className="slider-container">
                        {/* 1) Track: todos los slides en fila */}
                        <div
                            className="slider-track"
                            style={{
                                transform: `translateX(-${causaIndex * 100}%)`,
                                transition: "transform 0.4s ease-in-out",
                            }}
                        >
                            {causas.map((c, idx) => (
                                <div key={idx} className="slider-box">
                                    <h3 className="causa-title">{c.titulo}</h3>
                                    <p className="causa-description">{c.descripcion}</p>
                                </div>
                            ))}
                        </div>
                        {/* 2) Controles + botón */}
                        <div className="actions">
                            <SliderControls
                                current={causaIndex}
                                total={causas.length}
                                onPrev={handleCausaPrev}
                                onNext={handleCausaNext}
                                onSelect={handleCausaSelect}
                            />
                        </div>
                    </div>
                    <button className="btn-more-info" onClick={() => setShowModal(true)}>
                        Ver más
                    </button>
                    {showInstruction && (
                        <div className="box-message show">
                            <div>
                                <h3>¡Es hora de navegar!</h3>
                                <p>Dale a la flecha para saber un poco más...</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="model-container">
                    <div className="floating-message">{messages[viewIndex]}</div>
                    {hoverMessage && <div className="hover-message">{hoverMessage}</div>}
                    <Canvas camera={{ position: [0, 0, 2], fov: 50 }} shadows={true}>
                        <ambientLight castShadow intensity={0.5} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={1.5}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        <Suspense fallback={null}>
                            <Staging />
                        </Suspense>

                        <CameraAndModelController
                            animationSpeed={animationSpeed}
                            setHoverMessage={setHoverMessage}
                        />
                        <Floor />
                    </Canvas>

                    <button
                        title={
                            animationSpeed === 0
                                ? "Reproducir animación"
                                : animationSpeed === 0.5
                                    ? "Pausar animación"
                                    : "Reducir velocidad de la animación"
                        }
                        onClick={toggleAnimationSpeed}
                        className="btn-cataracts"
                    >
                        {getSpeedIcon()}
                    </button>
                </div>
            </div>
            {/* Indicador de Scroll */}
            {/* <ScrollIndicator /> */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-cataratas" onClick={() => setShowModal(false)}>
                            <FaTimes style={{ fontSize: "1.5rem" }} />
                        </button>
                        <img
                            src="https://res.cloudinary.com/dijh9two4/image/upload/v1745616701/cataract-vision_spvbi3.jpg"
                            alt="Visión con cataratas"
                            className="vision-image"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SectionOne;