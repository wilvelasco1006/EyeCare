/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function HandModel(props) {
    const { nodes, materials } = useGLTF('https://res.cloudinary.com/dbxvkqv6w/image/upload/v1750026044/female_hand_piufq9.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials['default']}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload('https://res.cloudinary.com/dbxvkqv6w/image/upload/v1750026044/female_hand_piufq9.glb')

