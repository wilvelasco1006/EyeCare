// src/components/quiz/QuizOptionBlock.jsx
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';

export const QuizOptionBlock = ({ position, label, optionText, isSelected, onClick, isCorrect, showResult }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    const getBlockColor = () => {
        if (showResult) {
            return isCorrect ? "#10b981" : isSelected ? "#ef4444" : "#6b7280";
        }
        return isSelected ? "#3b82f6" : hovered ? "#60a5fa" : "#4ade80";
    };

    return (
        <RigidBody type="fixed" colliders="cuboid">
            <mesh
                ref={meshRef}
                position={position}
                onPointerEnter={() => !showResult && setHovered(true)}
                onPointerLeave={() => !showResult && setHovered(false)}
                onClick={!showResult ? onClick : undefined}
                scale={isSelected ? [1.1, 1.1, 1.1] : [1, 1, 1]}
            >
                <boxGeometry args={[2.5, 0.8, 2.5]} />
                <meshStandardMaterial
                    color={getBlockColor()}
                    emissive={isSelected ? "#1e40af" : "#000000"}
                    emissiveIntensity={isSelected ? 0.2 : 0}
                />


                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.25}
                    color="black"
                    maxWidth={2}
                    textAlign="center"
                >
                    {optionText}
                </Text>

                {isSelected && !showResult && (
                    <mesh position={[0, 0.45, 0]}>
                        <ringGeometry args={[0.8, 1, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                    </mesh>
                )}

                {showResult && isCorrect && (
                    <Text
                        position={[0, -0.3, 0]}
                        fontSize={0.3}
                        color="white"
                    >
                        ✓
                    </Text>
                )}
                {showResult && isSelected && !isCorrect && (
                    <Text
                        position={[0, -0.3, 0]}
                        fontSize={0.3}
                        color="white"
                    >
                        ✗
                    </Text>
                )}
            </mesh>
        </RigidBody>
    );
};