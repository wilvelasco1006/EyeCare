import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'

//Component for the Eye model
export function Eye (props) {
  const { nodes, materials } = useGLTF('/models-3d/macularDegeneration/Eye.glb')
  const { scene, animations } = useGLTF('/models-3d/macularDegeneration/Eye.glb')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions && actions['Watching']) {
      actions['Watching'].reset().play()
    }
  }, [actions])

  return (
    <>
      <pointLight position={[10, 10, 10]}/>
      <primitive object={scene} {...props} />
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
    </>
  )
}

useGLTF.preload('/models-3d/macularDegeneration/Eye.glb')


