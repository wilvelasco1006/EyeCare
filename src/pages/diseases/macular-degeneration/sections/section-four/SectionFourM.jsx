/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import "./SectionFourM.css";
import { OrbitControls, Html, Sky, Text3D, Sparkles, KeyboardControls } from "@react-three/drei";
import { useState, useRef } from "react";
import Lights from "./../../lights/Lights";
import Floor from "./../../models-3d/Floor";
import { useKeyboardControls } from "@react-three/drei";
import { PillsModel } from '../../models-3d/PillsModel';

// Configuración de controles de teclado
const keyboardMap = [
  { name: 'showInfo', keys: ['KeyP', 'p', 'P'] }
];

// Componente interno para rotar el modelo
const RotatingPrevention = ({ rotate, onClick }) => {
  const ref = useRef();

  useFrame(() => {
    if (rotate && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <PillsModel
      ref={ref}
      scale={60}
      position={[-1, -0.5, 0]}
      castShadow
      receiveShadow
      onClick={onClick}
    />
  );
};

// Componente para manejar los controles de teclado
const KeyboardHandler = ({ onToggleInfo }) => {
  const [, get] = useKeyboardControls();

  useFrame(() => {
    const { showInfo } = get();
    if (showInfo) {
      onToggleInfo();
    }
  });

  return null;
};

const SectionFourM = () => {
  const [rotate, setRotate] = useState(false);
  const [showClickInfo, setShowClickInfo] = useState(false); // NUEVO
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const lastToggleTime = useRef(0);

  const handleToggleInfo = () => {
    const now = Date.now();
    if (now - lastToggleTime.current > 300) {
      setRotate((prev) => !prev);
      setShowInitialMessage(false);
      lastToggleTime.current = now;
    }
  };

  const handleModelClick = () => {
    setShowClickInfo((prev) => !prev);
  };

  return (
    <div className="container-section4-M">
      <div className='prevention-M'>
        <KeyboardControls map={keyboardMap}>
          <Canvas className="prevention-M" camera={{ position: [0, 0, 6], fov: 50 }} shadows={true}>
            <Lights />
            <OrbitControls enableZoom={true} enablePan={true} maxDistance={10} minDistance={3}/>
            <Sky sunPosition={[100, 20, 100]} />
            <Sparkles count={256} speed={1.5} opacity={1} scale={10} size={4} color={"#52A1C0"} noise={1} />
            <Floor />
            <KeyboardHandler onToggleInfo={handleToggleInfo}/>
            <RotatingPrevention rotate={rotate} onClick={handleModelClick} />

            {/* Título principal */}
            <group position={[0, 3.5, -3]}>
              <Text3D
                font="/fonts/B20_Sans.json"
                position={[-4.5, -0.9, 0]}
                size={0.4}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                castShadow
                receiveShadow
                transform={false}
              >
                PREVENCIÓN DE LA DEGENERACIÓN MACULAR
                <meshStandardMaterial color="#52a1c0" metalness={0.1} roughness={0.8} />
              </Text3D>
            </group>

            {/* Título 2D permanente */}
            <Html position={[-5.5, 1.5, -3]} center transform scale={0.4}>
              <div className="info-reminder-message">
                <p><strong>Consejo:</strong> Presiona la tecla <span className="key-highlight">P</span> 
                en cualquier momento para alternar la visualización de la información. O haz clic en el modelo para ver información adicional.
                </p>
              </div>
            </Html>

            {/* Mensaje inicial */}
            {showInitialMessage && (
              <Html position={[0, 1.5, -3]} center transform scale={0.4}>
                <div className="keyboard-instruction-message">
                  <div className="instruction-icon">⌨️</div>
                  <div className="instruction-content">
                    <h3>Información Interactiva</h3>
                    <p>Presiona la tecla <span className="key-highlight">P</span> para activar o detener la rotación del modelo 
                    y ver más información
                    </p>
                  </div>
                </div>
              </Html>
            )}

            {/* Info al presionar P */}
            {rotate && (
              <group position={[0, 1, -2]}>
                <Html transform scale={0.3} center>
                  <div className="info-panel-extra-M">
                    <h4>¿La Degeneración Macular se puede prevenir?</h4>
                    <p>
                      Aunque no existe una forma garantizada de prevenir la degeneración macular, 
                      un estilo de vida saludable puede reducir el riesgo de desarrollarla o retrasar su progresión.
                      Esto incluye evitar el tabaco, llevar una dieta rica en antioxidantes, hacer ejercicio regularmente
                      y proteger los ojos del sol.
                    </p>
                  </div>
                </Html>
              </group>
            )}

            {/* Info al hacer clic sobre el modelo */}
            {showClickInfo && (
              <group position={[4.5, 1, -2]}>
                <Html transform scale={0.3} center>
                    <div className="click-info-panel">
                    <h4>Consejos adicionales</h4>
                    <p>
                      Mantener una dieta equilibrada rica en frutas y verduras, 
                      especialmente aquellas ricas en vitaminas C y E, zinc y omega-3 (También pueden ser píldoras o pastillas), 
                      puede ayudar a mantener la salud ocular.
                    </p>
                  </div>
                </Html>
              </group>
            )}
          </Canvas>
        </KeyboardControls>
      </div>
    </div>
  );
};

export default SectionFourM;