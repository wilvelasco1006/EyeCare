import { useCallback } from "react";
import useQuizStore from "../../stores/use-quiz-store";
import "./Quiz.css";

const Quiz = () => {
    const { quiz, incrementQuizProgress, clearQuiz } = useQuizStore();

    const handleQuizNext = useCallback(()=> {
        incrementQuizProgress();
    }, [incrementQuizProgress]);

    return (
        <div className="Quiz">
            <h1 className="titulo">Quiz</h1>
            <div>
                <h2>Preguntas</h2>
                <p>¿pregunta ejemplo?</p>
                <input type="radio" name="respuesta" value="respuesta1" />
                <label htmlFor="respuesta1">Respuesta 1</label>
                <input type="radio" name="respuesta" value="respuesta2" />
                <label htmlFor="respuesta2">Respuesta 2</label>
                <input type="radio" name="respuesta" value="respuesta3" />
                <label htmlFor="respuesta3">Respuesta 3</label>
                <input type="radio" name="respuesta" value="respuesta4" />
                <label htmlFor="respuesta4">Respuesta 4</label>
                <span>Progreso del quiz: {quiz.percentageQuizCompleted}%</span>
                <button onClick={handleQuizNext}>Siguiente</button>
            </div>
        </div>
    );
};

export default Quiz;