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

    const [currentSection, ] = useState(0);

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="glaucoma-container">
            <div className="Text-container-sectionOne">
                <h2 className="glaucoma-title">Glaucoma</h2>
                <h3 className="subtitle">{sections[currentSection].title}</h3>
                <p className="glaucoma-description">{sections[currentSection].description}</p>
                {currentSection === 0 && (
                <>
                    <details>
                        <summary className="details-glaucoma">Conoce mas sobre el glaucoma :</summary>
                        <ul className="glaucoma-list">
                            <li>Tipos de glaucoma: glaucoma de ángulo abierto, glaucoma de ángulo cerrado, glaucoma congénito.</li>
                            <li>Factores de riesgo: edad avanzada, antecedentes familiares, miopía alta.</li>
                            <li>Síntomas: pérdida gradual de la visión periférica, visión borrosa, halos alrededor de luces.</li>
                            <li>Tratamiento: medicamentos, cirugía láser, cirugía convencional.</li>
                        </ul>
                    </details>

                    <button className="modal-button" onClick={() => setShowModal(true)}>
                        Efectos y Causas
                    </button>
                    </>
                )}
                
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
            
            {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                      <div className="modal-content fancy-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="modal-title"> Factores y Efectos del Glaucoma 👁️‍🗨️</h2>
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
                  

        </div>
        
    );
};

export default Glaucoma;


