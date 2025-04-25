/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Conjuntivitis.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {useState, useEffect } from "react";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { EyeHealthModel } from "./model-3d/EyeHealthModel";
import Floor from "./model-3d/Floor";
import CameraController from "./utils/CameraController";

const Conjuntivitis = () => {
    const [showModal, setShowModal] = useState(false);
    const [showInstruction, setShowInstruction] = useState(true);
    
    useEffect(() => {
    const timer = setTimeout(() => setShowInstruction(false), 2000);
    return () => clearTimeout(timer);
    }, []);

    const [viewIndex, setViewIndex] = useState(0); // control de la vista

    const handleClick = () => {
        // Cambia entre 3 vistas (0 → 1 → 2 → 0 ...)
        setViewIndex((prev) => (prev + 1) % 3);
    };

    // Mensajes flotantes según vista
    const messages = [
        "Vista frontal del ojo con irritacion inicial.",
        "Vista lateral para observar el enrojecimiento y como se expande.",
        "Vista superior para apreciar inflamación general.",
    ];

    return (
        <div className="conjuntivitis-container">
            <div className="Text-container-sectionOne">
                <h2 className="conjuntivitis-title">Conjuntivitis</h2>
                <h3 className="subtitle">¿Que es?</h3>
                <p className="conjuntivitis-description">
                La <span>conjuntivitis</span>,también conocida como ojo rosado, es una inflamación de la conjuntiva, la membrana delgada y transparente que recubre la parte blanca del ojo y el interior de los párpados. Esta inflamación hace que los vasos sanguíneos de la conjuntiva se hagan más visibles, lo que le da al ojo un aspecto rojizo o rosado.  
                </p>
                <details>
                    <summary className="conjuntivitis-summary">Existen varias causas de la conjuntivitis, siendo las más comunes:</summary>
                    <ul className="conjuntivitis-list">
                        <li>Viral: Es la causa más frecuente y suele estar asociada con resfriados. Produce un lagrimeo acuoso y puede comenzar en un ojo y extenderse al otro. Es muy contagiosa.</li>
                        <li>Bacteriana: Causada por bacterias, produce una secreción espesa, amarillenta o verdosa, que puede hacer que los párpados se peguen, especialmente al despertar. También es contagiosa.</li>
                        <li>Alérgica: Provocada por una reacción a alérgenos como el polen, el polvo o la caspa de animales. Generalmente afecta a ambos ojos y causa picazón intensa, lagrimeo y, a veces, hinchazón. No es contagiosa.</li>
                        <li>Irritativa: Puede ser causada por irritantes como productos químicos, humo, polvo o el uso de lentes de contacto. No es contagiosa.</li>
                    </ul>
                    <p className="conjuntivitis-description">La conjuntivitis puede ser leve y autolimitada, pero en algunos casos puede requerir tratamiento médico, especialmente si es bacteriana o si hay complicaciones. Es importante consultar a un profesional de la salud si se presentan síntomas como enrojecimiento intenso, dolor ocular, visión borrosa o secreción abundante.</p>
                    <button className="btn-more-info" onClick={() => setShowModal(true)}>
                        Ver mas
                    </button>
                </details>
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
                {/* Mensaje flotante */}
                <div className="floating-message">
                    {messages[viewIndex]}
                </div>
                <Canvas camera={{ position: [0.9, 0.3, 2], fov: 70 }} shadows={true}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} intensity={3} castShadow={true} shadow-mapSize={[2048, 2048]} />
                    <OrbitControls />
                    <CameraController viewIndex={viewIndex} />
                    <EyeHealthModel scale={[0.5, -0.5, -0.5]} position={[0, 0, 1]} />
                    <Floor />
                </Canvas>
                <button title="presiona el botón para cambiar de vista" onClick={handleClick} className="btn-conjuntivitis">
                    <FaChevronRight />
                </button>
            </div>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-modal" onClick={() => setShowModal(false)}> <FaTimes style={{ fontSize: '1.5rem' }}/> </button>
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
                                    <td>- Virus<br />- Bacterias<br />- Alérgenos</td>
                                    <td>- Enrojecimiento ocular<br />- Secreción ocular<br />- Picazón y ardor</td>
                                </tr>
                                <tr>
                                    <td>Hábitos y estilo de vida</td>
                                    <td>- Uso de lentes de contacto<br />- Exposición a irritantes ambientales<br />- Falta de higiene ocular</td>
                                    <td>- Sensibilidad a la luz<br />- Inflamación de los párpados<br />- Dificultad para abrir los ojos al despertar</td>
                                </tr>
                                <tr>
                                    <td>Condiciones de salud</td>
                                    <td>- Enfermedades autoinmunes<br />- Infecciones respiratorias superiores<br />- Alergias estacionales</td>
                                    <td>- Visión borrosa temporal<br />- Sensación de cuerpo extraño en el ojo<br />- Complicaciones si no se trata adecuadamente</td>
                                </tr>
                            </tbody>
                        </table>
                        <img src="https://www.oftalmologico.com.mx/enfermedades/images/conjuntivitis_4.png" alt="conjuntivisimage" />

                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conjuntivitis;
