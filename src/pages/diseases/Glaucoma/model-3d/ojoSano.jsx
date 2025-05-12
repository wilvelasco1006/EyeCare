/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function OjoSano(props) {
  const { nodes, materials } = useGLTF('/models-3d/glaucoma/OjoSano.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.eye_low001.geometry}
        material={materials.Eye_material}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/glaucoma/OjoSano.glb')
export default OjoSano;
