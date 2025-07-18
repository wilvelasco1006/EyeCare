import { create } from 'zustand';

const useQuizStore = create((set) => ({
    quiz: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageQuizCompleted: 0,
        points : 0,
    },
    incrementQuizProgress: () => {
        set((state) => {
            const newPercentage = Math.min(
                state.quiz.percentageQuizCompleted + 6.25,
                100
            );
            return {
                quiz: {
                    ...state.quiz,
                    percentageQuizCompleted: newPercentage,
                },
            };
        });
    }, 
    clearQuiz: () => set({
        quiz: {
            correctAnswers: 0,
            incorrectAnswers: 0,
            percentageQuizCompleted: 0,
            points: 0,
        },
    }),
    pointQuiz: (points = 100) => set((state) => ({
        quiz: {
            ...state.quiz,
            points: state.quiz.points + points
        }
    })),
    incrementCorrectAnswers: () => set((state) => ({
        quiz: {
            ...state.quiz,
            correctAnswers: state.quiz.correctAnswers + 1,
        }
    })),
    incrementIncorrectAnswers: () => set((state) => ({
        quiz: {
            ...state.quiz,
            incorrectAnswers: state.quiz.incorrectAnswers + 1,
        }
    })),

})); // Fixed closing parentheses

export default useQuizStore;