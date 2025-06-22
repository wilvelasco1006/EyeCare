// src/components/quiz/Quiz.jsx
/* eslint-disable react/no-unknown-property */
import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth-store';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

// Import refactored components
import { quizQuestions } from './utils/quizQuestion';
import { QuizOptionBlock } from './utils/QuizOptionBlock';
import { Eye } from './model-3d/Eye';
import { Heart } from './model-3d/Heart.jsx';
import { QuestionText3D } from './utils/QuestionText3D';
import { QuizStats } from './utils/QuizStats';
import { QuizActions } from './utils/QuizActions';
import { QuizResultsOverlay } from './utils/QuizResultsOverlay';

// API function for quiz results (can be moved to a separate service file if it grows)
const createQuizData = async (quizResultsData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizResultsData),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText}. Body: ${errorBody}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al guardar los datos del quiz:", error);
        throw error;
    }
};

export default function Quiz() {
    const {
        quiz,
        incrementQuizProgress,
        clearQuiz,
        pointQuiz,
        incrementCorrectAnswers,
        incrementIncorrectAnswers
    } = useQuizStore();
    const { userLooged } = useAuthStore();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eyesCount, setEyesCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [brokenHearts, setBrokenHearts] = useState([]);
    const [lives, setLives] = useState(3);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleOptionClick = useCallback((optionId) => {
        if (showResult) return;
        setSelectedOptionId(optionId);
    }, [showResult]);

    const breakNextHeart = useCallback(() => {
        setBrokenHearts(prev => {
            const nextHeartIndex = prev.length;
            if (nextHeartIndex < 3) {
                return [...prev, nextHeartIndex];
            }
            return prev;
        });
        setLives(prev => Math.max(0, prev - 1));
    }, []);

    const handleNextQuestion = useCallback(() => {
        if (!currentQuestion) return;

        if (selectedOptionId === null) {
            alert("Por favor, selecciona una respuesta haciendo click en uno de los bloques.");
            return;
        }

        setShowResult(true);

        setTimeout(() => {
            setEyesCount((prev) => prev + 1);

            if (selectedOptionId === currentQuestion.correctOptionId) {
                pointQuiz();
                incrementCorrectAnswers();
            } else {
                incrementIncorrectAnswers();
                breakNextHeart();
            }
            incrementQuizProgress();
            setSelectedOptionId(null);
            setShowResult(false);

            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                setQuizFinished(true);
            }
        }, 2000);

    }, [selectedOptionId, currentQuestionIndex, pointQuiz, incrementCorrectAnswers, incrementIncorrectAnswers, incrementQuizProgress, currentQuestion, breakNextHeart]);

    const handleSaveQuizResults = useCallback(async () => {
        setIsSubmitting(true);
        const quizResultsData = {
            points: quiz.points,
            correctAnswers: quiz.correctAnswers,
            incorrectAnswers: quiz.incorrectAnswers,
            percentageQuizCompleted: quiz.percentageQuizCompleted,
            userID: userLooged ? userLooged.uid : null,
        };
        try {
            const savedQuiz = await createQuizData(quizResultsData);
            alert("¡Resultados del quiz guardados!");
        } catch (error) {
            alert(`Error al guardar los resultados: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    }, [quiz, userLooged]);

    const handleRestartQuiz = useCallback(() => {
        clearQuiz();
        setCurrentQuestionIndex(0);
        setSelectedOptionId(null);
        setQuizFinished(false);
        setIsSubmitting(false);
        setEyesCount(0);
        setShowResult(false);
        setBrokenHearts([]);
        setLives(3);
    }, [clearQuiz]);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <Canvas
                camera={{ position: [0, 5, 12], fov: 60 }}
                shadows
                style={{ width: '100%', height: '100%' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
                <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />

                {!quizFinished && currentQuestion && (
                    <QuestionText3D
                        question={currentQuestion.text}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={quizQuestions.length}
                    />
                )}

                <Physics gravity={[0, -9.81, 0]}>
                    <RigidBody type="fixed" colliders="cuboid">
                        <mesh position={[0, -5, 0]} visible={false}>
                            <boxGeometry args={[20, 0.1, 20]} />
                            <meshStandardMaterial transparent opacity={0} />
                        </mesh>
                    </RigidBody>

                    {!quizFinished && currentQuestion && (
                        <>
                            <QuizOptionBlock
                                position={[-4, 0, 0]}
                                label="A"
                                optionText={currentQuestion.options[0].text}
                                isSelected={selectedOptionId === 'a'}
                                onClick={() => handleOptionClick('a')}
                                isCorrect={currentQuestion.correctOptionId === 'a'}
                                showResult={showResult}
                            />
                            <QuizOptionBlock
                                position={[-1.3, 0, 0]}
                                label="B"
                                optionText={currentQuestion.options[1].text}
                                isSelected={selectedOptionId === 'b'}
                                onClick={() => handleOptionClick('b')}
                                isCorrect={currentQuestion.correctOptionId === 'b'}
                                showResult={showResult}
                            />
                            <QuizOptionBlock
                                position={[1.3, 0, 0]}
                                label="C"
                                optionText={currentQuestion.options[2].text}
                                isSelected={selectedOptionId === 'c'}
                                onClick={() => handleOptionClick('c')}
                                isCorrect={currentQuestion.correctOptionId === 'c'}
                                showResult={showResult}
                            />
                            <QuizOptionBlock
                                position={[4, 0, 0]}
                                label="D"
                                optionText={currentQuestion.options[3].text}
                                isSelected={selectedOptionId === 'd'}
                                onClick={() => handleOptionClick('d')}
                                isCorrect={currentQuestion.correctOptionId === 'd'}
                                showResult={showResult}
                            />
                        </>
                    )}

                    {[...Array(eyesCount)].map((_, i) => (
                        <Eye key={i} position={[-8, 5 + i * 1.5, 0]} />
                    ))}
                    <Heart position={[-2, 4, -2]} isBroken={brokenHearts.includes(0)} heartIndex={0} />
                    <Heart position={[0, 4.5, -2]} isBroken={brokenHearts.includes(1)} heartIndex={1} />
                    <Heart position={[2, 4, -2]} isBroken={brokenHearts.includes(2)} heartIndex={2} />
                </Physics>

                {!quizFinished && (
                    <QuizStats quiz={quiz} lives={lives} />
                )}

                {!quizFinished && (
                    <QuizActions
                        selectedOptionId={selectedOptionId}
                        showResult={showResult}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={quizQuestions.length}
                        handleNextQuestion={handleNextQuestion}
                        handleRestartQuiz={handleRestartQuiz}
                    />
                )}
            </Canvas>

            {quizFinished && (
                <QuizResultsOverlay
                    quiz={quiz}
                    lives={lives}
                    handleSaveQuizResults={handleSaveQuizResults}
                    handleRestartQuiz={handleRestartQuiz}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}