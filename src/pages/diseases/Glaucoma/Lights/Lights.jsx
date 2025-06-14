/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, PointLightHelper } from 'three';


const Lights = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper)
    const pointLightRef = useRef();
    useHelper(pointLightRef, PointLightHelper, 2, "cyan")

  return (
    <>
      <pointLight
        // ref={pointLightRef}
        color={"black"}
        position={[0, 5, 5]}
        intensity={100}
        castShadow={true}
        />
      <ambientLight intensity={1}/>
      <directionalLight 
      // ref={directionalLightRef}
      color={"white"} 
      position={[0, 5, 5]} 
      intensity={5} 
      castShadow={true}
  
      />
      <hemisphereLight
          skyColor="#87CEEB" // Azul cielo
          groundColor="blue" // Azul para el suelo
          intensity={0.3}
      />
    </>
  )
}

export default Lights;
