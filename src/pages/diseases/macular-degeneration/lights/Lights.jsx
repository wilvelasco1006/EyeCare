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
        ref={pointLightRef}
        color={"blue"}
        position={[0, 5, 5]}
        intensity={100}
        />
      <ambientLight intensity={1}/>
      <directionalLight 
      // ref={directionalLightRef}
      color={"white"} 
      position={[0, 5, 5]} 
      intensity={4} 
      castShadow={true}
      />
    </>
  )
}

export default Lights;
