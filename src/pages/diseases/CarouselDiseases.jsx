import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./CarouselDiseases.css";

const diseases = [
  {
    nombre: "GLAUCOMA",
    imagen: "/public/Glaucoma.png",
  },
  {
    nombre: "CONJUNTIVITIS",
    imagen: "/public/Conjuntivitis.jpg",
  },
  {
    nombre: "DEGENERACIÓN MACULAR",
    imagen: "/public/Degeneracion.jpg",
  },
  {
    nombre: "CATARATAS",
    imagen: "/public/Cataratas.jpg",
    ruta: "/diseases/cataracts", // Ruta para la página de Cataratas
  },
];

const CarouselDiseases = () => {
  const [indice, setIndice] = useState(1); // comienza en el centro
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const mover = (direccion) => {
    setIndice((prev) => (prev + direccion + diseases.length) % diseases.length);
  };

  return (
    <div className="carrusel-contenedor">
      <button className="flecha" onClick={() => mover(-1)}>
        &lt;
      </button>
      <div className="carrusel">
        {diseases.map((item, i) => {
          const offset = i - indice;
          const escala = offset === 0 ? 1.1 : 0.8;
          const opacidad = offset === 0 ? 1 : 0.5;
          return (
            <motion.div
              className="tarjeta"
              key={i}
              animate={{
                scale: escala,
                opacity: opacidad,
                zIndex: offset === 0 ? 2 : 1,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ transform: `translateX(${offset * 220}px)` }}
              onClick={() => navigate(item.ruta)} // Navega a la ruta correspondiente
            >
              <img src={item.imagen} alt={item.nombre} />
              <h3>{item.nombre}</h3>
              <button className="ver-mas">Ver más</button>
            </motion.div>
          );
        })}
      </div>
      <button className="flecha" onClick={() => mover(1)}>
        &gt;
      </button>
    </div>
  );
};

export default CarouselDiseases;
