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
    const { camera } = useThree();
    const [message, setMessage] = useState(null);
    const [target, setTarget] = useState(null);
    const [symptomIndex, setSymptomIndex] = useState(-1);
    const [showHint, setShowHint] = useState(true);
    const [subscribeKeys] = useKeyboardControls();


    // Lista de síntomas con descripciones más detalladas
    const symptoms = [
        {
            title: "Visión borrosa o nublada",
            description: "Las cataratas hacen que los objetos aparezcan difuminados, como si estuvieras mirando a través de un vidrio esmerilado o una ventana empañada.",
            eyeDirection: [0.5, 0.3, 0],
            position: [1.2, -0.3, 0] // posición a la derecha
        },
        {
            title: "Sensibilidad a la luz",
            description: "La luz brillante puede causar molestia o deslumbramiento, especialmente al conducir de noche con los faros de coches que vienen en dirección contraria.",
            eyeDirection: [-0.9, 0.2, 0],
            position: [-1.2, -0.1, 0] // posición a la izquierda
        },
        {
            title: "Colores menos brillantes",
            description: "Los colores parecen desvanecidos o amarillentos, perdiendo su intensidad original. Es como ver el mundo a través de un filtro sepia.",
            eyeDirection: [0, 0.4, 0],
            position: [0, -0.8, 0] // posición abajo
        },
        {
            title: "Dificultad para ver de noche",
            description: "La visión nocturna se deteriora notablemente, haciendo difícil actividades como conducir o leer en condiciones de poca luz.",
            eyeDirection: [0, -0.4, 0],
            position: [0, 0.5, 0] // posición arriba
        },
        {
            title: "Visión doble en un solo ojo",
            description: "Algunas personas experimentan diplopía monocular, donde ven imágenes duplicadas aunque tengan un solo ojo abierto.",
            eyeDirection: [-0.9, 0.3, 0],
            position: [-1.3, -0.2, 0] // posición izquierda abajo
        }
    ];

    // Resetear vista y estado

    const resetView = () => {
        camera.position.set(0, 0.3, 2.5);
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
        // Incrementar el índice para mostrar el siguiente síntoma
        const nextIndex = symptomIndex < symptoms.length - 1 ? symptomIndex + 1 : 0;
        setSymptomIndex(nextIndex);

        // Calcular nueva posición de la cámara para acercarse al ojo
        const targetPos = eyeRef.current
            .getWorldPosition(new THREE.Vector3())
            .add(new THREE.Vector3(0, 0, 2.2)); // Más cerca

        setMessage(symptoms[nextIndex]);
        setTarget(targetPos);
        setShowHint(false);
    };

    return (
        <>
            {/* Título flotante */}
            <Html
                position={[0, 1, -2]}
                center
                distanceFactor={3}
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
                    distanceFactor={2}
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
                    scale={[3, 3, 3]} // Aumenta el tamaño para que se vea más de cerca
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
                    distanceFactor={1.2}
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
                <Html position={[-1.5, -1.1, 0]} center distanceFactor={1.2} transform>
                    <div className="tecla-hint">🔄 Presiona la tecla <strong>R</strong> para reiniciar. <br/> Da click en la parte central del ojo para ver cada síntoma</div>
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
                    <Canvas camera={{ position: [0, 0.3, 2.5], fov: 50 }} shadows={true}>
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
