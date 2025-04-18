import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function EyeCataractModel(props) {
  const { nodes, materials } = useGLTF("/models-3d/eye-cataract.glb"); // Ruta al modelo
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cataractEye.geometry}
        material={materials.EyeCataractMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.corneaEye.geometry}
        material={materials.CorneaCataractMaterial}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/eye-cataract.glb");
