/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function EyeHealthModel(props) {
  const { nodes, materials } = useGLTF('/models-3d/Conjuntivitis/health-eye.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Sclera.geometry} material={materials.Sclera} />
      <mesh castShadow receiveShadow geometry={nodes.Cornea.geometry} material={materials.Cornea} />
      <mesh castShadow receiveShadow geometry={nodes.Iris.geometry} material={materials.iris} />
    </group>
  )
}

useGLTF.preload('/models-3d/Conjuntivitis/health-eye.glb')