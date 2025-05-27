/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Html } from "@react-three/drei";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import "./CarouselDiseases.css";

const diseases = [
    {
        name: "GLAUCOMA",
        image: "/images/Glaucoma.png",
        ruta: "/diseases/glaucoma",
        id: "glaucoma"
    },
    {
        name: "CONJUNTIVITIS",
        image: "/images/Conjuntivitis.jpg",
        ruta: "/diseases/conjuntivitis",
        id: "conjuntivitis"
    },
    {
        name: "DEGENERACIÓN MACULAR",
        image: "/images/Degeneracion.jpg",
        ruta: "/diseases/macular-degeneration",
        id: "macular-degeneration"
    },
    {
        name: "CATARATAS",
        image: "/images/Cataratas.jpg",
        ruta: "/diseases/cataracts",
        id: "cataratas"
    },
];

const Scene3d = () => {
    const [index, setIndex] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fromDisease = params.get('from');

        if (fromDisease) {
            const diseaseIndex = diseases.findIndex(disease => disease.id === fromDisease);
            if (diseaseIndex !== -1) {
                setIndex(diseaseIndex);
            }
        }
    }, [location]);

    const move = (direction) => {
        setIndex((prev) => (prev + direction + diseases.length) % diseases.length);
    };

    const handleViewMore = (disease) => {
        navigate(disease.ruta);
    };

    return (
        <group position={[2, -1, 0.1]}>
            <Html
                transform
                occlude
                position={[0, 0, 0]}
                scale={0.3}
                style={{
                    width: '600px',
                    height: '400px',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="carousel-html-container">
                    <h2 className="carousel-title" data-text="Enfermedades Oculares más comunes">
                        Enfermedades Oculares más comunes
                    </h2>
                    <p className="carousel-description">
                        Aquí puedes encontrar información sobre las enfermedades oculares más comunes. 
                        Haz clic en "Ver más" para obtener detalles adicionales.
                    </p>
                    <div className="carousel-container">
                        <button
                            className="arrow left-arrow"
                            onClick={() => move(-1)}
                            aria-label="Anterior"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="carousel">
                            {diseases.map((item, i) => {
                                const offset = i - index;
                                const scale = offset === 0 ? 1.1 : 0.8;
                                const opacity = offset === 0 ? 1 : 0.5;
                                return (
                                    <motion.div
                                        className="card"
                                        key={i}
                                        animate={{
                                            scale: scale,
                                            opacity: opacity,
                                            zIndex: offset === 0 ? 2 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        style={{ transform: `translateX(${offset * 220}px)` }}
                                    >
                                        <img src={item.image} alt={item.name} />
                                        <h3>{item.name}</h3>
                                        <button
                                            className="watch-more"
                                            aria-label={`Ver más sobre ${item.name}`}
                                            onClick={() => handleViewMore(item)}
                                        >
                                            <FaEye className="watch-more-icon" />  Ver más
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <button
                            className="arrow right-arrow"
                            onClick={() => move(1)}
                            aria-label="Siguiente"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </Html>
        </group>
    );
};

export default Scene3d;