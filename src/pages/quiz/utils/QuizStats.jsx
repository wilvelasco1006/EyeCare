// src/components/quiz/QuizStats.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Text } from '@react-three/drei';

export const QuizStats = ({ quiz, lives }) => {
    // Calcular el ancho de la barra de progreso basado en el porcentaje
    // Cambiado de 4 a 6 unidades para barra más ancha
    const progressBarWidth = (quiz.percentageQuizCompleted / 100) * 6; // 6 unidades de ancho total

    return (
        <group position={[-6, 2.5, 0]}>

            <Text position={[-3, 1.2, 0]} fontSize={0.3} color="#ffffff" fontWeight="bold" textAlign="center">
                Estadísticas
            </Text>

            {/* Puntos destacados */}
            <Text position={[-3, 0.6, 0]} fontSize={0.25} color="#f3f4f6" textAlign="center">
                Puntos: {quiz.points}
            </Text>

            {/* Barra de progreso 3D con mejor espaciado  */}
            <group position={[6, 4, 0]}>
                {/* Texto de progreso */}
                <Text position={[0, 0.4, 0]} fontSize={0.2} color="#ffffff" textAlign="center">
                    Progreso: {quiz.percentageQuizCompleted}%
                </Text>

                {/* Barra de fondo (gris) - MÁS ANCHA */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[6, 0.35, 0.1]} /> {/* Aumentado de 4 a 6 de ancho y de 0.25 a 0.35 de alto */}
                    <meshStandardMaterial color="#4b5563" />
                </mesh>

                {/* Barra de progreso (azul) - AJUSTADA A NUEVA ANCHURA */}
                <mesh position={[-3 + (progressBarWidth / 2), 0, 0.05]}>
                    <boxGeometry args={[progressBarWidth, 0.35, 0.1]} /> {/* Ajustado para nueva anchura */}
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
                </mesh>
            </group>

            {/* Estadísticas en dos columnas con mayor separación */}
            <group position={[-3, 0.2, 0]}>  {/* Aumentado separación vertical y horizontal */}
                <Text position={[0, 0, 0]} fontSize={0.22} color="#059669" textAlign="left">
                    Correctas: {quiz.correctAnswers}
                </Text>
            </group>

            <group position={[-3, -0.2, 0]}>  {/* Aumentado separación vertical y horizontal */}
                <Text position={[0, 0, 0]} fontSize={0.22} color="#dc2626" textAlign="right">
                    Incorrectas: {quiz.incorrectAnswers}
                </Text>
            </group>


            <group position={[0, -2.0, 0]}>  {/* Aumentado separación vertical */}
                <Text position={[-3, 1.2, 0]} fontSize={0.25} color="#ef4444" textAlign="center" fontWeight="bold">
                    Vidas: {lives}
                </Text>
            </group>
        </group>
    );
};