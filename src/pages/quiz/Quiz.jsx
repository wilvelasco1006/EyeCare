import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../../stores/use-quiz-store';
import useAuthStore from '../../stores/use-auth-store'; // Para asociar el quiz al usuario

// Definición de preguntas
const quizQuestions = [
    {
        id: 1,
        text: "¿Cuál es la capital de Francia?",
        options: [
            { id: 'a', text: "Berlín" },
            { id: 'b', text: "Madrid" },
            { id: 'c', text: "París" },
            { id: 'd', text: "Roma" }
        ],
        correctOptionId: 'c'
    },
    {
        id: 2,
        text: "¿Qué gas es esencial para la respiración humana?",
        options: [
            { id: 'a', text: "Nitrógeno" },
            { id: 'b', text: "Oxígeno" },
            { id: 'c', text: "Dióxido de Carbono" },
            { id: 'd', text: "Hidrógeno" }
        ],
        correctOptionId: 'b'
    },
    {
        id: 3,
        text: "¿Cuántos continentes hay en la Tierra (modelo tradicional de 7)?",
        options: [
            { id: 'a', text: "5" },
            { id: 'b', text: "6" },
            { id: 'c', text: "7" },
            { id: 'd', text: "8" }
        ],
        correctOptionId: 'c'
    },
    {
        id: 4,
        text: "¿Cuál es el río más largo del mundo?",
        options: [
            { id: 'a', text: "Nilo" },
            { id: 'b', text: "Amazonas" },
            { id: 'c', text: "Yangtsé" },
            { id: 'd', text: "Misisipi" }
        ],
        correctOptionId: 'b'
    },
    // Añade más preguntas para un quiz más completo
];

// Función para enviar los datos del quiz al backend
const createQuizData = async (quizResultsData) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, // Asegúrate que esta URL sea correcta
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quizResultsData),
            }
        );
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


const Quiz = () => {
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
    const [isSubmitting, setIsSubmitting] = useState(false); // Para deshabilitar botón mientras se guarda

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleOptionChange = (event) => {
        setSelectedOptionId(event.target.value);
    };

    const handleNextQuestion = useCallback(() => {
        if (!currentQuestion) return; // No hacer nada si no hay pregunta actual

        if (selectedOptionId === null) {
            alert("Por favor, selecciona una respuesta.");
            return;
        }

        if (selectedOptionId === currentQuestion.correctOptionId) {
            pointQuiz();
            incrementCorrectAnswers();
        } else {
            incrementIncorrectAnswers();
        }
        incrementQuizProgress();

        setSelectedOptionId(null);

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizFinished(true);
        }
    }, [
        selectedOptionId,
        currentQuestionIndex,
        pointQuiz,
        incrementCorrectAnswers,
        incrementIncorrectAnswers,
        incrementQuizProgress,
        currentQuestion
    ]);

    const handleSaveQuizResults = useCallback(async () => {
        setIsSubmitting(true);
        const quizResultsData = {
            points: quiz.points,
            correctAnswers: quiz.correctAnswers,
            incorrectAnswers: quiz.incorrectAnswers,
            percentageQuizCompleted: quiz.percentageQuizCompleted,
            userID: userLooged ? userLooged.uid : null,
            
            // completedAt: new Date().toISOString(), // Opcional, si el backend no lo genera
        };

        console.log("Preparando para guardar resultados del quiz:", quizResultsData);
        console.log("Usuario logueado:", userLooged);
        try {
            const savedQuiz = await createQuizData(quizResultsData);
            console.log("Resultados del quiz guardados exitosamente:", savedQuiz);
            alert("¡Resultados del quiz guardados!");
            // No se limpia el quiz aquí para que el usuario vea los resultados.
            // Se limpiará al reiniciar o al navegar a otra parte.
            // clearQuiz(); 
            // navigate('/quiz-summary'); // Opcional: redirigir
        } catch (error) {
            console.error("Fallo al guardar los resultados del quiz en el componente:", error.message);
            alert(`Error al guardar los resultados: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    }, [quiz, userLooged /*, navigate, clearQuiz */]); // Dependencias ajustadas

    const handleRestartQuiz = useCallback(() => {
        clearQuiz();
        setCurrentQuestionIndex(0);
        setSelectedOptionId(null);
        setQuizFinished(false);
        setIsSubmitting(false);
    }, [clearQuiz]);

    if (quizFinished) {
        return (
            <div className="Quiz">
                <h1>Quiz Finalizado</h1>
                <h3>Resultados:</h3>
                <p>Puntos Totales: <span>{quiz.points}</span></p>
                <p>Respuestas Correctas: <span>{quiz.correctAnswers}</span></p>
                <p>Respuestas Incorrectas: <span>{quiz.incorrectAnswers}</span></p>
                <p>Progreso Completado: <span>{quiz.percentageQuizCompleted}%</span></p>
                <button onClick={handleSaveQuizResults} disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Resultados"}
                </button>
                <button onClick={handleRestartQuiz} style={{ marginLeft: '10px' }}>Reiniciar Quiz</button>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="Quiz">
                <p>No hay más preguntas o el quiz ha terminado.</p>
                <button onClick={handleRestartQuiz}>Reiniciar Quiz</button>
            </div>
        );
    }

    return (
        <div className="Quiz">
            <h1>Quiz Interactivo</h1>
            <div>
                <h2>Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}:</h2>
                <p>{currentQuestion.text}</p>

                <form>
                    {currentQuestion.options.map(option => (
                        <div key={option.id}>
                            <input
                                type="radio"
                                id={`${currentQuestion.id}-${option.id}`}
                                name={`question-${currentQuestion.id}`}
                                value={option.id}
                                checked={selectedOptionId === option.id}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={`${currentQuestion.id}-${option.id}`}> {option.text}</label>
                        </div>
                    ))}
                </form>
            </div>

            <button onClick={handleNextQuestion} style={{ marginTop: '10px' }} disabled={!selectedOptionId}>
                Siguiente Pregunta
            </button>

            <div style={{ marginTop: '20px' }}>
                <h3>Estado Actual:</h3>
                <p>Puntos: <span>{quiz.points}</span></p>
                <p>Progreso: <span>{quiz.percentageQuizCompleted}%</span></p>
                <p>Correctas: <span>{quiz.correctAnswers}</span></p>
                <p>Incorrectas: <span>{quiz.incorrectAnswers}</span></p>
            </div>

            <button onClick={handleRestartQuiz} style={{ marginTop: '20px' }}>
                Reiniciar Quiz (en cualquier momento)
            </button>
        </div>
    );
};

export default  Quiz;