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
            En <span className="brand-name">EyeCare</span>, creemos que la salud ocular es fundamental 
            para una vida plena y productiva. 
            Somos una plataforma dedicada a proporcionar información confiable y educativa sobre el cuidado 
            de los ojos, con el objetivo de empoderarte para tomar decisiones informadas sobre tu visión.
          </p>
          <p>
            Nuestra misión es ser tu fuente de confianza para aprender sobre la importancia de la salud visual, 
            cómo prevenir problemas comunes y cómo mantener una visión óptima en todas las etapas de la vida. 
            En <span className="brand-name">EyeCare</span>, nos apasiona compartir conocimientos basados 
            en evidencia científica, consejos prácticos y las últimas tendencias en el campo de la oftalmología 
            y optometría.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
