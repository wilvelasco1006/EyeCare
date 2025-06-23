// src/components/quiz/Eye.jsx
/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect } from 'react';
import { Text, useKeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

export const Eye = ({ position, onScore, isPlayerControlled = false, onCollideWithOption }) => {
    const rigidBodyRef = useRef();
    const hasScored = useRef(false);
    const [showPoints, setShowPoints] = useState(false);
    const pointsTextRef = useRef();
    const animationStartTime = useRef(0);
    const ANIMATION_DURATION = 1500; // 1.5 segundos de duración

    // Para control con teclas (solo si es controlado por el jugador)
    const [smoothedVelocity, setSmoothedVelocity] = useState({ x: 0, z: 0 });
    const moveSpeed = 15; // Velocidad de movimiento

    // Estado para rastrear colisiones con opciones
    const lastCollision = useRef(null);
    const collisionTimeout = useRef(null);

    // Brillo para cuando está activo/moviéndose
    const [emissiveIntensity, setEmissiveIntensity] = useState(0);
    const [isMoving, setIsMoving] = useState(false);

    // Control de teclado (solo si es controlado por el jugador)
    const [subscribeKeys, getKeys] = useKeyboardControls();

    // Animación del texto de puntos
    useFrame((state) => {
        // Manejar la animación de puntos
        if (showPoints && pointsTextRef.current) {
            const elapsed = Date.now() - animationStartTime.current;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

            pointsTextRef.current.position.y = 0.7 + progress * 1.5;

            if (pointsTextRef.current.material) {
                pointsTextRef.current.material.opacity = 1 - progress;
            }

            if (progress >= 1) {
                setShowPoints(false);
            }
        }

        // Controlar movimiento solo si es el ojo del jugador
        if (isPlayerControlled && rigidBodyRef.current) {
            const { forward, backward, left, right } = getKeys();

            // Calcular velocidad basada en entradas
            let targetVelX = 0;
            let targetVelZ = 0;

            if (forward) targetVelZ = -moveSpeed;
            if (backward) targetVelZ = moveSpeed;
            if (left) targetVelX = -moveSpeed;
            if (right) targetVelX = moveSpeed;

            // Aplicar suavizado a la velocidad
            setSmoothedVelocity(prev => ({
                x: prev.x + (targetVelX - prev.x) * 0.2,
                z: prev.z + (targetVelZ - prev.z) * 0.2
            }));

            // Aplicar impulso al rigidbody
            rigidBodyRef.current.applyImpulse({
                x: smoothedVelocity.x * state.delta,
                y: 0,
                z: smoothedVelocity.z * state.delta
            });

            // Detectar si está en movimiento para efecto visual
            const isCurrentlyMoving = Math.abs(smoothedVelocity.x) > 0.1 || Math.abs(smoothedVelocity.z) > 0.1;
            setIsMoving(isCurrentlyMoving);

            // Ajustar intensidad de emisión
            setEmissiveIntensity(
                isCurrentlyMoving ? 0.5 + Math.sin(state.clock.getElapsedTime() * 10) * 0.3 : 0
            );
        }
    });

    // Manejar colisiones
    const handleCollision = (event) => {
        // Verificar si es un ojo que debe puntuar o un ojo controlado por el jugador
        if (!isPlayerControlled) {
            // Comportamiento original para los ojos que caen
            if (!hasScored.current) {
                hasScored.current = true;
                setShowPoints(true);
                animationStartTime.current = Date.now();
                onScore?.();
            }
        } else {
            // Comportamiento para el ojo controlado por el jugador
            if (event.other.rigidBodyObject && event.other.rigidBodyObject.userData.isOptionBlock) {
                const optionId = event.other.rigidBodyObject.userData.optionId;

                // Evitar múltiples colisiones en poco tiempo
                if (lastCollision.current !== optionId) {
                    lastCollision.current = optionId;

                    // Informar al componente padre sobre la colisión
                    onCollideWithOption?.(optionId);

                    // Mostrar indicador visual de colisión
                    setShowPoints(true);
                    animationStartTime.current = Date.now();

                    // Limpiar el timeout previo si existe
                    if (collisionTimeout.current) clearTimeout(collisionTimeout.current);

                    // Resetear después de un tiempo para permitir nueva colisión
                    collisionTimeout.current = setTimeout(() => {
                        lastCollision.current = null;
                    }, 1000);
                }
            }
        }
    };

    return (
        <>
            <RigidBody
                ref={rigidBodyRef}
                position={position}
                colliders="ball"
                restitution={0.6}
                onCollisionEnter={handleCollision}
                friction={isPlayerControlled ? 0.7 : 0.1}
                linearDamping={isPlayerControlled ? 3 : 0.1}
                angularDamping={isPlayerControlled ? 0.5 : 0.1}
            >
                <mesh>
                    <sphereGeometry args={[isPlayerControlled ? 0.6 : 0.3, 32, 32]} /> {/* Ojo controlable más grande */}
                    <meshStandardMaterial
                        color={isPlayerControlled ? "#4b70ff" : "white"}
                        emissive={isPlayerControlled ? "#4b70ff" : "#ffffff"}
                        emissiveIntensity={isPlayerControlled ? emissiveIntensity : 0}
                        metalness={isPlayerControlled ? 0.8 : 0}
                        roughness={isPlayerControlled ? 0.2 : 0.7}
                    />

                    {/* La pupila solo para los ojos normales, no para el controlable */}
                    {!isPlayerControlled && (
                        <mesh position={[0.1, 0.1, 0.2]}>
                            <sphereGeometry args={[0.1, 32, 32]} />
                            <meshStandardMaterial color="black" />
                        </mesh>
                    )}
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
                    {isPlayerControlled ? "¡Seleccionado!" : "+100 puntos"}
                </Text>
            )}
        </>
    );
};