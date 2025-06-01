/* eslint-disable react/no-unknown-property */
/** eslint-disable react/no-unknown-property **/
import { useNavigate } from "react-router";
import React, { useState } from "react";
import "./Home.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EyeModel } from "./components/eye";
import Sign from "../../pages/sign-in/Sign";
import useAuthStore from "../../stores/use-auth-store";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const { userLooged } = useAuthStore();

  return (
    <>
      <div className="Home-scroll-container">
        <div className="Presentation-container">
          <div className="background-image"></div>
          <div className="Presentation-text">
            <div className="welcome-header">
              <h2>¡Bienvenido a EyeCare!</h2>
              <div className="accent-line"></div>
            </div>
            <p className="tagline">Aprende con EyeCare</p>
            <p className="description">Tu guía completa sobre enfermedades oculares</p>
            <p className="call-to-action">¡Haz click en el botón para empezar!</p>
            <div className="button-group">
              <a className="btn primary-btn" href="#diseases">¡Empezar!</a>
              {!userLooged && (
                <button className="btn login-btn" onClick={openModal}>
                  Iniciar Sesión
                </button>
              )}
            </div>
            {!userLooged ? (
              <p className="login-message">
                <span className="highlight">¿Ya tienes cuenta?</span> Inicia sesión para guardar tu progreso y acceder a contenido exclusivo.
              </p>
            ):(
              <p className="login-message">
                <span className="highlight">Bienvenido!</span> Ahora disfruta de todo el contenido, aprende y divirtete
              </p>
            )}
          </div>
          <div className="canva-container">
            <div className="eye-model-wrapper">
              <Canvas camera={{ position: [1, 2, 3], fov: 70 }}>
                <OrbitControls
                  enableZoom={false}
                  autoRotate={true}
                  autoRotateSpeed={2}
                  enablePan={false}
                />
                <ambientLight intensity={2} />
                <directionalLight position={[0, 0, 3]} intensity={4} />
                <EyeModel scale={1.5} position={[0, -0.5, 0]} rotation={[0, Math.PI, 0]} />
              </Canvas>
            </div>
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
      {showModal && <Sign closeModal={closeModal} />}
    </>
  );
};

export default Home;