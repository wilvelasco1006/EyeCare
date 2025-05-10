/* eslint-disable react/no-unknown-property */
import { useNavigate } from "react-router";
import "./Home.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeModel } from "./components/eye";


const Home = () => {
    const navigate = useNavigate();
    
        
    return (
      <>
        <div className="Home-scroll-container">
          <div className="Presentation-container">
            <div className="background-image"></div>
            <div className="Presentation-text">
              <h2>¡Bienvenido a EyeCare!</h2>
              <p>Aprende con EyeCare</p>
              <p> Tu guía completa sobre enfermedades oculares</p>
              <p>¡Haz click en el botón para empezar!</p>
              <a className="btn" href="#diseases">¡Empezar!</a>
            </div>
            <div className="canva-container">
            <Canvas camera={{ position: [1, 2, 3], fov: 70 }}>
              <OrbitControls
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={2}
                enablePan={false}
              />
              <ambientLight intensity={2} />
              <directionalLight position={[0, 0, 3]} intensity={4} />
              <EyeModel scale={1.5} position={[0, -0.5, 0]} rotation={[0,  Math.PI, 0]} />
            </Canvas>
            </div>
            </div>
            <div className="containers-wrapper">
              <div id="diseases" className="diseases-container">
                  <h2>Explora Enfermedades Oculares</h2>
                  <p>Descubre todo sobre las condiciones que afectan la visión.</p>
                  <button onClick={() => navigate("/diseases/content-diseases")}>
                      Ver Enfermedades
                  </button>
                  <p>¡Aprende de forma interactiva y cuida tu salud visual!</p>
              </div>

              <div className="quiz-container">
                  <h2>Cuestionario</h2>
                  <p>¿Te animas a poner a prueba tus conocimientos sobre salud ocular?</p>
                  <button onClick={() => navigate("/quiz")}>
                      Empezar el Cuestionario
                  </button>
                  <p>¡Diviértete mientras aprendes!</p>
              </div>
          </div>
        </div>
      </>
  );
};

export default Home;
