import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation} from "react-router-dom"; // Importa Outlet
import "./CarouselDiseases.css";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa"; // Importa los iconos

const diseases = [
  {
    name: "GLAUCOMA",
    image: "/images/Glaucoma.png",
    ruta: "/diseases/glaucoma",
    id: "glaucoma" // identificador único
  },
  {
    name: "CONJUNTIVITIS",
    image: "/images/Conjuntivitis.jpg",
    ruta: "/diseases/conjuntivitis", // Ruta correspondiente
    id: "conjuntivitis" 
  },
  {
    name: "DEGENERACIÓN MACULAR",
    image: "/images/Degeneracion.jpg",
    ruta: "/diseases/macular-degeneration", // Ruta correspondiente
    id: "macular-degeneration" // identificador único
  },
  {
    name: "CATARATAS",
    image: "/images/Cataratas.jpg",
    ruta: "/diseases/cataracts", // Ruta correspondiente
    id: "cataratas" // identificador único
  },
];

const CarouselDiseases = () => {
  const [index, setIndex] = useState(1); // comienza en el centro
  const navigate = useNavigate(); // Inicializa useNavigate
  const location = useLocation(); // Obtener información de la ubicación actual

  // Al cargar el componente, verificar si hay un parámetro de enfermedad en la URL
  useEffect(() => {
    // Extraer el posible parámetro 'from' de la URL
    const params = new URLSearchParams(location.search);
    const fromDisease = params.get('from');

    // Si existe el parámetro, encontrar el índice correcto
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
  const handleViewMore = (disease, i) => {
    // Navegar a la enfermedad y también recordar el índice actual
    navigate(disease.ruta);
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
                onClick={() => handleViewMore(item, i)}// Navega a la ruta correspondiente
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