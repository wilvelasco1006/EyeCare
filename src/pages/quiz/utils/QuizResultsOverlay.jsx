// src/components/quiz/QuizResultsOverlay.jsx
import React from 'react';
import { Html } from '@react-three/drei';

export const QuizResultsOverlay = ({ quiz, lives, handleSaveQuizResults, handleRestartQuiz, isSubmitting }) => (
    <Html fullscreen>
        <div className="quiz-results-overlay">
            <div className="quiz-results">
                <h2>¡Quiz Completado!</h2>
                <div className="results-grid">
                    <div className="result-item">
                        <span className="result-label">Puntos:</span>
                        <span className="result-value">{quiz.points}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Correctas:</span>
                        <span className="result-value correct">{quiz.correctAnswers}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Incorrectas:</span>
                        <span className="result-value incorrect">{quiz.incorrectAnswers}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Progreso:</span>
                        <span className="result-value">{quiz.percentageQuizCompleted}%</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Vidas restantes:</span>
                        <span className="result-value">{lives}</span>
                    </div>
                </div>
                <div className="results-actions">
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveQuizResults}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Resultados'}
                    </button>
                    <button className="btn btn-secondary" onClick={handleRestartQuiz}>
                        Reiniciar Quiz
                    </button>
                </div>
            </div>
        </div>
    </Html>
);