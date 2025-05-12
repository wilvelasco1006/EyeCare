/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function EyeGlaucomaModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/glaucoma/eyeGlaucomaM.glb')
  const { actions } = useAnimations(animations, group)

/*
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.play()
      })
    }
  }, [actions])
*/  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="controlEye" rotation={[0.01, -0.004, -0.006]}>
          <mesh
            name="eye_low001"
            castShadow // El modelo proyectará sombras
            receiveShadow // El modelo recibirá sombras
            geometry={nodes.eye_low001.geometry}
            material={materials.Eye_material}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/glaucoma/eyeGlaucomaM.glb')

export default EyeGlaucomaModel;