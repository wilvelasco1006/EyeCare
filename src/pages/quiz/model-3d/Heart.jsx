/* eslint-disable react/no-unknown-property */
/** eslint-disable react/no-unknown-property **/
import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { HeartFragment } from './HeartFragment';

export function Heart({ position, isBroken, heartIndex }) {
    const { nodes, materials } = useGLTF('https://res.cloudinary.com/dijh9two4/image/upload/v1750602556/heart_emoji_xcqexd.glb');
    const [fragments, setFragments] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    // Maneja la rotura
    useEffect(() => {
        if (isBroken && isVisible) {
            const newFragments = [];
            for (let i = 0; i < 8; i++) {
                newFragments.push({
                    id: `${heartIndex}-fragment-${i}`,
                    position: [
                        position[0] + (Math.random() - 0.5) * 0.3,
                        position[1] + (Math.random() - 0.5) * 0.3,
                        position[2] + (Math.random() - 0.5) * 0.3
                    ],
                    velocity: [
                        (Math.random() - 0.5) * 6,
                        Math.random() * 4 + 2,
                        (Math.random() - 0.5) * 6
                    ]
                });
            }
            setFragments(newFragments);
            setIsVisible(false);
        }
    }, [isBroken, isVisible, position, heartIndex]);

    // Reinicia el corazón cuando isBroken vuelve a false
    useEffect(() => {
        if (!isBroken) {
            setIsVisible(true);
            setFragments([]);
        }
    }, [isBroken]);

    return (
        <>
            {isVisible && (
                <group position={position} dispose={null}>
                    {/* Intentar con ambos nodos Cube y Cube__0 */}
                    {nodes.Cube && nodes.Cube.geometry && (
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube.geometry}
                            material={materials['Scene_-_Root']}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={0.2}
                        />
                    )}
                    
                    {nodes.Cube__0 && nodes.Cube__0.geometry && (
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube__0.geometry}
                            material={materials['Scene_-_Root']}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={0.2} // Aumenté el scale significativamente
                        />
                    )}
                    
                    {/* También intentar con el nodo principal del corazón */}
                    {nodes.Heartfbx && nodes.Heartfbx.geometry && (
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Heartfbx.geometry}
                            material={materials['Scene_-_Root']}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={0.2}
                        />
                    )}
                </group>
            )}
            
            {/** Fragments when broken **/}
            {fragments.map((fragment) => (
                <HeartFragment
                    key={fragment.id}
                    position={fragment.position}
                    velocity={fragment.velocity}
                />
            ))}
        </>
    );
}

useGLTF.preload('https://res.cloudinary.com/dijh9two4/image/upload/v1750602556/heart_emoji_xcqexd.glb');