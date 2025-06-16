/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export function PillsModel({ onClick, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/macularDegeneration/Pills.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Pill1.geometry}
        material={materials.Pill1Material}
        castShadow
        receiveShadow
        onClick={onClick}
      />
      <mesh
        geometry={nodes.Pill12.geometry}
        material={materials['Pill1.2Material']}
        castShadow
        receiveShadow
        onClick={onClick}
      />
      <mesh
        geometry={nodes.Pill2.geometry}
        material={materials.Pill4Material}
        castShadow
        receiveShadow
        onClick={onClick}
      />
      <mesh
        geometry={nodes.Pill3.geometry}
        material={materials.Pill3Material}
        castShadow
        receiveShadow
        onClick={onClick}
      />
      <mesh
        geometry={nodes.Pill4.geometry}
        material={materials.Pill4Material}
        castShadow
        receiveShadow
        onClick={onClick}
      />
      <mesh
        geometry={nodes.Pill5.geometry}
        material={materials.Pill5Material}
        castShadow
        receiveShadow
        onClick={onClick}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/macularDegeneration/Pills.glb')
