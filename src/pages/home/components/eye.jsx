/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function EyeModel(props) {
  const { nodes, materials } = useGLTF('/models-3d/home/ojo_glb.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.001, -0.003, -0.085]} rotation={[1.54, -0.919, 0.028]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.material_1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.material_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.material_3}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/home/ojo_glb.glb')