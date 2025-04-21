import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom"; // Importa Outlet
import "./CarouselDiseases.css";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa"; // Importa los iconos

const diseases = [
  {
    name: "GLAUCOMA",
    image: "/images/Glaucoma.png",
    ruta: "/diseases/glaucoma", // Ruta correspondiente
  },
  {
    name: "CONJUNTIVITIS",
    image: "/images/Conjuntivitis.jpg",
    ruta: "/diseases/conjuntivitis", // Ruta correspondiente
  },
  {
    name: "DEGENERACIÓN MACULAR",
    image: "/images/Degeneracion.jpg",
    ruta: "/diseases/macular-degeneration", // Ruta correspondiente
  },
  {
    name: "CATARATAS",
    image: "/images/Cataratas.jpg",
    ruta: "/diseases/cataracts", // Ruta correspondiente
  },
];

const CarouselDiseases = () => {
  const [index, setIndex] = useState(1); // comienza en el centro
  const navigate = useNavigate(); // Inicializa useNavigate

  const move = (direction) => {
    setIndex((prev) => (prev + direction + diseases.length) % diseases.length);
  };

  return (
    <>
    <h2 className="carousel-title"data-text="Enfermedades Oculares mas comunes">Enfermedades Oculares mas comunes</h2>
    <p className="carousel-description">
      Aquí puedes encontrar información sobre las enfermedades oculares más comunes. Haz clic en "Ver más" para obtener detalles adicionales.
    </p>
    <div className="carousel-container">
      <button
        className="arrow left-arrow" // Añade clase específica para estilizar la flecha izquierda
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
                onClick={() => navigate(item.ruta)} // Navega a la ruta correspondiente
              >
                <FaEye className="watch-more-icon" />  Ver más
              </button>
            </motion.div>
          );
        })}
      </div>
      <button
        className="arrow right-arrow" // Añade clase específica para estilizar la flecha derecha
        onClick={() => move(1)}
        aria-label="Siguiente"
      >
        <FaChevronRight />
      </button>
    </div>
    </>
  );
};

export default CarouselDiseases;