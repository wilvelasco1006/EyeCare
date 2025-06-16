/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TowelModel(props) {
    const { nodes, materials } = useGLTF('https://res.cloudinary.com/dbxvkqv6w/image/upload/v1750026044/towel_yqhvzx.glb')
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.13}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.Serviette}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.Serviette_2}
                />
            </group>
        </group>
    )
}

useGLTF.preload('https://res.cloudinary.com/dbxvkqv6w/image/upload/v1750026044/towel_yqhvzx.glb')