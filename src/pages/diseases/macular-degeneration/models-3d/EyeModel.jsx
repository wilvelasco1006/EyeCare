import { useGLTF } from '@react-three/drei'

//Component for the Eye model
export function Eye (props) {
  const { nodes, materials } = useGLTF('/models-3d/macularDegeneration/Eye.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cornea"
          castShadow
          receiveShadow
          geometry={nodes.Cornea.geometry}
          material={materials.CorneaMaterial}
        />
        <mesh
          name="Eye"
          castShadow
          receiveShadow
          geometry={nodes.Eye.geometry}
          material={materials.EyeMaterial}
          morphTargetDictionary={nodes.Eye.morphTargetDictionary}
          morphTargetInfluences={nodes.Eye.morphTargetInfluences}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/macularDegeneration/Eye.glb')


