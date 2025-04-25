/* eslint-disable react/no-unknown-property */
import "./Glaucoma.css";
import { Canvas } from "@react-three/fiber";
import { EyeGlaucomaModel } from "./model-3d/EyeGlaucomaModel";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Floor from "./model-3d/Floor";

const Glaucoma = () => {
    const sections = [
        {
            title: "¿Qué es el glaucoma?",
            description: "El glaucoma es una enfermedad del ojo que puede causar pérdida de visión si no se detecta y trata a tiempo. Se produce por un daño en el nervio óptico, generalmente asociado a una presión ocular alta. Al principio no presenta síntomas, pero con el tiempo puede afectar seriamente la visión. Un diagnóstico temprano y el tratamiento adecuado ayudan a controlar la enfermedad y preservar la vista."
        },
        {
            title: "Causas del glaucoma",
            description: "El glaucoma puede ser causado por aumento de la presión ocular, bloqueo en el drenaje del humor acuoso, herencia genética, lesiones oculares, y otros factores de riesgo como diabetes o hipertensión."
        },
        {
            title: "Efectos en el cuerpo humano",
            description: "El glaucoma afecta principalmente al nervio óptico. Si no se trata, puede provocar pérdida gradual de la visión periférica y, en etapas avanzadas, ceguera total. También puede generar dolor ocular y molestias visuales."
        }
    ];

    const [currentSection, setCurrentSection] = useState(0);

    const handleNext = () => {
        setCurrentSection((prev) => (prev + 1) % sections.length);
    };

    const handlePrev = () => {
        setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
    };

    return (
        <div className="glaucoma-container">
            <div className="Text-container-sectionOne">
                <h2 className="glaucoma-title">Glaucoma</h2>
                <h3 className="subtitle">{sections[currentSection].title}</h3>
                <p className="glaucoma-description">{sections[currentSection].description}</p>
                <div className="glaucoma-buttons">
                    <button onClick={handlePrev} className="glaucoma-button">Anterior</button>
                    <button onClick={handleNext} className="glaucoma-button">Siguiente</button>
                </div>
            </div>
            <div className="model-container">
                <Canvas shadows camera={{ position: [0, 0, 0.3], fov: 50 }}>
                    <ambientLight intensity={2} />
                    <directionalLight position={[2, 2, 2]} castShadow />
                    <OrbitControls />
                    <EyeGlaucomaModel scale={[10, 10, 10]} position={[0, 0, 0]} />
                    <Floor />
                </Canvas>
            </div>
        </div>
    );
};

export default Glaucoma;

