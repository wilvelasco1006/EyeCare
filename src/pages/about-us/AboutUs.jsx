import "./AboutUs.css";
import eyeImage from "/images/eye.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={eyeImage} alt="Salud ocular" />
        </div>
        <div className="about-us-text">
          <h1>Acerca de nosotros</h1>

          <p>
            <span className="brand-name">EyeCare</span> es una plataforma web educativa e interactiva enfocada en la salud ocular. A través de experiencias inmersivas en 3D, buscamos enseñar de forma clara y visual sobre enfermedades como la degeneración macular.
          </p>

          <p>
            Este proyecto fue desarrollado en el marco del curso Proyecto Integrador I, con el objetivo de combinar conocimientos técnicos en desarrollo web, modelado 3D, diseño de interfaz y ciencia médica para brindar una herramienta accesible y educativa sobre salud visual.
          </p>

          <h2>Equipo de desarrollo</h2>

          <ul style={{ fontSize: "20px", lineHeight: "1.6" }}>
            <li>
              <strong>Oliver David Plazas</strong><br />
              📞 Tel: 3197648887<br />
              📧 Correo: oliver.plazas@correounivalle.edu.co<br />
              🔗 <a href="https://www.linkedin.com/in/oliver-david-plazas-fuentes-924809352" target="_blank" rel="noreferrer">LinkedIn</a>
              🔗 <a href="https://github.com/Athelstan53" target="_blank" rel="noreferrer">GitHub</a>
            </li>

            <li>
              <strong>Juan Carlos Reinosa</strong><br />
              📞 Tel: 3052826870<br />
              📧 Correo: juancrg2004@hotmail.com<br />
              🔗 <a href="https://portafolio-dev-kappa.vercel.app/" target="_blank" rel="noreferrer">Portafolio</a>
              🔗 <a href="https://github.com/JuanR66803" target="_blank" rel="noreferrer">GitHub</a>
            </li>

            <li>
              <strong>Wilmer Yulian Ulcue</strong><br />
              📞 Tel: 3197648887<br />
              📧 Correo: wilmer.ulcue@correounivalle.edu.co<br />
              🔗 <a href="https://links.wilvelasco.me/" target="_blank" rel="noreferrer">Portafolio</a>
              🔗 <a href="https://github.com/wilvelasco1006" target="_blank" rel="noreferrer">GitHub</a>
            </li>

            <li>
              <strong>Jaider Daniel Rios</strong><br />
              📞 Tel: 3197648887<br />
              📧 Correo: jaider.rios@correounivalle.edu.co<br />
              🔗 <a href="https://www.linkedin.com/in/oliver-david-plazas-fuentes-924809352" target="_blank" rel="noreferrer">LinkedIn</a>
              🔗 <a href="https://github.com/Athelstan53" target="_blank" rel="noreferrer">GitHub</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default AboutUs;
