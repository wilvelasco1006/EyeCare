import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function EyeBlank(props) {
    const group = useRef();

    // Usamos la ruta simple que funciona en el código generado
    const { nodes, materials } = useGLTF("/models-3d/cataracts/eye-cataract.glb");

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <mesh
                    name="cataractEye"
                    castShadow
                    receiveShadow
                    geometry={nodes.cataractEye.geometry}
                    material={materials.EyeCataractMaterial}
                    userData={{ name: "cataractEye" }}
                />
                <mesh
                    name="corneaEye"
                    castShadow
                    receiveShadow
                    geometry={nodes.corneaEye.geometry}
                    material={materials.CorneaCataractMaterial}
                    userData={{ name: "corneaEye" }}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/models-3d/cataracts/eye-cataract.glb");
