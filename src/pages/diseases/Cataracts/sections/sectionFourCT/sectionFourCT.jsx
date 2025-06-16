import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html, Sky, Text3D, Stars, KeyboardControls, Sparkles, SpotLight } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Suspense } from "react";
import Staging from "../../../staging/Staging";
import { Hospital } from "../../Model-3d/Hospital";
import "./sectionFourCT.css";
import Floor from "../../Model-3d/Floor";

const SectionFourCT = () => {
    return (
        <div className="section4CT-container">
            <div className="CT4-intro">
                <h2>Prevención de las cataratas</h2>
                <p>Dale click al modelo para conocer la mejor forma de prevenir las cataratas.</p>
            </div>
            <div className="model-container-4CT">
                <KeyboardControls
                    map={[
                        { name: 'reset', keys: ['r', 'R'] },
                    ]}
                >
                    <Canvas camera={{ position: [0, 0.3, 3.5], fov: window.innerWidth < 1440 ? 45 : 50 }} shadows={true}>
                        <ambientLight intensity={0.9} />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={2}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
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

                        <Hospital scale={0.09} position={[0, -0.9, 0]} />
                        <Floor position={[-1, 0, 0]} />
                        <Sky
                            distance={450000} // Puedes mantener o ajustar esto
                            sunPosition={[-5, -10, -100]} // Sol bajo en el horizonte, ligeramente hacia un lado
                            inclination={0.49} // Ángulo de inclinación del sol (0-1, 0.5 es horizonte)
                            azimuth={0.25} // Dirección horizontal del sol (0-1, 0.25 es oeste si 0 es norte)
                            mieCoefficient={0.005}
                            mieDirectionalG={0.7}
                            rayleigh={0.5} // Ajusta para tonos más azules o rojizos
                            turbidity={10} // Ajusta para claridad del cielo
                        />
                        <Stars
                            radius={100} // Radio de las estrellas
                            depth={50} // Profundidad de las estrellas
                            count={5000} // Número de estrellas
                            factor={7} // Factor de brillo
                            saturation={0} // Saturación del color de las estrellas
                            fade // Hacer que las estrellas se desvanezcan hacia el horizonte
                        />
                        <Sparkles
                            size={6} // Tamaño de las chispas
                            scale={[10, 10, 10]} // Escala de las chispas
                            position={[0, 1, 0]} // Posición de las chispas
                            speed={0.5} // Velocidad de las chispas
                            count={50} // Número de chispas
                        />

                    </Canvas>
                </KeyboardControls>
            </div>
        </div>
    );
};

export default SectionFourCT;