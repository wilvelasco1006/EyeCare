import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Lights from "../../lights/Lights";
import { Html, OrbitControls, KeyboardControls, useKeyboardControls } from "@react-three/drei";
import { Eye } from "../../models-3d/EyeModel";
import { MacularModel as Macula } from "../../models-3d/MacularModel";
import Floor from "../../models-3d/Floor";
import { useRef, useState, useEffect } from "react";
import Staging from "../../../staging/Staging";
import "./SectionTwoM.css"
import * as THREE from "three";

const Scene = () => {
  const eyeRef = useRef();
  const maculaRef = useRef();
  const { camera } = useThree();
  const [message, setMessage] = useState(null);
  const [target, setTarget] = useState(null);

  // Access keyboard controls
  const [subscribeKeys] = useKeyboardControls();

  // Reset camera and message
  const resetView = () => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    setTarget(null);
    setMessage(null);
  };

  // React to key press (from KeyboardControls)
  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.reset,
      (value) => {
        if (value) resetView();
      }
    );
    return () => unsubscribe();
  }, [subscribeKeys]);

  // Smooth camera movement
  useFrame(() => {
    if (target) {
      camera.position.lerp(target, 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  const handleEyeClick = () => {
    const targetPos = eyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 3));
    setMessage("Este es el Ojo sano.");
    setTarget(targetPos);
  };

  const handleMaculaClick = () => {
    const targetPos = maculaRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 3));
    setMessage("Así se ve la Mácula Afectada y estos son algunos síntomas: \n" + "Visión borrosa o distorsionada.\n" + "Dificultad para ver colores.\n" + "Puntos ciegos en la visión central. Entre otros");
    setTarget(targetPos);
  };

  return (
    <>
      {/* Floating title */}
      <Html position={[0, 1, -2]} center distanceFactor={3} wrapperClass="title" transform>
        <h1>Comparación entre el Exterior del Ojo Sano y la Mácula Afectada en el Interior</h1>
      </Html>

      {/* Eye model */}
      <group ref={eyeRef} position={[-0.6, -0.5, 0]} onClick={handleEyeClick}>
        <Eye scale={[10.5, 10.5, 10.5]} />
      </group>

      {/* Macula model */}
      <group ref={maculaRef} position={[0.6, -0.5, 0]} onClick={handleMaculaClick}>
        <Macula scale={[0.5, 0.5, 0.5]} />
      </group>

      {/* Floating message */}
      {message && (
        <Html position={[0, -1, 0]} center distanceFactor={2} transform>
          <div className="mensaje-info">{message}</div>
        </Html>
      )}

      <Staging />
      <Floor />
    </>
  );
};

const SectionTwoM = () => {
  return (
    <div className="model-container">
      <KeyboardControls
        map={[
          { name: 'reset', keys: ['r', 'R'] },
        ]}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows={true}>
          <Lights />
          <OrbitControls enablePan={false} maxDistance={4} minDistance={1.5} />
          <Scene />
        </Canvas>
      </KeyboardControls>
    </div>
  );
};

export default SectionTwoM;
