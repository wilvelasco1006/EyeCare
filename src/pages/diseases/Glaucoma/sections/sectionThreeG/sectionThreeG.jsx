/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from "@react-three/fiber";
import "./sectionThreeG.css";
import VideoMacular from "../../../Videos/TreatmentGlaucoma";
import { OrbitControls, Text, Html, Sky, Text3D, Stars, KeyboardControls } from "@react-three/drei";
import { CiPause1 } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { AiFillMuted } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import Floor from "./../../model-3d/Floor";
import  MedicineEye   from "../../model-3d/medicineEye";
import tooltips from "/src/microcopy/Tooltips.js";
import Lights from "../../Lights/Lights";
import VideoGlaucoma from "../../../Videos/TreatmentGlaucoma";

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

  return <MedicineEye ref={ref} scale={0.5} position={[2.5, 0, -2]} />;
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

const SectionThreeG = () => {
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
    <div className="container-section3-G">
      <div className="treatment-G">
        <KeyboardControls map={keyboardMap}>
          <Canvas camera={{ position: [0, 3, 8], fov: 50 }} shadows={true}>
            <KeyboardHandler onToggleInfo={handleToggleInfo} />
            <Sky />
            <Lights />
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
                  <div className="info-panel-extra-G">
                    <h4>¿Cómo funciona este tratamiento?</h4>
                    <p>
                      El tratamiento para el glaucoma generalmente incluye medicamentos que ayudan a reducir la presión intraocular. Estos pueden ser en forma de gotas o tabletas.
                    </p>
                    <p>
                      También se pueden utilizar métodos como inyecciones intraoculares de medicamentos específicos, como Bevacizumab o Ranibizumab, que ayudan a controlar la progresión de la enfermedad.
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

              <VideoGlaucoma videoRef={videoRef} />

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
                TRATAMIENTO PARA EL GLAUCOMA
                <meshStandardMaterial color="#52a1c0" metalness={0.1} roughness={0.8} />
              </Text3D>
            </group>

            {/* Información adicional flotante (siempre visible) */}
            <group position={[0, -2, 0]}>
              <Html transform scale={0.3} position={[0, 1, 0]} center>
                <div className="info-panel-3d-G">
                  <div className="info-item-G">
                    <h4>Consulta primero</h4>
                    <p>Consulta con un oftalmólogo antes de iniciar cualquier tratamiento.</p>
                    
                  </div>
                  <div className="info-item-G">
                    <h4>Métodos</h4>
                    <p>
                      Los métodos para tratar el glaucoma incluyen:
                    </p>
                    <ul>
                      <li><b>Gotas oftálmicas:</b> Reducen la presión intraocular y son el tratamiento más común.</li>
                      <li><b>Medicamentos orales:</b> Se usan cuando las gotas no son suficientes para controlar la presión.</li>
                    </ul>
                  </div>
                  <div className="info-item-G">
                    <h4>Medicamentos</h4>
                    <p> Dorzolamida
                        (Trusopt), Timolol (Timoptic), Latanoprost (Xalatan), entre otros.</p>
            
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

export default SectionThreeG;
