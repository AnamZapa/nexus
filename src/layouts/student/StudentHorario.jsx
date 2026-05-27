import StudentLayout from "./StudentLayout";
import { careers } from "../../data/career.js";
import {
  FaUserTie, FaClock, FaDoorOpen,
  FaBookOpen, FaStar, FaCalendarAlt,
} from "react-icons/fa";
import "../../styles/studentHorario.css";

/* ══════════════════════════════════════════════════════════
   MOCK DATA — reemplazar por fetch() cuando el backend esté listo
   Estructura pensada para mapear directamente desde la API:
   GET /api/v1/cursos?usuarioId={id}&semestre={semestre}
══════════════════════════════════════════════════════════ */

const MOCK_CURSOS = {
  "desarrollo-software": [
    { id: 1, nombre: "React Avanzado",        dias: ["Lun", "Mié"], horaInicio: "8:00 AM",  horaFin: "10:00 AM", aula: "Aula 204", instructor: "Prof. García",   creditos: 3, color: "azul"     },
    { id: 2, nombre: "Node.js y APIs REST",   dias: ["Mar", "Jue"], horaInicio: "10:00 AM", horaFin: "12:00 PM", aula: "Aula 301", instructor: "Prof. López",    creditos: 3, color: "verde"    },
    { id: 3, nombre: "UI / UX Design",        dias: ["Lun", "Mié"], horaInicio: "2:00 PM",  horaFin: "4:00 PM",  aula: "Aula 203", instructor: "Prof. Ramírez", creditos: 2, color: "morado"   },
    { id: 4, nombre: "Bases de Datos",        dias: ["Vie"],        horaInicio: "12:00 PM", horaFin: "2:00 PM",  aula: "Aula 102", instructor: "Prof. Torres",   creditos: 3, color: "amarillo" },
  ],
  "arte-culinario": [
    { id: 1, nombre: "Técnicas Básicas",      dias: ["Lun", "Mié"], horaInicio: "7:00 AM",  horaFin: "10:00 AM", aula: "Cocina 1",  instructor: "Chef Martínez", creditos: 4, color: "amarillo" },
    { id: 2, nombre: "Pastelería y Repostería",dias: ["Mar", "Jue"], horaInicio: "10:00 AM", horaFin: "12:00 PM", aula: "Cocina 2", instructor: "Chef Gómez",    creditos: 3, color: "rosa"     },
    { id: 3, nombre: "Cocina Internacional",  dias: ["Vie"],        horaInicio: "8:00 AM",  horaFin: "12:00 PM", aula: "Cocina 3",  instructor: "Chef Ruiz",     creditos: 3, color: "naranja"  },
  ],
  "comercio-internacional": [
    { id: 1, nombre: "Logística Global",      dias: ["Lun", "Mié"], horaInicio: "8:00 AM",  horaFin: "10:00 AM", aula: "Aula 110", instructor: "Prof. Herrera", creditos: 3, color: "celeste"  },
    { id: 2, nombre: "Mercados Internacionales",dias: ["Mar", "Jue"],horaInicio: "10:00 AM", horaFin: "12:00 PM", aula: "Aula 112", instructor: "Prof. Vargas",  creditos: 3, color: "azul"     },
    { id: 3, nombre: "Derecho Aduanero",      dias: ["Vie"],        horaInicio: "2:00 PM",  horaFin: "5:00 PM",  aula: "Aula 205", instructor: "Prof. Castro",  creditos: 2, color: "morado"   },
  ],
  "seguridad-laboral": [
    { id: 1, nombre: "Gestión de Riesgos",    dias: ["Lun", "Mié"], horaInicio: "8:00 AM",  horaFin: "10:00 AM", aula: "Aula 401", instructor: "Prof. Díaz",    creditos: 3, color: "rojo"     },
    { id: 2, nombre: "Ergonomía Industrial",  dias: ["Mar", "Jue"], horaInicio: "2:00 PM",  horaFin: "4:00 PM",  aula: "Aula 402", instructor: "Prof. Medina",  creditos: 2, color: "naranja"  },
    { id: 3, nombre: "Legislación SST",       dias: ["Vie"],        horaInicio: "10:00 AM", horaFin: "12:00 PM", aula: "Aula 403", instructor: "Prof. Mora",    creditos: 3, color: "amarillo" },
  ],
  "sistemas-informaticos": [
    { id: 1, nombre: "Redes y Comunicaciones",dias: ["Lun", "Mié"], horaInicio: "8:00 AM",  horaFin: "10:00 AM", aula: "Lab 201",  instructor: "Prof. Peña",    creditos: 3, color: "azul"     },
    { id: 2, nombre: "Administración Linux",  dias: ["Mar", "Jue"], horaInicio: "10:00 AM", horaFin: "12:00 PM", aula: "Lab 202",  instructor: "Prof. Ríos",    creditos: 3, color: "verde"    },
    { id: 3, nombre: "Ciberseguridad",        dias: ["Vie"],        horaInicio: "1:00 PM",  horaFin: "4:00 PM",  aula: "Lab 203",  instructor: "Prof. Silva",   creditos: 3, color: "rojo"     },
  ],
  "produccion-eventos": [
    { id: 1, nombre: "Producción Técnica",    dias: ["Lun", "Mié"], horaInicio: "9:00 AM",  horaFin: "11:00 AM", aula: "Estudio 1",instructor: "Prof. Agudelo", creditos: 3, color: "rosa"     },
    { id: 2, nombre: "Marketing de Eventos",  dias: ["Mar", "Jue"], horaInicio: "2:00 PM",  horaFin: "4:00 PM",  aula: "Aula 310", instructor: "Prof. Nieto",   creditos: 2, color: "morado"   },
    { id: 3, nombre: "Logística y Protocolo", dias: ["Vie"],        horaInicio: "8:00 AM",  horaFin: "11:00 AM", aula: "Aula 311", instructor: "Prof. Bernal",  creditos: 3, color: "amarillo" },
  ],
};

/* Días de la semana para el cronograma */
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const DIAS_FULL   = { Lun: "Lunes", Mar: "Martes", Mié: "Miércoles", Jue: "Jueves", Vie: "Viernes" };

/* ════════════════════════════════════════════════════════════ */

export default function StudentHorario() {

  // ── Datos del usuario desde localStorage ──────────────────
  // TODO: Reemplazar con contexto de autenticación global
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // ── Carrera del estudiante ─────────────────────────────────
  // TODO: user.carreraId vendrá del backend cuando esté conectado
  const carreraId  = user.carreraId ?? "desarrollo-software";
  const carreraInfo = careers.find((c) => c.id === carreraId) ?? careers[1];

  // ── Cursos del semestre ────────────────────────────────────
  // TODO: reemplazar por: fetch(`/api/v1/cursos?usuarioId=${user.id}`)
  const cursos = MOCK_CURSOS[carreraId] ?? MOCK_CURSOS["desarrollo-software"];

  // ── Helpers ───────────────────────────────────────────────
  const totalCreditos = cursos.reduce((acc, c) => acc + c.creditos, 0);

  const getCursoDia = (dia) => cursos.filter((c) => c.dias.includes(dia));

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <StudentLayout>

      <div className="horario-container">

        {/* ── ENCABEZADO PRINCIPAL ── */}
        <div className="horario-header">
          <h1>MI HORARIO</h1>
          <p>Consulta tu carrera, cursos inscritos y cronograma semanal.</p>
        </div>

        {/* ════════════════════════════════════
            SECCIÓN 1 — MI CARRERA
        ════════════════════════════════════ */}
        <div className="horario-section-title">
          <FaStar className="section-icon gold" />
          <h2>Mi carrera</h2>
        </div>

        <div className="carrera-card">

          <div className="carrera-icon-wrap">
            <img
              src={carreraInfo.icon}
              alt={carreraInfo.title}
              className="carrera-icon"
            />
          </div>

          <div className="carrera-info">
            <span className="carrera-tag">Carrera actual</span>
            <h3 className="carrera-titulo">{carreraInfo.title}</h3>
            <p className="carrera-degree">{carreraInfo.degree}</p>

            <div className="carrera-chips">
              <span className="chip"><FaClock /> {carreraInfo.duration}</span>
              <span className="chip"><FaCalendarAlt /> {carreraInfo.modality}</span>
              <span className="chip chip-gold">
                <FaBookOpen /> {totalCreditos} créditos este semestre
              </span>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════
            SECCIÓN 2 — MIS CURSOS
        ════════════════════════════════════ */}
        <div className="horario-section-title">
          <FaBookOpen className="section-icon azul" />
          <h2>Mis cursos inscritos</h2>
          <span className="badge-count">{cursos.length} cursos</span>
        </div>

        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className={`curso-card borde-${curso.color}`}>

              <div className="curso-head">
                <h4 className="curso-nombre">{curso.nombre}</h4>
                <span className={`creditos-badge bg-${curso.color}`}>
                  {curso.creditos} cr.
                </span>
              </div>

              <div className="curso-dias">
                {curso.dias.map((d) => (
                  <span key={d} className={`dia-chip chip-${curso.color}`}>{d}</span>
                ))}
              </div>

              <div className="curso-detalle-row">
                <FaClock className="det-icon" />
                <span>{curso.horaInicio} – {curso.horaFin}</span>
              </div>

              <div className="curso-detalle-row">
                <FaDoorOpen className="det-icon" />
                <span>{curso.aula}</span>
              </div>

              <div className="curso-detalle-row">
                <FaUserTie className="det-icon" />
                <span>{curso.instructor}</span>
              </div>

            </div>
          ))}
        </div>

        {/* ════════════════════════════════════
            SECCIÓN 3 — CRONOGRAMA SEMANAL
        ════════════════════════════════════ */}
        <div className="horario-section-title">
          <FaCalendarAlt className="section-icon morado" />
          <h2>Cronograma semanal</h2>
        </div>

        <div className="cronograma-wrapper">
          <table className="cronograma-tabla">
            <thead>
              <tr>
                {DIAS_SEMANA.map((d) => (
                  <th key={d} className="crono-th">
                    {DIAS_FULL[d]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {DIAS_SEMANA.map((dia) => (
                  <td key={dia} className="crono-td">
                    {getCursoDia(dia).length > 0 ? (
                      getCursoDia(dia).map((c) => (
                        <div key={c.id} className={`crono-bloque bg-light-${c.color} borde-${c.color}`}>
                          <span className="crono-nombre">{c.nombre}</span>
                          <span className="crono-hora">{c.horaInicio}</span>
                          <span className="crono-aula">{c.aula}</span>
                        </div>
                      ))
                    ) : (
                      <span className="crono-libre">—</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </StudentLayout>
  );
}