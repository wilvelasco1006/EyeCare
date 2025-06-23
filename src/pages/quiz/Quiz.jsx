// src/components/quiz/Quiz.jsx
/* eslint-disable react/no-unknown-property */
import React, { useState, useCallback, useRef, useEffect } from 'react'; // Añadir useEffect
import { Canvas, useFrame } from '@react-three/fiber'; // Añadir useFrame
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls, KeyboardControls, useKeyboardControls, Sky, Stars, Sparkles } from '@react-three/drei'; // Añadir useKeyboardControls

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
import Floor from './model-3d/Floor.jsx';
import Podio from './utils/Podio';

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

// Crear un componente para la bola controlable
const PlayerBall = ({ onCollideWithOption, showResult, isSubmitting }) => {
    const ballRef = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const [emissiveIntensity, setEmissiveIntensity] = useState(0.5);
    const [lastHitOptionId, setLastHitOptionId] = useState(null);

    // Estado para evitar múltiples colisiones
    const lastCollision = useRef(null);
    const collisionTimeout = useRef(null);

    // Manejar movimiento con teclas
    useFrame((state) => {
        if (!ballRef.current) return;

        // Despertar la física en cada frame
        ballRef.current.wakeUp();

        const { forward, backward, left, right } = getKeys();

        // Calcular dirección basada en entradas
        const impulse = { x: 0, y: 0, z: 0 };
        const moveSpeed = 0.1;

        if (forward) impulse.z = -moveSpeed;
        if (backward) impulse.z = moveSpeed;
        if (left) impulse.x = -moveSpeed;
        if (right) impulse.x = moveSpeed;

        // Aplicar impulso si hay movimiento
        if (impulse.x !== 0 || impulse.z !== 0) {
            ballRef.current.applyImpulse(impulse);
            // Efecto visual de brillo al moverse
            setEmissiveIntensity(0.5 + Math.sin(state.clock.getElapsedTime() * 10) * 0.3);
        }
    });

    // Manejar colisiones con bloques de opciones
    const handleCollision = (event) => {
        if (showResult || isSubmitting) return;

        // Verificar la posición del objeto con el que colisionamos
        const otherPosition = event.other.rigidBody?.translation();

        if (otherPosition) {
            // Aproximación por posición con coordenadas más precisas
            const optionPositions = {
                '-4': 'a',
                '-1.3': 'b',
                '1.3': 'c',
                '4': 'd'
            };

            // Imprimir posición de colisión para debugging
            //console.log("Posición de colisión:", otherPosition);

            // Encontrar la opción más cercana con umbral más estricto
            let closestOption = null;
            let minDistance = Infinity;

            Object.entries(optionPositions).forEach(([posX, optionId]) => {
                const distance = Math.abs(parseFloat(posX) - otherPosition.x);

                // Usar un umbral más pequeño para mayor precisión
                if (distance < minDistance && distance < 0.8) {
                    minDistance = distance;
                    closestOption = optionId;
                }
            });

            if (closestOption && lastHitOptionId !== closestOption) {
                console.log(`Colisión detectada con bloque: ${closestOption} (distancia: ${minDistance})`);
                setLastHitOptionId(closestOption);

                // Notificar al componente padre con un pequeño retraso para evitar selecciones erróneas
                setTimeout(() => {
                    onCollideWithOption(closestOption);
                }, 10);

                // Prevenir colisiones repetidas
                setTimeout(() => {
                    setLastHitOptionId(null);
                }, 1000);
            }
        }
    };

    return (
        <RigidBody
            ref={ballRef}
            position={[0, 1, 5]}
            colliders="ball"
            restitution={0.4} // Reducir de 0.6 a 0.4 para menos rebote
            friction={0.8} // Aumentar de 0.7 a 0.8 para más agarre
            linearDamping={2.0} // Aumentar de 1.0 a 2.0 para que frene más rápido
            angularDamping={0.1} // Aumentar de 0.5 a 0.8 para menos rotación
            onCollisionEnter={handleCollision}
            canSleep={false}
        >
            <mesh castShadow>
                {/* BOLA MÁS PEQUEÑA: Cambiar de 1 a 0.5 */}
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#4b70ff"
                    emissive="#4b70ff"
                    emissiveIntensity={emissiveIntensity}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </RigidBody>
    );
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
    const [showGameOver, setShowGameOver] = useState(false);

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
        setLives(prev => {
            const newLives = Math.max(0, prev - 1);
            if (newLives === 0) {
                setShowGameOver(true);
            }
            return newLives;
        });
    }, []);

    const handleNextQuestion = useCallback(() => {
        if (!currentQuestion) return;

        if (selectedOptionId === null) {
            alert("Por favor, selecciona una respuesta haciendo click en uno de los bloques.");
            return;
        }

        // IMPIDE CLICS MÚLTIPLES O RE-EJECUCIONES MIENTRAS SE PROCESA
        if (isSubmitting || showResult) return;

        setShowResult(true);
        setIsSubmitting(true);

        setTimeout(() => {
            if (selectedOptionId === currentQuestion.correctOptionId) {
                incrementCorrectAnswers();
                setEyesCount((prev) => prev + 1); // Solo suma ojo si es correcta
            } else {
                incrementIncorrectAnswers();
                breakNextHeart();
            }
            incrementQuizProgress();

            // Reset states first
            setSelectedOptionId(null);
            setShowResult(false);
            setIsSubmitting(false);

            // Then update question index or finish quiz
            if (currentQuestionIndex < quizQuestions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                setQuizFinished(true);
            }
        }, 2000);

    }, [selectedOptionId, currentQuestionIndex, currentQuestion, isSubmitting, showResult, incrementCorrectAnswers, incrementIncorrectAnswers, incrementQuizProgress, breakNextHeart]);

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
        setLives(3); // <-- Esto reinicia las vidas
        setShowGameOver(false);
    }, [clearQuiz]);

    // Define los controles
    const keyboardMap = [
        { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
        { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
        { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
        { name: 'right', keys: ['KeyD', 'ArrowRight'] },
        { name: 'next', keys: ['Enter'] },
        { name: 'reset', keys: ['KeyR'] } // Añadir esta línea
    ];

    // Callback para manejar colisiones con opciones
    const handleEyeCollideWithOption = useCallback((optionId) => {
        if (!showResult && !isSubmitting) {
            handleOptionClick(optionId);
        }
    }, [handleOptionClick, showResult, isSubmitting]);

    // Modificar la función handleEyeCollideWithOption para pasarla como prop
    const handleBallCollideWithOption = useCallback((optionId) => {
        if (!showResult && !isSubmitting) {
            handleOptionClick(optionId);
        }
    }, [handleOptionClick, showResult, isSubmitting]);

    
    const KeyboardHandler = ({ onEnterPress, onResetPress, isSubmitting, selectedOptionId }) => {
        const [subscribeKeys] = useKeyboardControls();

        useEffect(() => {
            // Manejar tecla Enter
            const unsubscribeNext = subscribeKeys(
                (state) => state.next,
                (pressed) => {
                    if (pressed && !isSubmitting && selectedOptionId !== null) {
                        onEnterPress();
                    }
                }
            );

            // Manejar tecla R para reiniciar
            const unsubscribeReset = subscribeKeys(
                (state) => state.reset,
                (pressed) => {
                    if (pressed) {
                        onResetPress();
                    }
                }
            );

            return () => {
                unsubscribeNext();
                unsubscribeReset();
            };
        }, [subscribeKeys, onEnterPress, onResetPress, isSubmitting, selectedOptionId]);

        return null; 
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <KeyboardControls map={keyboardMap}>
                <Canvas
                    camera={{ position: [0, 7, 16], fov: 60 }}
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

                        {/* Bloques de opciones - IMPORTANTE: Añadir optionId para detectar colisiones */}
                        {!quizFinished && currentQuestion && (
                            <>
                                <QuizOptionBlock
                                    position={[-4, -0.39, 0]}
                                    optionText={currentQuestion.options[0].text}
                                    isSelected={selectedOptionId === 'a'}
                                    onClick={() => handleOptionClick('a')}
                                    isCorrect={currentQuestion.correctOptionId === 'a'}
                                    showResult={showResult}
                                    optionId="a" // Añadir esta propiedad
                                />
                                <QuizOptionBlock
                                    position={[-1.3, -0.39, 0]}
                                    optionText={currentQuestion.options[1].text}
                                    isSelected={selectedOptionId === 'b'}
                                    onClick={() => handleOptionClick('b')}
                                    isCorrect={currentQuestion.correctOptionId === 'b'}
                                    showResult={showResult}
                                    optionId="b" // Añadir esta propiedad
                                />
                                <QuizOptionBlock
                                    position={[1.3, -0.39, 0]}
                                    optionText={currentQuestion.options[2].text}
                                    isSelected={selectedOptionId === 'c'}
                                    onClick={() => handleOptionClick('c')}
                                    isCorrect={currentQuestion.correctOptionId === 'c'}
                                    showResult={showResult}
                                    optionId="c" // Añadir esta propiedad
                                />
                                <QuizOptionBlock
                                    position={[4, -0.39, 0]}
                                    optionText={currentQuestion.options[3].text}
                                    isSelected={selectedOptionId === 'd'}
                                    onClick={() => handleOptionClick('d')}
                                    isCorrect={currentQuestion.correctOptionId === 'd'}
                                    showResult={showResult}
                                    optionId="d" // Añadir esta propiedad
                                />
                            </>
                        )}

                        {/* Ojos que caen (comportamiento original) */}
                        {[...Array(eyesCount)].map((_, i) => (
                            <Eye key={i} onScore={pointQuiz} position={[-8, 5 + i * 1.5, 0]} />
                        ))}

                        {/* Reemplazar la esfera de prueba con nuestro PlayerBall */}
                        {!quizFinished && (
                            <PlayerBall
                                onCollideWithOption={handleBallCollideWithOption}
                                showResult={showResult}
                                isSubmitting={isSubmitting}
                            />
                        )}

                        <Heart position={[-1, 5, 0]} isBroken={brokenHearts.includes(0)} heartIndex={0} />
                        <Heart position={[0, 5, 0]} isBroken={brokenHearts.includes(1)} heartIndex={1} />
                        <Heart position={[1, 5, 0]} isBroken={brokenHearts.includes(2)} heartIndex={2} />
                        <group scale={0.3} position={[-8, 1, 0]}>
                            {/* Paredes del bowl con colisionador */}
                            <RigidBody type="fixed" colliders="trimesh">
                                <mesh position={[0, -4.5, 0]} receiveShadow>
                                    {/* Paredes del bowl */}
                                    <cylinderGeometry args={[8, 8, 2, 64, 1, true]} />
                                    <meshStandardMaterial color="#d39be6" />
                                </mesh>
                                <mesh position={[0, -5.5, 0]} receiveShadow>
                                    {/* Fondo del bowl */}
                                    <cylinderGeometry args={[7.7, 7.7, 1, 64]} />
                                    <meshStandardMaterial color="#d39be6" />
                                </mesh>
                            </RigidBody>
                            {/* Opcional: Borde superior solo visual, sin colisión */}
                            <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                <torusGeometry args={[8, 0.15, 16, 100]} />
                                <meshStandardMaterial color="#c084d6" />
                            </mesh>
                        </group>


                        <Floor />
                        {/* Añadir esto dentro del Canvas pero fuera de Physics */}
                        <Podio />
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

                    

                    <KeyboardHandler
                        onEnterPress={handleNextQuestion}
                        onResetPress={handleRestartQuiz}
                        isSubmitting={isSubmitting}
                        selectedOptionId={selectedOptionId}
                    />
                    // añadir cielo oscuro y estrellas
                    <Sky sunPosition={[60, -10, 100]} />
                    <Stars />
                
                    <Sparkles
                        size={6} // Tamaño de las chispas
                        scale={[10, 10, 10]} // Escala de las chispas
                        position={[0, 1, 0]} // Posición de las chispas
                        speed={0.5} // Velocidad de las chispas
                        count={50} // Número de chispas
                    />

                </Canvas>
            </KeyboardControls>
            {quizFinished && (
                <QuizResultsOverlay
                    quiz={quiz}
                    lives={lives}
                    handleSaveQuizResults={handleSaveQuizResults}
                    handleRestartQuiz={handleRestartQuiz}
                    isSubmitting={isSubmitting}
                />
            )}
            {showGameOver && (
                <div className="game-over-modal" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '2rem 3rem',
                        borderRadius: '16px',
                        textAlign: 'center',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ color: '#d33' }}>Game Over</h2>
                        <p>Intenta de nuevo</p>
                        <button className="btn btn-primary" onClick={handleRestartQuiz}>
                            Reiniciar Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}