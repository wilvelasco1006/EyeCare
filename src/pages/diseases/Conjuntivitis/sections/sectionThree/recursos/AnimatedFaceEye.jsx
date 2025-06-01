import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import FaceEye from '../../../model-3d/FaceEye'; // Ajusta la ruta si está en otro directorio

const AnimatedFaceEye = ({ lookUp, ...props }) => {
    const meshRef = useRef();
    
    const initialPosition = new THREE.Vector3(-1, 0.3, -1);
    const targetPosition = new THREE.Vector3(0, 0.5, 1.5);
    const initialRotation = new THREE.Euler(0, 0.5, 0);
    const targetRotation = new THREE.Euler(-Math.PI / 4, 0.5, 0);

    useFrame(() => {
        if (!meshRef.current) return;

        meshRef.current.position.lerp(
            lookUp ? targetPosition : initialPosition,
            0.05
        );

        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            lookUp ? targetRotation.x : initialRotation.x,
            0.05
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            lookUp ? targetRotation.y : initialRotation.y,
            0.05
        );
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
            meshRef.current.rotation.z,
            lookUp ? targetRotation.z : initialRotation.z,
            0.05
        );
    });

    return (
        <group ref={meshRef} onClick={props.onClick}>
            <FaceEye scale={2.8} />
        </group>
    );
};

export default AnimatedFaceEye;
