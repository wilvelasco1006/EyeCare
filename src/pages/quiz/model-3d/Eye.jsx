// src/components/quiz/Eye.jsx
/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';

export const Eye = ({ position, onScore }) => {
    const hasScored = useRef(false);

    const handleCollision = (event) => {
        if (!hasScored.current) {
            hasScored.current = true;
            onScore?.(); // Llama a pointQuiz desde el padre
        }
    };

    return (
        <RigidBody colliders="ball" restitution={0.6} onCollisionEnter={handleCollision}>
            <mesh position={position}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="white" />
                <mesh position={[0.1, 0.1, 0.2]}>
                    <sphereGeometry args={[0.1, 32, 32]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            </mesh>
        </RigidBody>
    );
};