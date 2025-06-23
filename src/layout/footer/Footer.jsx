import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>EyeCare</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/about-us">Quiénes somos</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Enfermedades</h4>
          <ul>
            <li><Link to="/diseases/content-diseases">Enfermedades</Link></li>
            <li><Link to="/diseases/conjuntivitis">Conjuntivitis</Link></li>
            <li><Link to="/diseases/macular-degeneration">Degeneración Macular</Link></li>
            <li><Link to="/diseases/cataracts">Cataratas</Link></li>
            <li><Link to="/diseases/glaucoma">Glaucoma</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Interacción</h4>
          <ul>
            <li><Link to="/quiz">Quiz Interactivo</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-copy">
        <p>&copy; 2025 EyeCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
