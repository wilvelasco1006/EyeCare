/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router";
import "./sectionOneM.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { MacularModel } from "../../models-3d/MacularModel";
import { FaChevronCircleRight, FaTimes } from "react-icons/fa";
import Floor from "../../models-3d/Floor";
import CameraController from "../../../utils/CameraController";
import SliderControls from "../../../utils/SliderControls/SliderControls";
import Staging from "../../../staging/Staging";
import Lights from "../../lights/Lights";

const SectionOneM = () => {

    const [showModal, setShowModal] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowInstruction(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const messages = [
        "Vista frontal de la mácula.",
        "Vista lateral de la mácula.",
        "Vista superior para mejor panorama de la mácula.",
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
            titulo: "¿En qué consiste?",
            descripcion: (
                <>
                    La <span>Degeneración Macular</span> es una enfermedad ocular que afecta la mácula,
                    la parte central de la retina encargada de la visión fina y detallada necesaria para leer,
                    conducir, reconocer rostros, etc. Con el tiempo, la mácula se deteriora y
                    causa visión borrosa o puntos ciegos en el centro del campo visual.
                </>
            )
        },
        {
            titulo: "DMAE Seca (o atrófica)",
            descripcion: (
                <>
                    Es la forma más común (alrededor del 80-90% de los casos) y avanza lentamente. 
                    Se caracteriza por la acumulación de drusas (depósitos amarillos) 
                    bajo la retina y el deterioro progresivo de las células de la mácula.
                </>
            )
        },
        {
            titulo: "DMAE Húmeda (o exudativa/neovascular)",
            descripcion: (
                <>
                    Menos frecuente (10-20% de los casos), pero más agresiva. 
                    Ocurre cuando crecen vasos sanguíneos anormales bajo la retina, que sangran o filtran líquido, 
                    dañando la mácula rápidamente.
                </>
            )
        },
        {
            titulo: "Datos",
            descripcion: (
                <>
                    La degeneración macular puede ser seca o húmeda.
                    La forma seca es más común y se produce por el adelgazamiento de la mácula.
                    Las personas con DMAE pueden conservar la visión periférica.
                </>
            )
        },
        {
            titulo: "Factores de riesgo",
            descripcion:(
                <>
                    Es más común en personas mayores de 60 años.
                    Fumar multiplica el riesgo de desarrollar DMAE.
                    La obesidad y la hipertensión también son factores de riesgo.
                </>
            )
        },

    ];

    const [causaIndex, setCausaIndex] = useState(0);
    const handleCausaPrev = () =>
        setCausaIndex((prev) => (prev === 0 ? causas.length - 1 : prev - 1));
    const handleCausaNext = () => setCausaIndex((prev) => (prev + 1) % causas.length);
    const handleCausaSelect = (index) => setCausaIndex(index);

    return (
        <>
        <div className="sectionOneM">
            <div className="Text-container-sectionOneM">
                    <button className="btn-atras" onClick={() => navigate('/diseases/content-diseases?from=macular-degeneration')}> Atrás</button>
                <h2 className="macular-title">Degeneración Macular</h2>
                {/* Slider informativo de causas */}
                <div className="slider-contentM">
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
                                <p className="causa-description">{c.descripcion}</p>
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
                    <Lights />
                    <Staging />
                    <OrbitControls />
                    <CameraController viewIndex={viewIndex} />
                    <MacularModel scale={[0.5, -0.5, -0.5]} position={[0, 0, 1]} />
                    <Floor />
                </Canvas>
                <button
                    title="Presiona el botón para cambiar de vista"
                    onClick={handleNext}
                    className="btn-macular"
                >
                    <FaChevronCircleRight style={{ fontSize: "2rem" }} />
                </button>
            </div>
        </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Factores y Efectos</h2>
                        <button className="close-modal-macular" onClick={() => setShowModal(false)}>
                            <FaTimes style={{ fontSize: "1.5rem" }} />
                        </button>
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th>Causas</th>
                                    <th>Efectos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Biológicas</td>
                                    <td>- Edad avanzada<br />- Genética/herencia<br />- Color de ojos claros</td>
                                    <td>- Visión central borrosa<br />- Pérdida progresiva de detalles finos<br />- Manchas oscuras</td>
                                </tr>
                                <tr>
                                    <td>Hábitos y estilo de vida</td>
                                    <td>- Tabaquismo<br />- Dieta pobre en antioxidantes<br />- Sedentarismo</td>
                                    <td>- Dificultad para leer, conducir o reconocer rostros<br />- Adaptación lenta a la oscuridad</td>
                                </tr>
                                <tr>
                                    <td>Condiciones de salud</td>
                                    <td>- Obesidad<br />- Hipertensión arterial<br />- Enfermedades cardiovasculares</td>
                                    <td>- Necesidad de ayudas visuales<br />- Reducción de la capacidad funcional</td>
                                </tr>
                                <tr>
                                    <td>Ambientales</td>
                                    <td>- Exposición prolongada a la luz UV sin protección ocular</td>
                                    <td>- Metamorfopsia<br />- Dificultad con los cambios de iluminación</td>
                                </tr>
                                <tr>
                                    <td>Psicológicas/Sociales</td>
                                    <td>- Impacto emocional de la pérdida visual</td>
                                    <td>- Ansiedad<br />- Depresión<br />- Aislamiento social<br />- Disminución de la calidad de vida</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </>
    );
};

export default SectionOneM;
