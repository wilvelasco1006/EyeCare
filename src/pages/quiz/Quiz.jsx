import "./Quiz.css";

const Quiz = () => {
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
            </div>
        </div>
    );
};

export default Quiz;