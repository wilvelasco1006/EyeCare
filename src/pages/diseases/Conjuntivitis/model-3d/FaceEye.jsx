/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function FaceEye(props) {
    const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/face-eye.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eye.geometry}
                material={materials.EyeYellow}
                position={[-0.003, 0.063, -0.104]}
                rotation={[-1.641, -0.007, 0.104]}
                scale={0.145}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.EyeBrow.geometry}
                material={materials.Eyebrows}
                position={[-0.24, -0.287, -0.432]}
                scale={10}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eyelashes.geometry}
                material={materials.EyeLashes}
                position={[-0.24, -0.201, -0.305]}
                scale={9.948}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Eyelashes001.geometry}
                material={materials.EyeLashes}
                position={[-0.24, -0.201, -0.305]}
                scale={9.948}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Face.geometry}
                material={materials.Face}
                position={[-0.24, -0.223, -0.924]}
            />
        </group>
    )
}

useGLTF.preload('/models-3d/conjuntivitis/face-eye.glb')

export default FaceEye;