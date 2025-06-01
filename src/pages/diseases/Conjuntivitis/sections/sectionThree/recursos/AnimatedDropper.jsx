/** eslint-disable react/no-unknown-property **/
//* AnimatedDropper.js*
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Gotero } from '../../../model-3d/dropperMedicine';

const AnimatedDropper = ({ lookUp }) => {
    const meshRef = useRef();
    
    //* Posiciones globales del gotero*
    const initialPosition = new THREE.Vector3(-2, -0.2, 1.8);
    const targetPosition = new THREE.Vector3(0.2, 1.4, 2.1);

    useFrame(() => {
        if (!meshRef.current) return;

        //* Mover el gotero hacia su destino más lento*
        meshRef.current.position.lerp(
            lookUp ? targetPosition : initialPosition,
            0.06 //* Movimiento más lento*
        );

        //* Inclinación suave y más pronunciada hacia adelante*
        const targetTilt = lookUp ? -1.5 : 0; //* Más inclinación hacia adelante*
        const currentTilt = meshRef.current.rotation.x;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(currentTilt, targetTilt, 0.03); //* Transición suave*
    });

    return (
        <group ref={meshRef}>
            <Gotero scale={0.9} />
        </group>
    );
};

export default AnimatedDropper;