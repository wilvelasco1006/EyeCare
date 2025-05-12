/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useNavigate } from "react-router";
import "./SectionOneC.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { EyeHealthModel } from "../../model-3d/EyeHealthModel";//importar el modelo 3D 
import { FaChevronCircleRight, FaTimes } from "react-icons/fa";
import Floor from "../../model-3d/Floor";
import CameraController from "../../../utils/CameraController";
import SliderControls from "../../../utils/SliderControls/SliderControls";
import Staging from "../../../staging/Staging";

const SectionOneC = () => {
    
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
            descripcion: "La conjuntivitis, también conocida como ojo rosado, esuna inflamación de la conjuntiva, la membrana delgada y transparenteque recubre la parte blanca del ojo y el interior de los párpados.Esta inflamación hace que los vasos sanguíneos de la conjuntiva sehagan más visibles, lo que le da al ojo un aspecto rojizo o rosado."
        },
        {
            titulo: "Conjuntivitis Viral",
            descripcion:
                "Causada por adenovirus. Es altamente contagiosa y suele acompañarse de fiebre, dolor de garganta y lagrimeo constante.",
        },
        {
            titulo: "Conjuntivitis Bacteriana",
            descripcion:
                "Provocada por bacterias como Staphylococcus o Streptococcus. Produce secreción espesa y amarillenta, y es muy contagiosa.",
        },
        {
            titulo: "Conjuntivitis Alérgica",
            descripcion:
                "Originada por alérgenos como polen, ácaros o pelo de animales. Produce picazón intensa, lagrimeo y ojos rojos, pero no es contagiosa.",
        },
        {
            titulo: "Conjuntivitis Irritativa",
            descripcion:
                "Causada por químicos, humo o cloro. Genera ardor y enrojecimiento, y desaparece al eliminar el agente irritante.",
        },
    ];

    const [causaIndex, setCausaIndex] = useState(0);
    const handleCausaPrev = () =>
        setCausaIndex((prev) => (prev === 0 ? causas.length - 1 : prev - 1));
    const handleCausaNext = () => setCausaIndex((prev) => (prev + 1) % causas.length);
    const handleCausaSelect = (index) => setCausaIndex(index);

    return (
        <>
            <div className="sectionOne">
                <div className="Text-container-sectionOneC">
                        <button className="btn-atras" onClick={() => navigate('/diseases/content-diseases?from=conjuntivitis')}> Atrás</button>
                    <h2 className="conjuntivitis-title">Conjuntivitis</h2>
                    <div className="slider-contentC">
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
                        <directionalLight
                            position={[2, 2, 2]}
                            intensity={3}
                            castShadow={true}
                            shadow-mapSize={[2048, 2048]}
                        />
                        <Staging />
                        <OrbitControls />
                        <CameraController viewIndex={viewIndex} />
                        <EyeHealthModel scale={[0.5, -0.5, -0.5]} position={[0, 0, 1]} />
                        <Floor />
                    </Canvas>
                    <button
                        title="Presiona el botón para cambiar de vista"
                        onClick={handleNext}
                        className="btn-conjuntivitis"
                    >
                        <FaChevronCircleRight style={{ fontSize: "2rem" }} />
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-conjuntivitis" onClick={() => setShowModal(false)}>
                            <FaTimes style={{ fontSize: "1.5rem" }} />
                        </button>
                        <h2>Factores y Efectos</h2>
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
                                    <td>
                                        - Virus
                                        <br />
                                        - Bacterias
                                        <br />
                                        - Alérgenos
                                    </td>
                                    <td>
                                        - Enrojecimiento ocular
                                        <br />
                                        - Secreción ocular
                                        <br />
                                        - Picazón y ardor
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hábitos y estilo de vida</td>
                                    <td>
                                        - Uso de lentes de contacto
                                        <br />
                                        - Exposición a irritantes ambientales
                                        <br />
                                        - Falta de higiene ocular
                                    </td>
                                    <td>
                                        - Sensibilidad a la luz
                                        <br />
                                        - Inflamación de los párpados
                                        <br />
                                        - Dificultad para abrir los ojos al despertar
                                    </td>
                                </tr>
                                <tr>
                                    <td>Condiciones de salud</td>
                                    <td>
                                        - Enfermedades autoinmunes
                                        <br />
                                        - Infecciones respiratorias superiores
                                        <br />
                                        - Alergias estacionales
                                    </td>
                                    <td>
                                        - Visión borrosa temporal
                                        <br />
                                        - Sensación de cuerpo extraño en el ojo
                                        <br />
                                        - Complicaciones si no se trata adecuadamente
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img
                            src="https://www.oftalmologico.com.mx/enfermedades/images/conjuntivitis_4.png"
                            alt="conjuntivitis"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SectionOneC;
