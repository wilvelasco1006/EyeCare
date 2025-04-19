import { useGLTF } from '@react-three/drei'


export function MacularModel (props) {
  const { nodes, materials } = useGLTF('/models-3d/MacularDegeneration.glb');

  
  return (
    <group {...props} dispose={null}>
      <mesh 
      geometry={nodes.MacularDegeneration.geometry} 
      material={materials.MacularMaterial} 
      castShadow
      />
    </group>
  )
}

useGLTF.preload('/models-3d/MacularDegeneration.glb');
