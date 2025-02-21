import "./Sign.css";


const Sign = () => {
    return (
        <div className="Sign">
        <h1 className="titulo">Iniciar Sesión</h1>
        <form className="form">
            <input type="email" id="email" name="email" placeholder="Email" />
            <input type="password" id="password" name="password" placeholder="Password" />
            <button className="boton-sign">Iniciar Sesión</button>
        </form>
        </div>
    );
    };

    export default Sign;