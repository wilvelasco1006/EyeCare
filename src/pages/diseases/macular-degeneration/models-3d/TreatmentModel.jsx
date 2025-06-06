/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import React, { forwardRef } from "react";

export const TreatmentModel = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/models-3d/macularDegeneration/Treatment.glb");
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cover.geometry}
        material={materials.TreatmentMaterial}
        position={[-0.045, 0, 0.041]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Jar.geometry}
        material={materials.TreatmentMaterial}
        position={[-0.043, -0.002, 0.041]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Injection.geometry}
        material={materials.TreatmentMaterial}
        position={[-0.048, 0.016, -0.031]}
        rotation={[-0.017, 0.271, -0.431]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Antibiotic.geometry}
        material={materials.TreatmentMaterial}
        position={[-0.043, -0.001, 0.06]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.005}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Injection2.geometry}
        material={materials.TreatmentMaterial}
        position={[-0.048, 0.016, -0.031]}
        rotation={[-0.017, 0.271, -0.431]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Drops.geometry}
        material={materials.TreatmentMaterial}
        position={[0.038, -0.032, 0.076]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.005}
      />
    </group>
  );
});

useGLTF.preload("/models-3d/macularDegeneration/Treatment.glb");
