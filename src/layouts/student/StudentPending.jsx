import StudentLayout from "./StudentLayout";

import {
  FaClock,
  FaCheckCircle,
  FaFileAlt,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";

import "../../styles/studentPending.css";

export default function StudentPending() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <StudentLayout>

      <div className="pending-page">

        {/* HEADER */}

        <div className="pending-header">

          <div>

            <h1>
              Estado de admisión
            </h1>

            <p>
              Sigue el avance de tu proceso universitario
            </p>

          </div>

          <div className="status-badge">

            <FaClock />

            <span>
              {user?.estado}
            </span>

          </div>

        </div>

        {/* GRID */}

        <div className="pending-grid">

          {/* CARD PRINCIPAL */}

          <div className="pending-card main-card">

            <div className="main-top">

              <div>

                <span>
                  Programa aplicado
                </span>

                <h2>
                  {user?.programa}
                </h2>

              </div>

              <div className="progress-circle">

                75%

              </div>

            </div>

            <div className="progress-section">

              <div className="progress-info">

                <span>
                  Avance del proceso
                </span>

                <span>
                  75%
                </span>

              </div>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

            </div>

            <div className="extra-info">

              <div>

                <FaCalendarAlt />

                <div>

                  <span>
                    Inscripción
                  </span>

                  <p>
                    {user?.fechaInscripcion}
                  </p>

                </div>

              </div>

              <div>

                <FaUserGraduate />

                <div>

                  <span>
                    Estado
                  </span>

                  <p>
                    Pendiente evaluación final
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* CARD LATERAL */}

          <div className="pending-card next-step">

            <h3>
              Próximo paso
            </h3>

            <div className="step-box">

              <FaFileAlt />

              <div>

                <h4>
                  Entrevista académica
                </h4>

                <p>
                  20 Junio 2026
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </StudentLayout>
  );
}