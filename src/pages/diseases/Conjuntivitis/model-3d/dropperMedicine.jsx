/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CajaMedicamento(props) {
    const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/dropper-medicine.glb')
    return (
        <mesh
            {...props}
            castShadow
            receiveShadow
            geometry={nodes.Box.geometry}
            material={materials.etiqueta}
            scale={0.409}
        />
    )
}

export function Gotero(props) {
    const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/dropper-medicine.glb')
    return (
        <group {...props} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Etiqueta.geometry} material={materials.Wall_paper} castShadow receiveShadow/>
            <mesh geometry={nodes.Gotero.geometry} material={materials.Basic_glass} castShadow receiveShadow/>
            <mesh geometry={nodes.Inferior.geometry} material={materials.Dense_Glass} castShadow receiveShadow/>
            <mesh geometry={nodes.Interior.geometry} material={materials.Glass} castShadow receiveShadow/>
            <mesh geometry={nodes.Tapa.geometry} material={materials.Glass} castShadow receiveShadow/>
            <mesh geometry={nodes.TapaDown.geometry} material={materials.Rubber} castShadow receiveShadow/>
            <mesh geometry={nodes.TapaUp.geometry} material={materials.Elastic_Rubber} castShadow receiveShadow/>
        </group>
    )
}

useGLTF.preload('/models-3d/conjuntivitis/dropper-medicine.glb')