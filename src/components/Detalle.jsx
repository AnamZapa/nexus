import React from "react";
import { useParams, Link } from "react-router-dom";
import { careers } from "../data/career";
import "../styles/career.css";

function Detalle() {

  const { id } = useParams();

  const career = careers.find(
    (c) => c.id === id
  );

  if (!career) {
    return <h2>Programa no encontrado</h2>;
  }

  return (

    <div
      className="career-page"
      style={{ backgroundImage: `url(${career.image})` }}
    >

      <div className="career-container">

        <h1 className="career-title">
          {career.title}
        </h1>

        <div className="career-image-container">
          <img
            src={career.image}
            alt={career.title}
            className="career-image"
          />
        </div>

        <h2 className="section-title">Título Otorgado</h2>
        <p>{career.degree}</p>

        <h2 className="section-title">Presentación del programa</h2>
        <p>{career.description}</p>

        <ul>
          <li><strong>Duración:</strong> {career.duration}</li>
          <li><strong>Modalidad:</strong> {career.modality}</li>
          <li><strong>Jornada:</strong> {career.schedule}</li>
        </ul>

        <h2 className="section-title">Requisitos</h2>

        <ul>
          {career.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        <div style={{marginTop:"30px"}}>
          <Link to="/services" className="btn-general">
            Volver
          </Link>

          <Link to="/admisiones" className="btn-general primary">
          Inscribirme
          </Link>
          
        </div>

      </div>

    </div>
  );
}

export default Detalle;