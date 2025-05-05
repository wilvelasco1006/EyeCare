/* eslint-disable react/no-unknown-property */
/** eslint-disable react/no-unknown-property **/
/*
* Modified from auto-generated gltfjsx
*/
import React from 'react';
import { useGLTF } from '@react-three/drei';

// Healthy Eye Component
export function HealthyEye(props) {
  const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/eye-infected.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sclera.geometry}
        material={materials.Sclera}
        position={[-1.236, 0.256, 1.076]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Iris001.geometry}
        material={materials.Iris}
        position={[-2.362, 0.016, 0.176]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cornea001.geometry}
        material={materials.Cornea}
        position={[-2.403, 0.023, 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.134}
      />
    </group>
  );
}

// Infected Eye Component
export function InfectedEye(props) {
  const { nodes, materials } = useGLTF('/models-3d/conjuntivitis/eye-infected.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ScleraInfected.geometry}
        material={materials.ScleraInfected}
        position={[1.167, 0.232, 0.877]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Iris.geometry}
        material={materials.Iris}
        position={[0.041, -0.007, -0.024]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cornea.geometry}
        material={materials.Cornea}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.134}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models-3d/conjuntivitis/eye-infected.glb');

export default { HealthyEye, InfectedEye };