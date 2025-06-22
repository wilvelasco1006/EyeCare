// src/components/quiz/QuestionText3D.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Text } from '@react-three/drei';

export const QuestionText3D = ({ question, questionNumber, totalQuestions }) => (
    <group position={[0, 3, 0]}>
        <Text
            position={[0, 1.5, 0]}
            fontSize={0.4}
            color="#667eea"
            fontWeight="bold"
            textAlign="center"
        >
            Pregunta {questionNumber} de {totalQuestions}
        </Text>

        <Text
            position={[0, 0.8, 0]}
            fontSize={0.35}
            color="#1f2937"
            fontWeight="600"
            textAlign="center"
            maxWidth={8}
            lineHeight={1.2}
        >
            {question}
        </Text>

        <Text
            position={[0, 0.2, 0]}
            fontSize={0.25}
            color="#3b82f6"
            textAlign="center"
            maxWidth={6}
        >
            💡 Haz click en los bloques para seleccionar tu respuesta
        </Text>
    </group>
);