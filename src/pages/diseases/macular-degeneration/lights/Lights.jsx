import { useRef } from 'react'
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';


const Lights = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper)
  return (
    <>
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
