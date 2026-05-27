import StudentLayout from "./StudentLayout";
import { useNavigate } from "react-router-dom";

import {
  FaTimesCircle,
  FaRedoAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import "../../styles/studentRejected.css";

export default function StudentRejected() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (

    <StudentLayout>

      <div className="rejected-page">

        {/* ICONO */}

        <div className="rejected-icon">
          <FaTimesCircle />
        </div>

        {/* TEXTO PRINCIPAL */}

        <h1>
          Lo sentimos, {user?.nombre}
        </h1>

        <p className="rejected-sub">
          Tu postulación al programa de{" "}
          <strong>{user?.programa}</strong> no fue
          admitida en esta convocatoria.
        </p>

        {/* CARD INFO */}

        <div className="rejected-card">

          <div className="rejected-card-icon">
            <FaRedoAlt />
          </div>

          <div>

            <h3>
              ¿Puedo volver a aplicar?
            </h3>

            <p>
              Sí. Nexus abre nuevas convocatorias cada semestre.
              Te invitamos a estar pendiente de nuestras
              próximas fechas de inscripción y volver a postularte
              cuando lo desees.
            </p>

          </div>

        </div>

      </div>

    </StudentLayout>
  );
}