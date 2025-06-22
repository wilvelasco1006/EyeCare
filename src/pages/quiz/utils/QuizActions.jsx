// src/components/quiz/QuizActions.jsx
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Text } from '@react-three/drei';

export const QuizActions = ({ selectedOptionId, showResult, currentQuestionIndex, totalQuestions, handleNextQuestion, handleRestartQuiz }) => (
    <group position={[6, 1, 0]}>
        <mesh
            position={[0, 0.5, 0]}
            onClick={handleNextQuestion}
            onPointerEnter={(e) => e.object.material.color.setHex(0x2563eb)}
            onPointerLeave={(e) => e.object.material.color.setHex(selectedOptionId ? 0x3b82f6 : 0x9ca3af)}
        >
            <boxGeometry args={[2, 0.6, 0.3]} />
            <meshStandardMaterial
                color={selectedOptionId && !showResult ? 0x3b82f6 : 0x9ca3af}
            />
            <Text position={[0, 0, 0.16]} fontSize={0.15} color="white" textAlign="center">
                {showResult ? 'Procesando...' :
                    currentQuestionIndex === totalQuestions - 1 ? 'Finalizar' : 'Siguiente'}
            </Text>
        </mesh>

        <mesh
            position={[0, -0.5, 0]}
            onClick={handleRestartQuiz}
            onPointerEnter={(e) => e.object.material.color.setHex(0x4b5563)}
            onPointerLeave={(e) => e.object.material.color.setHex(0x6b7280)}
        >
            <boxGeometry args={[2, 0.6, 0.3]} />
            <meshStandardMaterial color={0x6b7280} />
            <Text position={[0, 0, 0.16]} fontSize={0.15} color="white" textAlign="center">
                Reiniciar
            </Text>
        </mesh>
    </group>
);