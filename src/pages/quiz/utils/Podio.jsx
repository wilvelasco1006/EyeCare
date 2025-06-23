/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Podio = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [showNames, setShowNames] = useState([false, false, false]); // Para mostrar nombre al colisionar

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Error ${response.status}: ${response.statusText}. Body: ${errorBody}`);
                }

                const data = await response.json();
                setQuizzes(data.sort((a, b) => b.points - a.points));
            } catch (error) {
                console.error("❌ Error al obtener los quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    const top3 = quizzes.slice(0, 3);

    // Handlers para mostrar nombre al colisionar
    const handleCollision = (idx) => () => {
        setShowNames((prev) => {
            const arr = [...prev];
            arr[idx] = true;
            return arr;
        });
        // Oculta el nombre después de 2 segundos
        setTimeout(() => {
            setShowNames((prev) => {
                const arr = [...prev];
                arr[idx] = false;
                return arr;
            });
        }, 2000);
    };

    return (
        <group position={[7, -1, 7]} rotation={[0, -1.5, 0]}>
            {/* 2do lugar */}
            <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={handleCollision(1)}>
                <mesh position={[-2, 0.5, 0]}>
                    <boxGeometry args={[2, 1, 2]} />
                    <meshStandardMaterial color="silver" />
                </mesh>
                {top3[1] && (
                    <>
                        <Text
                            position={[-2, 1.2, 1.1]}
                            fontSize={0.4}
                            color="#fff"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {top3[1].points} pts
                        </Text>
                        {showNames[1] && (
                            <Text
                                position={[-2, 1.7, 1.1]}
                                fontSize={0.35}
                                color="#fff"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight="bold"
                            >
                                {top3[1].user?.displayName || "Usuario"}
                            </Text>
                        )}
                    </>
                )}
            </RigidBody>

            {/* 1er lugar */}
            <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={handleCollision(0)}>
                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="gold" />
                </mesh>
                {top3[0] && (
                    <>
                        <Text
                            position={[0, 2.3, 1.1]}
                            fontSize={0.5}
                            color="#fff"
                            anchorX="center"
                            anchorY="middle"
                            fontWeight="bold"
                        >
                            {top3[0].points} pts
                        </Text>
                        {showNames[0] && (
                            <Text
                                position={[0, 2.9, 1.1]}
                                fontSize={0.4}
                                color="#fff"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight="bold"
                            >
                                {top3[0].user?.displayName || "Usuario"}
                            </Text>
                        )}
                    </>
                )}
            </RigidBody>

            {/* 3er lugar */}
            <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={handleCollision(2)}>
                <mesh position={[2, 0.25, 0]}>
                    <boxGeometry args={[2, 0.5, 2]} />
                    <meshStandardMaterial color="#cd7f32" />
                </mesh>
                {top3[2] && (
                    <>
                        <Text
                            position={[2, 0.8, 1.1]}
                            fontSize={0.35}
                            color="#fff"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {top3[2].points} pts
                        </Text>
                        {showNames[2] && (
                            <Text
                                position={[2, 1.3, 1.1]}
                                fontSize={0.3}
                                color="#fff"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight="bold"
                            >
                                {top3[2].user?.displayName || "Usuario"}
                            </Text>
                        )}
                    </>
                )}
            </RigidBody>
        </group>
    );
};

export default Podio;
