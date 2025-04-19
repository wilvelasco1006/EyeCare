/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./Conjuntivitis.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import * as THREE from "three"; 
import { EyeHealthModel } from "./model-3d/EyeHealthModel";
import Floor from "./model-3d/Floor";


const CameraController = ({ viewIndex }) => {
    const { camera } = useThree();
    const targetRef = useRef({
        position: new THREE.Vector3(),
        lookAt: new THREE.Vector3()
    });

    const views = [
        { position: [0.9, 0.3, 2], lookAt: [0, 0, 0] },      // Frontal 
        { position: [1.5, 0.5, 0.7], lookAt: [0, 0, 0] },    // Lateral 
        { position: [0, 2.5, 1], lookAt: [0, 0, 0.5] }       // Superior 
    ];

    useEffect(() => {
        const { position, lookAt } = views[viewIndex];
        targetRef.current.position.set(...position);
        targetRef.current.lookAt.set(...lookAt);
    }, [viewIndex]);

    useFrame(() => {
        camera.position.lerp(targetRef.current.position, 0.05);
        camera.lookAt(targetRef.current.lookAt);
    });

    return null;
};

const Conjuntivitis = () => {
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
                </details>
                
                <button onClick={handleClick} className="btn-conjuntivitis">
                    <FaChevronRight />
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
            </div>
        </div>
    );
};

export default Conjuntivitis;
