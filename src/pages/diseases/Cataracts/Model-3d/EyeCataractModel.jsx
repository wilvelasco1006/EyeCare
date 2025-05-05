import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export const EyeCataractModel = React.forwardRef(
  ({ animationSpeed = 1, setHoverMessage, ...props }, ref) => {
    const group = useRef();
    // Asignamos el ref externo al grupo
    React.useImperativeHandle(ref, () => group.current);

    const { nodes, materials, animations } = useGLTF(
      "/models-3d/cataracts/cataract-eye.glb"
    );
    const { actions, mixer } = useAnimations(animations, group);

    // Efecto para controlar la animación según la velocidad
    useEffect(() => {
      if (actions && mixer) {
        // Detenemos las animaciones actuales
        mixer.stopAllAction();

        if (animationSpeed > 0) {
          // Si la velocidad es mayor que 0, reproducimos las animaciones con la nueva velocidad
          const eyeControlAction = actions["EyeControlAction"];
          const eyeballAction = actions["Eyeball.Action"];

          if (eyeControlAction) {
            eyeControlAction
              .reset()
              .setEffectiveTimeScale(animationSpeed)
              .play();
          }

          if (eyeballAction) {
            eyeballAction.reset().setEffectiveTimeScale(animationSpeed).play();
          }
        }
        // Si animationSpeed es 0, no reproducimos ninguna animación (pausa)
      }

      // Limpieza al desmontar o cambiar de velocidad
      return () => {
        if (mixer) {
          // No detenemos las animaciones aquí para permitir cambios de velocidad suaves
        }
      };
    }, [actions, animationSpeed, mixer]);

    return (
      <group
        ref={group}
        {...props}
        dispose={null}
        onPointerOver={() =>
          setHoverMessage(
            "Usa la rueda del mouse para acercar y alejar y click izquierdo para rotar"
          )
        }
        onPointerOut={() => setHoverMessage("")}
      >
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
);

useGLTF.preload("/models-3d/cataracts/cataract-eye.glb");
