// src/components/quiz/Eye.jsx
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export const Eye = ({ position, onScore }) => {
    const hasScored = useRef(false);
    const [showPoints, setShowPoints] = useState(false);
    const pointsTextRef = useRef();
    const animationStartTime = useRef(0);
    const ANIMATION_DURATION = 1500; // 1.5 segundos de duración

    // Animación del texto de puntos
    useFrame(() => {
        if (showPoints && pointsTextRef.current) {
            // Calcular progreso de la animación
            const elapsed = Date.now() - animationStartTime.current;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
            
            // Animar posición (mover hacia arriba)
            pointsTextRef.current.position.y = 0.7 + progress * 1.5;
            
            // Animar opacidad (desvanecer)
            if (pointsTextRef.current.material) {
                pointsTextRef.current.material.opacity = 1 - progress;
            }
            
            // Finalizar animación
            if (progress >= 1) {
                setShowPoints(false);
            }
        }
    });

    const handleCollision = (event) => {
        if (!hasScored.current) {
            // Marcar que ya puntuó con este ojo
            hasScored.current = true;
            
            // Mostrar animación de puntos
            setShowPoints(true);
            animationStartTime.current = Date.now();
            
            // Llamar a la función de puntuación del padre
            onScore?.();
        }
    };

    return (
        <>
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
            
            {/* Texto de puntos flotante */}
            {showPoints && (
                <Text
                    ref={pointsTextRef}
                    position={[position[0], position[1] + 0.7, position[2]]}
                    fontSize={0.3}
                    color="#4CAF50"
                    fontWeight="bold"
                    anchorX="center"
                    anchorY="middle"
                    transparent
                    opacity={1}
                >
                    +100 puntos
                </Text>
            )}
        </>
    );
};