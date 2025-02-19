import "./Diseases.css";


const Diseases = () => {
    return (
    <div className="Contenedor-enfermedades">
      <h1>Lista de enfermedades</h1>
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