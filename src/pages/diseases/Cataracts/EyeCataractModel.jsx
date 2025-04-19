/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function EyeCataractModel (props) {
  const { nodes, materials } = useGLTF('/models-3d/eye-cataract-2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Eyeball_1.geometry}
        material={materials.EyeballMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Iris_1.geometry}
        material={materials.IrisMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sclera_1.geometry}
        material={materials.ScleraMaterial}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/eye-cataract-2.glb')