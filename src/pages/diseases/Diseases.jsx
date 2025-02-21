import "./Diseases.css";


const Diseases = () => {
    return (
    <div className="Contenedor-enfermedades">
      <h2>Lista de enfermedades</h2>
      <p className="info-text">informacion sobre diferentes enfermedades oculares</p>
      <ul>
        <li>Catarata</li>
        <li>Glaucoma</li>
        <li>Conjuntivitis</li>
        <li>Degeneración Macular</li>
      </ul>
    </div>
  );
};

export default Diseases;