import { Canvas, useFrame, useThree } from "@react-three/fiber"
import Lights from "../../lights/Lights";
import { Html, OrbitControls } from "@react-three/drei";
import { Eye, Macula } from "../../models-3d/EyeModel";
import { useRef, useState } from "react";
import "./SectionTwoM.css"
// import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Staging from "../../../staging/Staging";
import Floor from "../../models-3d/Floor";

const Scene = () => {
  const eyeRef = useRef()
  const maculaRef = useRef()
  const { camera } = useThree()
  const [message, setMessage] = useState(null)
  const [target, setTarget] = useState(null)


  // Smooth camera movement
  useFrame(() => {
    if (target) {
      camera.position.lerp(target, 0.05)
      camera.lookAt(0, 0, 0)
    }
  })

  const handleEyeClick = () => {
    const targetPos = eyeRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2))
    setMessage("Vista superficial del ojo.")
    setTarget(targetPos)
  }

  const handleMaculaClick = () => {
    const targetPos = maculaRef.current.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 2))
    setMessage("Vista interior para mejor panorama de la mácula.")
    setTarget(targetPos)
  }

  return (
    <>
      {/* Floating title */}
      <Html position={[0, 1, -2]} center distanceFactor={8} wrapperClass="title">
        <h1>Vista lateral de la mácula</h1>
      </Html>

      {/* Eye model */}
      <group ref={eyeRef} position={[-0.6, 0, 1]} onClick={handleEyeClick}>
        <Eye scale={[0.5, 0.5, 0.5]} />
      </group>

      {/* Macula model */}
      <group ref={maculaRef} position={[0.6, 0, 1]} onClick={handleMaculaClick}>
        <Macula scale={[0.5, 0.5, 0.5]} />
      </group>

      {/* Floating message */}
      {message && (
        <Html position={[0, -1, 0]} center distanceFactor={6}>
          <div className="mensaje-info">{message}</div>
        </Html>
      )}

      <Staging />
      <Floor />
    </>
  )
}

const SectionTwoM = () => {
  return (
    <div className="model-container">
        <Canvas>
            <Lights />
            <OrbitControls enablePan={false}  maxDistance={4} minDistance={1.5}/>
            <Scene />
        </Canvas>
    </div>
  )
}

export default SectionTwoM;
