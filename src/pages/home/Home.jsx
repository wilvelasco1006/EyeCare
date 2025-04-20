import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/diseases");
    }
        
    return (
    <div className="Home">
      <h1 className="titulo">EyeCare</h1>
      <p className="info-text">experencia interactiva 3D sobre enfermedades Oculares</p>
      <img src="/images/eye.gif" alt="Animated Eye" className="animated-image" />
      <button className="boton-welcome" onClick={handleClick}>Iniciar</button>
    </div>
  );
};

export default Home;
