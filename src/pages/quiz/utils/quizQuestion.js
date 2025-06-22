// src/components/quiz/QuizQuestions.js
// This file exports the quiz questions data.

export const quizQuestions = [
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
];