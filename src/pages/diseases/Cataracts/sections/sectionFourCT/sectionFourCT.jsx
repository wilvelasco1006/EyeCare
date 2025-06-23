import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html, Sky, Text3D, Stars, KeyboardControls, Sparkles, SpotLight } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Suspense } from "react";

import { Hospital } from "../../Model-3d/Hospital";
import "./sectionFourCT.css";
import Floor from "../../Model-3d/Floor";
import { useSkyConfig } from '../../Cataracts';
const SectionFourCT = () => {
    const { currentSkyConfig, activeSection } = useSkyConfig();
    const [activePoint, setActivePoint] = useState(null);
    

    const preventionPoints = [
        {
            position: [1, 0.6, 0],
            title: "Chequeos Regulares",
            description: "Realiza exámenes oftalmológicos anuales después de los 60 años. La detección temprana es clave para el tratamiento efectivo de las cataratas."
        },
        {
            position: [-1, 0.6, 0],
            title: "Protección UV",
            description: "Usa gafas de sol con protección UV-A y UV-B cuando estés al aire libre. La exposición prolongada a rayos UV contribuye al desarrollo de cataratas."
        },
        {
            position: [0, 0.6, 1],
            title: "Alimentación Saludable",
            description: "Consume alimentos ricos en antioxidantes como frutas y verduras. Nutrientes como luteína, zeaxantina, vitamina C y E pueden ayudar a proteger los ojos."
        },
        {
            position: [0, 0.6, -1],
            title: "Estilo de Vida Saludable",
            description: "Evita el tabaco y controla condiciones como la diabetes e hipertensión. Estas pueden acelerar el desarrollo de cataratas y otras enfermedades oculares."
        },
    ];
    

    return (
        <div className="section4CT-container">
            <div className="model-container-4CT">
                <KeyboardControls
                    map={[
                        { name: 'reset', keys: ['r', 'R'] },
                    ]}
                >
                    <Canvas camera={{ position: [0, 0.3, 4.5], fov: window.innerWidth < 1440 ? 45 : 50 }} shadows={true}>
                        <ambientLight intensity={0.9} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={2}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        {/* En lugar de tus props actuales del Sky, usa: */}
                        {currentSkyConfig && activeSection === 3 && (
                            <Sky
                                key={currentSkyConfig.key}
                                sunPosition={currentSkyConfig.sunPosition}
                                turbidity={currentSkyConfig.turbidity}
                                rayleigh={currentSkyConfig.rayleigh}
                                mieCoefficient={currentSkyConfig.mieCoefficient}
                                mieDirectionalG={currentSkyConfig.mieDirectionalG}
                                inclination={currentSkyConfig.inclination}
                                azimuth={currentSkyConfig.azimuth}
                                distance={currentSkyConfig.distance}
                            />
                        )}
                        <Stars
                            radius={100} // Radio de las estrellas
                            depth={50} // Profundidad de las estrellas
                            count={5000} // Número de estrellas
                            factor={7} // Factor de brillo
                            saturation={0} // Saturación del color de las estrellas
                            fade // Hacer que las estrellas se desvanezcan hacia el horizonte
                        />
                        <Floor position={[-1, 0, 0]} />
                        <SpotLight
                            distance={2}
                            angle={0.3}
                            attenuation={2}
                            anglePower={2} // Diffuse-cone anglePower (default: 5)
                        />

                        <OrbitControls
                            enablePan={false}
                            maxDistance={4}
                            minDistance={1.5}
                            enableDamping
                            dampingFactor={0.05}
                        />
                        <Sparkles
                            size={6} // Tamaño de las chispas
                            scale={[10, 10, 10]} // Escala de las chispas
                            position={[0, 1, 0]} // Posición de las chispas
                            speed={0.5} // Velocidad de las chispas
                            count={50} // Número de chispas
                        />
                        <Hospital scale={0.09} position={[0, -0.9, 0]} animate={true} animationSpeed={2} animationIntensity={0.0005} />
                        <group position={[-1.9, 1, 0]}>
                            <Text3D
                                font="/fonts/B20_Sans.json"
                                position={[0, 0.1, 0]}
                                size={0.2}
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
                                PREVENCIÓN DE LAS CATARATAS
                                <meshStandardMaterial
                                    color="#52a1c0"
                                    metalness={0.1}
                                    roughness={0.8}
                                />
                            </Text3D>
                        </group>

                        {/* puntos de información alrededor del hospital */}
                        <group>
                            {preventionPoints.map((point, index) => (
                                <group key={index} position={point.position}>
                                    {/* Punto pulsante */}
                                    <mesh onClick={() => setActivePoint(index)}>
                                        <sphereGeometry args={[0.15, 16, 16]} />
                                        <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.8} />
                                    </mesh>
                                    {/* Número o icono */}
                                    <Text
                                        position={[0, 0.25, 0]}
                                        fontSize={0.2}
                                        color="white"
                                    >
                                        {index + 1}
                                    </Text>
                                </group>
                            ))}

                            {/*panel de información cuando se hace clic en un punto */}
                            {activePoint !== null && (
                                <Html position={[2, 0.5, 0]} className="prevention-info-container" distanceFactor={4}>
                                    <div className="info-panel-right">
                                        <h3>{preventionPoints[activePoint].title}</h3>
                                        <p>{preventionPoints[activePoint].description}</p>
                                        <button onClick={() => setActivePoint(null)}>Cerrar</button>
                                    </div>
                                </Html>
                            )}
                        </group>
                        <Html position={[-4.0, 0.3, 0]} className="instruction-container" distanceFactor={4} >
                            <div className="instructions-panel">
                                <h3>Guía de Prevención</h3>
                                <p>Toca cada una de las esferas informativas alrededor del hospital para descubrir consejos de prevención. Recuerda que puedes mover el modelo con el mouse.</p>
                                {activePoint === null && (
                                    <div className="pulse-indicator">
                                        <span>👆 ¡Interactúa ahora!</span>
                                    </div>
                                )}
                            </div>
                        </Html>
                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionFourCT;