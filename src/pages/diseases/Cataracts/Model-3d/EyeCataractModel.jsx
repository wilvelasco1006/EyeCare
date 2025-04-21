import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function EyeCataractModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/cataracts/cataract-eye.glb"
  );
   // Ruta al modelo
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      actions["EyeControlAction"]?.setEffectiveTimeScale(0.8).play(); // Velocidad 0.8x
      actions["Eyeball.Action"]?.setEffectiveTimeScale(1.0).play(); // Velocidad normal
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="EyeControl"
          rotation={[0, -0.011, 0]}
          userData={{ name: "EyeControl" }}
        >
          <group name="Eyeball" userData={{ name: "Eyeball." }}>
            <mesh
              name="Eyeball_1"
              castShadow
              receiveShadow
              geometry={nodes.Eyeball_1.geometry}
              material={materials.EyeballMaterial}
              userData={{ name: "Eyeball" }}
            />
            <group name="Iris" userData={{ name: "Iris." }}>
              <mesh
                name="Iris_1"
                castShadow
                receiveShadow
                geometry={nodes.Iris_1.geometry}
                material={materials.IrisMaterial}
                userData={{ name: "Iris" }}
              />
            </group>
            <group name="Sclera" userData={{ name: "Sclera." }}>
              <mesh
                name="Sclera_1"
                castShadow
                receiveShadow
                geometry={nodes.Sclera_1.geometry}
                material={materials.ScleraMaterial}
                userData={{ name: "Sclera" }}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/cataracts/cataract-eye.glb");
