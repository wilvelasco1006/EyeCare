// src/components/quiz/HeartFragment.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { RigidBody } from '@react-three/rapier';

export const HeartFragment = ({ position, velocity }) => (
    <RigidBody
        colliders="ball"
        restitution={0.3}
        friction={0.7}
        linearVelocity={velocity}
        angularVelocity={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ]}
    >
        <mesh position={position}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#cc0000" />
        </mesh>
    </RigidBody>
);