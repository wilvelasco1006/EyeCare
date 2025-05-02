
import PropTypes from "prop-types";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./SliderControls.css";

export default function SliderControls({
  current,    // índice actual (0…total-1)
  total,      // número total de slides
  onPrev,     // callback para ir al anterior
  onNext,     // callback para ir al siguiente
  onSelect,   // callback(index) para saltar a un slide concreto
}) {
  if (total <= 0) {
    return null; // No renderizar si no hay slides
  }

  return (
    <div className="slider-controls">
      {/* Flecha izquierda */}
      <button
        className="arrow-btn"
        onClick={onPrev}
        aria-label="Slide anterior"
      >
        <FaChevronCircleLeft />
      </button>

      {/* Puntos */}
      <div className="dots">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => onSelect(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        className="arrow-btn"
        onClick={onNext}
        aria-label="Slide siguiente"
      >
        <FaChevronCircleRight />
      </button>
    </div>
  );
}

// Validación de propiedades
SliderControls.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
