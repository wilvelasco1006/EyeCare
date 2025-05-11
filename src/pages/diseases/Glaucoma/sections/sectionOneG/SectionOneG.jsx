/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useNavigate } from "react-router";
import "./SectionOneG.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { EyeGlaucomaModel } from "../../model-3d/EyeGlaucomaModel";
import { FaChevronCircleRight, FaTimes } from "react-icons/fa";
import Floor from "../../model-3d/Floor";
import CameraController from "../../../utils/CameraController";
import SliderControls from "../../../utils/SliderControls/SliderControls";
import Staging from "../../../staging/Staging";

const SectionOne = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowInstruction(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const messages = [
        "Vista frontal del ojo con irritacion inicial.",
        "Vista lateral para observar el enrojecimiento y como se expande.",
        "Vista superior para apreciar inflamación general.",
    ];
    const totalViews = messages.length;
    const [viewIndex, setViewIndex] = useState(0);

    const handlePrev = () =>
        setViewIndex((prev) => (prev === 0 ? totalViews - 1 : prev - 1));
    const handleNext = () => setViewIndex((prev) => (prev + 1) % totalViews);
    const handleSelect = (idx) => setViewIndex(idx);

    // Slider informativo de causas
    const causas = [
        {
            titulo: "¿Que es?",
            descripcion: "El Glaucoma es una enfermedad ocular que daña el nervio óptico, generalmente debido a un aumento de la presión dentro del ojo. Si no se trata a tiempo, puede causar pérdida gradual de la visión e incluso ceguera. Es una condición silenciosa, ya que muchas veces no presenta síntomas en sus etapas iniciales."
        },
        {
            titulo: "Causas",
            descripcion:
                "El glaucoma puede ser causado por una variedad de factores, incluyendo la genética, la edad avanzada, la presión ocular elevada y condiciones médicas como diabetes o hipertensión. También puede ser secundario a otras enfermedades oculares.",
        },
        {
            titulo: "Tipos de Glaucoma",
            descripcion:
                "Existen varios tipos de glaucoma, siendo los más comunes el glaucoma de ángulo abierto y el glaucoma de ángulo cerrado. El primero es más frecuente y se desarrolla lentamente, mientras que el segundo puede aparecer repentinamente y requiere atención médica inmediata.",
        },
        {
            titulo: "Factores de riesgo",
            descripcion:
                "Los factores de riesgo incluyen antecedentes familiares de glaucoma, edad avanzada, miopía severa, uso prolongado de corticosteroides y ciertas condiciones médicas como diabetes o hipertensión. Es importante realizar chequeos regulares para detectar el glaucoma a tiempo.",
        },
    ];

    const [causaIndex, setCausaIndex] = useState(0);
    const handleCausaPrev = () =>
        setCausaIndex((prev) => (prev === 0 ? causas.length - 1 : prev - 1));
    const handleCausaNext = () => setCausaIndex((prev) => (prev + 1) % causas.length);
    const handleCausaSelect = (index) => setCausaIndex(index);

    return (
        <>
            <div className="sectionOneG">
                
                <div className="Text-container-sectionOneG">
                    <button className="btn-atrasG" onClick={() => navigate('/diseases/content-diseases?from=glaucoma')}> Atrás</button>
                    <h2 className="glaucoma-title">Glaucoma</h2>
                    {/* Slider informativo de causas */}
                    <div className="slider-content">
                        {/* 1) Track: todos los slides en fila */}
                        <div
                            className="slider-track"
                            style={{
                                transform: `translateX(-${causaIndex * 100}%)`,
                                transition: "transform 0.4s ease-in-out",
                            }}
                        >
                            {causas.map((c, idx) => (
                                <div key={idx} className="slider-box">
                                    <h3 className="causa-title">{c.titulo}</h3>
                                    <p className="causaG-description">{c.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        {/* 2) Controles + botón */}
                        <div className="actions">
                            <SliderControls
                                current={causaIndex}
                                total={causas.length}
                                onPrev={handleCausaPrev}
                                onNext={handleCausaNext}
                                onSelect={handleCausaSelect}
                            />

                        </div>
                    </div>
                    <button className="btn-more-info" onClick={() => setShowModal(true)}>
                            Ver más
                    </button>


                    {showInstruction && (
                        <div className="box-message show">
                            <div>
                                <h3>¡Es hora de navegar!</h3>
                                <p>Dale a la flecha para saber un poco más...</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="model-container">
                    <div className="floating-message">{messages[viewIndex]}</div>
                    <Canvas camera={{ position: [0.9, 0.3, 2], fov: 70 }} shadows={true}>
                        <ambientLight intensity={0.5} />
                        <Staging />
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={10}
                            castShadow={true}
                            shadow-mapSize={[4096, 4096]}
                            shadow-camera-left={-10} 
                            shadow-camera-right={10} 
                            shadow-camera-top={10} 
                            shadow-camera-bottom={-10} 
                            shadow-bias={-0.001} />
                        
                        <OrbitControls />
                        <CameraController viewIndex={viewIndex} />
                        <EyeGlaucomaModel scale={[60, 60, 60]} position={[0, 0.2, 0]} />
                        <Floor />
                    </Canvas>
                    <button
                        title="Presiona el botón para cambiar de vista"
                        onClick={handleNext}
                        className="btn-glaucoma"
                    >
                        <FaChevronCircleRight style={{ fontSize: "2rem" }} />
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowModal(false)}>
                            <FaTimes style={{ fontSize: "1.5rem" }} />
                        </button>
                        <h2>Factores y Efectos</h2>
                        <div className="card-container">
	                          
	                          {/* Biológicas */}
	                          <div className="info-card">
	                            <h3>🧬 Biológicas</h3>
	                            <p><strong>Causas:</strong> Edad avanzada, herencia genética, ojos claros</p>
	                            <p><strong>Efectos:</strong> Visión central borrosa, pérdida de detalles finos, manchas oscuras</p>
	                          </div>
	                  
	                          {/* Hábitos */}
	                          <div className="info-card">
	                            <h3>🍔 Hábitos y Estilo de Vida</h3>
	                            <p><strong>Causas:</strong> Tabaquismo, mala alimentación, sedentarismo</p>
	                            <p><strong>Efectos:</strong> Dificultad para leer, conducir o reconocer rostros, adaptación lenta a la oscuridad</p>
	                          </div>
	                  
	                          {/* Salud */}
	                          <div className="info-card">
	                            <h3>❤️ Condiciones de Salud</h3>
	                            <p><strong>Causas:</strong> Obesidad, hipertensión, enfermedades cardiovasculares</p>
	                            <p><strong>Efectos:</strong> Necesidad de ayudas visuales, reducción de la capacidad funcional</p>
	                          </div>
	                  
	                          {/* Ambientales */}
	                          <div className="info-card">
	                            <h3>🌞 Ambientales</h3>
	                            <p><strong>Causas:</strong> Exposición prolongada a la luz UV sin protección</p>
	                            <p><strong>Efectos:</strong> Metamorfopsia, dificultad con cambios de iluminación</p>
	                          </div>
	                  
	                          {/* Psicológicas */}
	                          <div className="info-card">
	                            <h3>🧠 Psicológicas/Sociales</h3>
	                            <p><strong>Causas:</strong> Impacto emocional de la pérdida visual</p>
	                            <p><strong>Efectos:</strong> Ansiedad, depresión, aislamiento, baja calidad de vida</p>
	                          </div>
	                        </div>
	                  
	                        <button className="close-button" onClick={() => setShowModal(false)}>Cerrar</button>
	                      </div>
	                    </div>

            )}
        </>
    );
};

export default SectionOne;
