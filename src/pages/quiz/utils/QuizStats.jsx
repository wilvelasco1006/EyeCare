// src/components/quiz/QuizStats.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Text } from '@react-three/drei';

export const QuizStats = ({ quiz, lives }) => {
    // Calcular el ancho de la barra de progreso basado en el porcentaje
    const progressWidth = (quiz.percentageQuizCompleted / 100) * 4; // 4 unidades de ancho total
    
    return (
        <group position={[-6, 2, 0]}>
            <Text position={[0, 1, 0]} fontSize={0.25} color="#374151" textAlign="center">
                Estadísticas
            </Text>
            <Text position={[0, 0.6, 0]} fontSize={0.2} color="#059669" textAlign="center">
                Puntos: {quiz.points}
            </Text>
            
            {/* Barra de progreso 3D */}
            <group position={[0, 0.3, 0]}>
                {/* Texto de progreso pequeño */}
                <Text position={[0, 0.2, 0]} fontSize={0.15} color="#3b82f6" textAlign="center">
                    Progreso: {quiz.percentageQuizCompleted}%
                </Text>
                
                {/* Barra de fondo (gris) */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4, 0.2, 0.1]} />
                    <meshStandardMaterial color="#e5e7eb" />
                </mesh>
                
                {/* Barra de progreso (azul) */}
                <mesh position={[-2 + (progressWidth / 2), 0, 0.05]}>
                    <boxGeometry args={[progressWidth, 0.2, 0.1]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
            </group>
            
            <Text position={[0, 0, 0]} fontSize={0.2} color="#059669" textAlign="center">
                Correctas: {quiz.correctAnswers}
            </Text>
            <Text position={[0, -0.3, 0]} fontSize={0.2} color="#dc2626" textAlign="center">
                Incorrectas: {quiz.incorrectAnswers}
            </Text>
            <Text position={[0, -0.6, 0]} fontSize={0.2} color="#dc2626" textAlign="center">
                Vidas: {lives}
            </Text>
        </group>
    );
};