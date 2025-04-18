import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom"; // Importa Outlet
import "./CarouselDiseases.css";

const diseases = [
  {
    name: "GLAUCOMA",
    image: "/Glaucoma.png",
    ruta: "/diseases/glaucoma", // Ruta correspondiente
  },
  {
    name: "CONJUNTIVITIS",
    image: "/Conjuntivitis.jpg",
    ruta: "/diseases/conjunctivitis", // Ruta correspondiente
  },
  {
    name: "DEGENERACIÓN MACULAR",
    image: "/Degeneracion.jpg",
    ruta: "/diseases/macular-degeneration", // Ruta correspondiente
  },
  {
    name: "CATARATAS",
    image: "/Cataratas.jpg",
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
    <div className="carousel-container">
      <button
        className="arrow"
        onClick={() => move(-1)}
        aria-label="Anterior"
      >
        &lt;
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
                Ver más
              </button>
            </motion.div>
          );
        })}
      </div>
      <button
        className="arrow"
        onClick={() => move(1)}
        aria-label="Siguiente"
      >
        &gt;
      </button>
      <Outlet />
    </div>
  );
};

export default CarouselDiseases;
