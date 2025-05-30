import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useKeyboardControls, KeyboardControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import Staging from "../../../staging/Staging";
import { EyeBlank } from "../../Model-3d/EyeBlank";
import "./sectionTwoCT.css";
import Floor from "../../Model-3d/Floor";

const Scene = () => {
    const eyeRef = useRef();
    const eyeGroupRef = useRef();
    const { camera, size } = useThree();
    const [message, setMessage] = useState(null);
    const [target, setTarget] = useState(null);
    const [symptomIndex, setSymptomIndex] = useState(-1);
    const [showHint, setShowHint] = useState(true);
    const [subscribeKeys] = useKeyboardControls();

    // Función para obtener configuraciones responsivas
    const getResponsiveConfig = () => {
        const isMobile = size.width < 768;
        const isTablet = size.width >= 768 && size.width < 1200;
        const isSmallLaptop = size.width >= 1200 && size.width < 1440;
        const isSmallHeight = size.height < 700;
        const isVerySmallScreen = size.width < 480;

        return {
            isMobile,
            isTablet,
            isSmallLaptop, // Nueva propiedad
            isSmallHeight,
            isVerySmallScreen,
            eyeScale: isMobile ? [2.2, 2.2, 2.2] :
                isTablet ? [2.6, 2.6, 2.6] :
                    isSmallLaptop ? [2.8, 2.8, 2.8] : // Escala para laptops pequeñas
                        [3, 3, 3],
            titleDistanceFactor: isMobile ? 2.2 :
                isTablet ? 2.8 :
                    isSmallLaptop ? 3.2 : // Mayor distancia para laptops pequeñas
                        3,
            messageDistanceFactor: isMobile ? 1 :
                isTablet ? 1.1 :
                    isSmallLaptop ? 1.3 : // Más grande en laptops pequeñas
                        1.2,
            hintDistanceFactor: isMobile ? 1.8 :
                isTablet ? 2 :
                    isSmallLaptop ? 2.2 : // Ajuste para laptops pequeñas
                        2,
            cameraDistance: isMobile ? 3.2 :
                isTablet ? 2.8 :
                    isSmallLaptop ? 2.5 : // Distancia intermedia
                        2.2
        };
    };

    // Lista de síntomas con posiciones responsivas
    const getSymptoms = () => {
        const { isMobile, isTablet, isSmallLaptop, isSmallHeight, isVerySmallScreen } = getResponsiveConfig();

        // Posiciones para móviles muy pequeños
        const verySmallPositions = [
            [0, -0.8, 0],
            [0, -0.8, 0],
            [0, -0.8, 0],
            [0, -0.8, 0],
            [0, -0.8, 0]
        ];

        // Posiciones para móviles
        const mobilePositions = [
            [0, -0.9, 0],
            [0, -0.9, 0],
            [0, -0.9, 0],
            [0, -0.9, 0],
            [0, -0.9, 0]
        ];

        // Posiciones para tablets
        const tabletPositions = [
            [0.8, -0.4, 0],
            [-1.1, -0.1, 0],
            [0, -0.7, 0],
            [0, 1.1, 0],
            [-0.9, -0.3, 0]
        ];

        // Posiciones para desktop
        const desktopPositions = [
            [1.2, -0.3, 0],   // Posición para "Visión borrosa o nublada"
            [-1.2, -0.1, 0],  // Posición para "Sensibilidad a la luz"
            [0, -0.8, 0],     // Posición para "Colores menos brillantes"
            [0, 1.6, 0],      // Posición para "Dificultad para ver de noche"
            [-1.3, -0.2, 0]   // Posición para "Visión doble en un solo ojo"
        ];
        // Posiciones para laptops pequeñas (1366x768)
        const smallLaptopPositions = [
            [1.0, -0.35, 0],  // Más centrado verticalmente
            [-1.0, -0.1, 0],
            [0, -0.65, 0],
            [0, 1.2, 0],
            [-1.1, -0.25, 0]
        ];

        let positions = desktopPositions;
        if (isVerySmallScreen) positions = verySmallPositions;
        else if (isMobile) positions = mobilePositions;
        else if (isTablet) positions = tabletPositions;
        else if (isSmallLaptop) positions = smallLaptopPositions; // Usar posiciones para laptops pequeñas

        // Ajustar posiciones si la altura es pequeña
        if (isSmallHeight) {
            positions = positions.map(pos => [pos[0], pos[1] * 0.8, pos[2]]);
        }

        return [
            {
                title: "Visión borrosa o nublada",
                description: "Las cataratas hacen que los objetos aparezcan difuminados, como si estuvieras mirando a través de un vidrio esmerilado o una ventana empañada.",
                eyeDirection: [0.5, 0.3, 0],
                position: positions[0]
            },
            {
                title: "Sensibilidad a la luz",
                description: "La luz brillante puede causar molestia o deslumbramiento, especialmente al conducir de noche con los faros de coches que vienen en dirección contraria.",
                eyeDirection: [-0.9, 0.2, 0],
                position: positions[1]
            },
            {
                title: "Colores menos brillantes",
                description: "Los colores parecen desvanecidos o amarillentos, perdiendo su intensidad original. Es como ver el mundo a través de un filtro sepia.",
                eyeDirection: [0, 0.4, 0],
                position: positions[2]
            },
            {
                title: "Dificultad para ver de noche",
                description: "La visión nocturna se deteriora notablemente, haciendo difícil actividades como conducir o leer en condiciones de poca luz.",
                eyeDirection: [0, -0.4, 0],
                position: positions[3]
            },
            {
                title: "Visión doble en un solo ojo",
                description: "Algunas personas experimentan diplopía monocular, donde ven imágenes duplicadas aunque tengan un solo ojo abierto.",
                eyeDirection: [-0.9, 0.3, 0],
                position: positions[4]
            }
        ];
    };

    // Resetear vista y estado
    const resetView = () => {
        const { isMobile, isTablet } = getResponsiveConfig();
        let cameraZ = 2.5;

        if (isMobile) cameraZ = 3.5;
        else if (isTablet) cameraZ = 3;

        camera.position.set(0, 0.3, cameraZ);
        camera.lookAt(0, 0, 0);
        setTarget(null);
        setMessage(null);
        setShowHint(true);
        setSymptomIndex(-1);

        // Resetear rotación del ojo
        if (eyeGroupRef.current) {
            eyeGroupRef.current.rotation.x = 0;
            eyeGroupRef.current.rotation.y = 0;
        }
    };

    // Usar useKeyboardControls para detectar la tecla R
    useEffect(() => {
        const unsubscribe = subscribeKeys(
            (state) => state.reset,
            (value) => {
                if (value) resetView();
            }
        );
        return () => unsubscribe();
    }, [subscribeKeys]);

    // Animación suave de la cámara y del ojo
    useFrame(() => {
        const symptoms = getSymptoms();

        if (target) {
            camera.position.lerp(target, 0.05);
            camera.lookAt(0, 0, 0);
        }

        // Animar la mirada del ojo basada en el síntoma actual
        if (symptomIndex >= 0 && eyeGroupRef.current && symptoms[symptomIndex]) {
            const targetRotation = symptoms[symptomIndex].eyeDirection;
            eyeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
                eyeGroupRef.current.rotation.x,
                targetRotation[1],
                0.05
            );
            eyeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
                eyeGroupRef.current.rotation.y,
                targetRotation[0],
                0.05
            );
        }
    });

    // Manejo del clic en el ojo
    const handleEyeClick = () => {
        const symptoms = getSymptoms();
        const { cameraDistance } = getResponsiveConfig();

        // Incrementar el índice para mostrar el siguiente síntoma
        const nextIndex = symptomIndex < symptoms.length - 1 ? symptomIndex + 1 : 0;
        setSymptomIndex(nextIndex);

        // Calcular nueva posición de la cámara para acercarse al ojo
        const targetPos = eyeRef.current
            .getWorldPosition(new THREE.Vector3())
            .add(new THREE.Vector3(0, 0, cameraDistance));

        setMessage(symptoms[nextIndex]);
        setTarget(targetPos);
        setShowHint(false);
    };

    const symptoms = getSymptoms();
    const config = getResponsiveConfig();

    return (
        <>
            {/* Título flotante */}
            <Html
                position={[0, 1, -2]}
                center
                distanceFactor={config.titleDistanceFactor}
                wrapperClass="title"
                transform
            >
                <h1>Síntomas de las cataratas</h1>
            </Html>

            {/* Instrucción inicial */}
            {showHint && (
                <Html
                    position={[0, -0.7, 0]}
                    center
                    distanceFactor={config.hintDistanceFactor}
                    wrapperClass="instruction-hint"
                    transform
                >
                    <div className="instruction">
                        Da click en el ojo para ver los síntomas
                    </div>
                </Html>
            )}

            {/* Grupo contenedor del ojo para animar rotaciones */}
            <group ref={eyeGroupRef} position={[0, 0, 0]}>
                <group
                    ref={eyeRef}
                    position={[0, 0, 0]}
                    onClick={handleEyeClick}
                    scale={config.eyeScale}
                >
                    <Suspense fallback={null}>
                        <EyeBlank />
                    </Suspense>
                </group>
            </group>

            {/* Mensaje flotante con el síntoma seleccionado */}
            {message && (
                <Html
                    position={symptoms[symptomIndex].position}
                    center
                    distanceFactor={config.messageDistanceFactor}
                    transform
                    wrapperClass="instruction-hint"
                >
                    <div className="instruction symptom-card">
                        <h3>{message.title}</h3>
                        <p>{message.description}</p>
                        <div className="counter">
                            {symptomIndex + 1} de {symptoms.length}
                        </div>
                    </div>
                </Html>
            )}

            {/* Indicador de tecla R para resetear */}
            {!showHint && (
                <Html
                    position={
                        config.isVerySmallScreen ? [0, -1.8, 0] :
                            config.isMobile ? [0, -1.5, 0] :
                                config.isTablet ? [-1, -0.9, 0] :
                                    [-1.5, -0.8, 0]
                    }
                    center
                    distanceFactor={config.messageDistanceFactor}
                    transform
                >
                    <div className="tecla-hint">
                        🔄 Presiona la tecla <strong>R</strong> para reiniciar.
                        <br /> Da click en la parte central del ojo para ver cada síntoma
                    </div>
                </Html>
            )}

            <Staging />
            <Floor />
        </>
    );
};

const SectionTwoCT = () => {
    return (
        <div className="section2CT-container">
            <div className="CT-intro">
                <h2>Conoce los síntomas de las cataratas</h2>
                <p>Dale click al ojo para conocer los diversos síntomas y sumérgete en el aprendizaje.</p>
            </div>
            <div className="model-container-CT">
                <KeyboardControls
                    map={[
                        { name: 'reset', keys: ['r', 'R'] },
                    ]}
                >
                    <Canvas camera={{ position: [0, 0.3, 2.5], fov: window.innerWidth < 1440 ? 45 : 50 }} shadows={true}>
                        <ambientLight intensity={0.7} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={2}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        <OrbitControls
                            enablePan={false}
                            maxDistance={4}
                            minDistance={1.5}
                            enableDamping
                            dampingFactor={0.05}
                        />
                        <Scene />
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionTwoCT;