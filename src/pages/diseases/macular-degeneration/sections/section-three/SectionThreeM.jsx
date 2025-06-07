/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from "@react-three/fiber";
import "./sectionThreeM.css";
import VideoMacular from "../../../Videos/TreatmentMacular";
import { OrbitControls, Text, Html, Sky, Text3D, Stars, KeyboardControls } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import Lights from "./../../lights/Lights";
import Floor from "./../../models-3d/Floor";
import { TreatmentModel } from "../../models-3d/TreatmentModel";
import tooltips from "/src/microcopy/Tooltips.js";

// Configuración de controles de teclado
const keyboardMap = [
  { name: 'showInfo', keys: ['KeyT', 't', 'T'] }
];

// Componente interno para rotar el modelo
const RotatingTreatment = ({ rotate }) => {
  const ref = useRef();

  useFrame(() => {
    if (rotate && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <TreatmentModel ref={ref} scale={6.5} position={[2.5, 0, -2]} />;
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

const SectionThreeM = () => {
  const videoRef = useRef(null);
  const [rotate, setRotate] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const lastToggleTime = useRef(0);

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();
  const handleToggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  const handleToggleInfo = () => {
    const now = Date.now();
    // Evitar múltiples activaciones rápidas
    if (now - lastToggleTime.current > 300) {
      setRotate((prev) => !prev);
      setShowPrompt(false);
      setShowInitialMessage(false);
      lastToggleTime.current = now;
    }
  };

  // Ocultar mensaje inicial después de 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-section3-M">
      <div className="treatment-M">
        <KeyboardControls map={keyboardMap}>
          <Canvas camera={{ position: [0, 3, 8], fov: 50 }} shadows={true}>
            <KeyboardHandler onToggleInfo={handleToggleInfo} />
            <Lights />
            <Sky />
            <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade={true} />
            <Floor />
            <OrbitControls enableZoom={true} enablePan={true} maxDistance={10} minDistance={3} />

            <RotatingTreatment rotate={rotate} />

            {/* Mensaje inicial mejorado */}
            {showInitialMessage && (
              <Html position={[5, 1.5, -3]} center transform scale={0.4}>
                <div className="keyboard-instruction-message">
                  <div className="instruction-icon">⌨️</div>
                  <div className="instruction-content">
                    <h3>Información Interactiva</h3>
                    <p>Presiona la tecla <span className="key-highlight">T</span> para ver más detalles sobre el tratamiento</p>
                    <div className="instruction-hint">Este mensaje desaparecerá automáticamente</div>
                  </div>
                </div>
              </Html>
            )}


            {/* Info adicional cuando gira */}
            {rotate && (
              <group position={[5.5, 1, -2]}>
                <Html transform scale={0.3} center>
                  <div className="info-panel-extra-M">
                    <h4>¿Cómo funciona este tratamiento?</h4>
                    <p>
                      El tratamiento busca frenar el deterioro de la mácula mediante medicamentos antiangiogénicos que se administran por inyección intraocular.
                    </p>
                    <p>
                      También existen suplementos antioxidantes que pueden retrasar la progresión de la enfermedad en ciertos casos.
                    </p>
                  </div>
                </Html>
              </group>
            )}

            {/* Sección de video */}
            <group position={[-2.5, 0.4, -2]} scale={0.6} rotation={[0, 0.3, 0]}>
              <Text position={[0, 3, 0]} fontSize={0.4} color="#2c3e50">
                VIDEO INFORMATIVO
              </Text>

              <VideoMacular videoRef={videoRef} />

              <Html transform scale={0.4} position={[0, -1.5, 0]} center>
                <div className="video-controls-M">
                  <button onClick={handlePlay} title={tooltips.videoControls.play}>
                    <FaPlay />
                  </button>
                  <button onClick={handlePause} title={tooltips.videoControls.pause}>
                    <CiPause1 />
                  </button>
                  <button onClick={handleToggleMute} title={tooltips.videoControls.mute}>
                    <AiFillMuted />
                  </button>
                </div>
              </Html>
            </group>

            {/* Título principal */}
            <group position={[-1, 3.5, -3]}>
              <Text3D
                font="/fonts/B20_Sans.json"
                position={[-4.5, -0.9, 0]}
                size={0.4}
                height={0.1}
                curveSegments={12}
                bevelEnabled={true}
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                castShadow
                receiveShadow
                transform={false}
              >
                TRATAMIENTO PARA LA DEGENERACIÓN MACULAR
                <meshStandardMaterial color="#52a1c0" metalness={0.1} roughness={0.8} />
              </Text3D>
            </group>

            {/* Información adicional flotante (siempre visible) */}
            <group position={[0, -2, 0]}>
              <Html transform scale={0.3} position={[0, 1, 0]} center>
                <div className="info-panel-3d-M">
                  <div className="info-item-M">
                    <h4>Medicamentos</h4>
                    <p>Bevacizumab (Avastin), Ranibizumab (Lucentis), Fórmula AREDS2, etc.</p>
                  </div>
                  <div className="info-item-M">
                    <h4>Métodos</h4>
                    <p>Inyecciones intraoculares y suplementos antioxidantes orales.</p>
                  </div>
                  <div className="info-item-M">
                    <h4>Consulta primero</h4>
                    <p>Consulta con un oftalmólogo antes de iniciar cualquier tratamiento.</p>
                  </div>
                </div>
              </Html>
            </group>
          </Canvas>
        </KeyboardControls>
      </div>
    </div>
  );
};

export default SectionThreeM;