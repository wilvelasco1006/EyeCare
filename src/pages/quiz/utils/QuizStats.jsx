// src/components/quiz/QuizStats.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Text } from '@react-three/drei';

export const QuizStats = ({ quiz, lives }) => (
    <group position={[-6, 2, 0]}>
        <Text position={[0, 1, 0]} fontSize={0.25} color="#374151" textAlign="center">
            Estadísticas
        </Text>
        <Text position={[0, 0.6, 0]} fontSize={0.2} color="#059669" textAlign="center">
            Puntos: {quiz.points}
        </Text>
        <Text position={[0, 0.3, 0]} fontSize={0.2} color="#3b82f6" textAlign="center">
            Progreso: {quiz.percentageQuizCompleted}%
        </Text>
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