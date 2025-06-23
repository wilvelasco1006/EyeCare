import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Hospital(props) {
    const { nodes, materials } = useGLTF('/models-3d/cataracts/low_poly_hospital.glb');
    const groupRef = useRef();

    // Opcionalmente, permitir deshabilitar la animación a través de props
    const { animate = true, animationSpeed = 0.5, animationIntensity = 0.0005, ...otherProps } = props;

    // Animación de flotación
    useFrame((state) => {
        if (groupRef.current && animate) {
            // Movimiento vertical suave de flotación
            const originalY = groupRef.current.position.y || 0;
            const baseY = originalY - (Math.sin(state.clock.getElapsedTime() * 0) * 0); // Para obtener la posición base sin el seno

            // Aplicar el efecto de flotación
            groupRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * animationSpeed) * animationIntensity;

            // Opcional: añadir una ligera rotación para un efecto más natural
            // groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.03;
        }
    });

    return (
        <group ref={groupRef} {...otherProps} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group
                        name="af504e8fc9d54852af2b85e49c63d33efbx"
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={0.01}>
                        <group name="RootNode">
                            <group name="(base)_hospital" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                <mesh
                                    name="(base)_hospital_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes['(base)_hospital_Colore_0'].geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube025"
                                position={[0, 212.31, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube025_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube025_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube035"
                                position={[0, 20, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube035_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube035_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube036"
                                position={[0, 1788.238, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube036_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube036_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube037"
                                position={[-1225.551, 1212.31, 789.348]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube037_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube037_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                                <mesh
                                    name="Cube037_Names_and_details_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube037_Names_and_details_0.geometry}
                                    material={materials.Names_and_details}
                                />
                            </group>
                            <group
                                name="Plane014"
                                position={[-13.787, 740, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Plane014_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane014_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Plane015"
                                position={[400, 369.648, 500]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Plane015_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane015_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Plane016"
                                position={[400, 369.648, 500]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Plane016_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane016_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cylinder009"
                                position={[1157.649, 437.612, 500]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cylinder009_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cylinder009_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Plane020"
                                position={[-1070.957, 1467.693, -532.923]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Plane020_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane020_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube056"
                                position={[-1004.915, 1467.693, -323.105]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube056_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube056_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube057"
                                position={[-1004.915, 1467.693, -323.105]}
                                rotation={[-Math.PI / 2, 0, 1.257]}
                                scale={100}>
                                <mesh
                                    name="Cube057_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube057_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Text"
                                position={[400, 761.97, 483.583]}
                                rotation={[0, Math.PI / 2, 0]}
                                scale={100}>
                                <mesh
                                    name="Text_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Text_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Plane023"
                                position={[-13.787, 1147.589, -1438.999]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Plane023_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Plane023_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube060"
                                position={[444.812, 20, 808.245]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube060_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube060_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube061"
                                position={[-592.082, 166.198, 1411.648]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube061_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube061_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Text001"
                                position={[-592.082, 202.084, 1423.937]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Text001_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Text001_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube062"
                                position={[-592.082, 166.198, 1411.648]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube062_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube062_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cube055"
                                position={[0, 20, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube055_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube055_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="frames"
                                position={[0, 20, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="frames_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.frames_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group name="vetri" position={[0, 20, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                <mesh
                                    name="vetri_Vetro_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.vetri_Vetro_0.geometry}
                                    material={materials.Vetro}
                                />
                                <mesh
                                    name="vetri_Vetro_alternate_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.vetri_Vetro_alternate_0.geometry}
                                    material={materials.Vetro_alternate}
                                />
                            </group>
                            <group
                                name="Cube058"
                                position={[0, 20, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cube058_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube058_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group name="Cube059" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                <mesh
                                    name="Cube059_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cube059_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                            <group
                                name="Cylinder019"
                                position={[761.804, 1112.31, -500]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={100}>
                                <mesh
                                    name="Cylinder019_Colore_0"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Cylinder019_Colore_0.geometry}
                                    material={materials.Colore}
                                />
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models-3d/cataracts/low_poly_hospital.glb');