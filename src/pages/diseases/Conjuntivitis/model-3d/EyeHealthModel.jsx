/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function EyeHealthModel(props) {
  const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/health-eye.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Sclera.geometry} material={materials.Sclera} />
      <mesh castShadow geometry={nodes.Cornea.geometry} material={materials.Cornea} />
      <mesh castShadow geometry={nodes.Iris.geometry} material={materials.iris} />
    </group>
  )
}

useGLTF.preload('/models-3d/conjuntivitis/health-eye.glb')