import { useState } from "react";
import { FaSearch, FaEye, FaTimes, FaChalkboardTeacher } from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import "../styles/Postulantes.css";
import "../styles/Cursos.css";

const HORARIOS = ["Lunes - Mañana", "Lunes - Tarde", "Lunes - Noche",
  "Martes - Mañana", "Martes - Tarde", "Martes - Noche",
  "Miércoles - Mañana", "Miércoles - Tarde", "Miércoles - Noche",
  "Jueves - Mañana", "Jueves - Tarde", "Jueves - Noche",
  "Viernes - Mañana", "Viernes - Tarde", "Viernes - Noche"];

const CURSOS_DISPONIBLES = [
  "Arte Culinario", "Desarrollo de Software", "Comercio Internacional",
  "Seguridad Laboral", "Sistemas Informáticos", "Producción de Eventos",
];

const DOCENTES_MOCK = [
  { id: 1, nombre: "Carlos", apellido: "Mendoza", email: "c.mendoza@nexus.edu.co", telefono: "3001234567", estado: "ACTIVO", asignaturas: ["Desarrollo de Software", "Sistemas Informáticos"], horariosOcupados: ["Lunes - Mañana", "Martes - Tarde"] },
  { id: 2, nombre: "Laura", apellido: "Gómez", email: "l.gomez@nexus.edu.co", telefono: "3019876543", estado: "ACTIVO", asignaturas: ["Arte Culinario"], horariosOcupados: ["Miércoles - Mañana", "Jueves - Tarde"] },
  { id: 3, nombre: "Andrés", apellido: "Ruiz", email: "a.ruiz@nexus.edu.co", telefono: "3105551234", estado: "ACTIVO", asignaturas: ["Comercio Internacional"], horariosOcupados: ["Viernes - Mañana"] },
  { id: 4, nombre: "María", apellido: "Torres", email: "m.torres@nexus.edu.co", telefono: "3204445678", estado: "INACTIVO", asignaturas: [], horariosOcupados: [] },
  { id: 5, nombre: "Pedro", apellido: "Vargas", email: "p.vargas@nexus.edu.co", telefono: "3153334567", estado: "ACTIVO", asignaturas: ["Seguridad Laboral"], horariosOcupados: ["Lunes - Tarde", "Miércoles - Noche"] },
  { id: 6, nombre: "Sofía", apellido: "Castro", email: "s.castro@nexus.edu.co", telefono: "3002223456", estado: "ACTIVO", asignaturas: ["Producción de Eventos"], horariosOcupados: ["Martes - Mañana"] },
];

export default function Docentes() {
  const [docentes, setDocentes] = useState(DOCENTES_MOCK);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [asignarForm, setAsignarForm] = useState({ curso: "", horario: "" });
  const [errorAsignar, setErrorAsignar] = useState("");

  const total = docentes.length;
  const activos = docentes.filter(d => d.estado === "ACTIVO").length;
  const inactivos = docentes.filter(d => d.estado === "INACTIVO").length;
  const conCursos = docentes.filter(d => d.asignaturas.length > 0).length;

  const filtrados = docentes.filter(d =>
    d.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.asignaturas?.some(a => a.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const abrirVer = (docente) => { setDocenteSeleccionado(docente); setModal("ver"); };
  const abrirAsignar = (docente) => { setDocenteSeleccionado(docente); setAsignarForm({ curso: "", horario: "" }); setErrorAsignar(""); setModal("asignar"); };
  const cerrarModal = () => { setModal(null); setDocenteSeleccionado(null); setAsignarForm({ curso: "", horario: "" }); setErrorAsignar(""); };

  const horariosDisponibles = docenteSeleccionado
    ? HORARIOS.filter(h => !docenteSeleccionado.horariosOcupados.includes(h))
    : [];

  const guardarAsignacion = () => {
    if (!asignarForm.curso || !asignarForm.horario) { setErrorAsignar("Selecciona un curso y un horario."); return; }
    setDocentes(prev => prev.map(d => {
      if (d.id !== docenteSeleccionado.id) return d;
      const nuevasAsignaturas = d.asignaturas.includes(asignarForm.curso) ? d.asignaturas : [...d.asignaturas, asignarForm.curso];
      return { ...d, asignaturas: nuevasAsignaturas, horariosOcupados: [...d.horariosOcupados, asignarForm.horario] };
    }));
    cerrarModal();
  };

  return (
    <AdminLayout>
      <div className="postulantes-content">

        <h1 className="titulo-pagina">Gestión de Docentes</h1>

        <div className="dashboard-cards">
          <div className="card total"><h3>Total Docentes</h3><p>{total}</p></div>
          <div className="card aprobado"><h3>Activos</h3><p>{activos}</p></div>
          <div className="card rechazado"><h3>Inactivos</h3><p>{inactivos}</p></div>
          <div className="card pendiente"><h3>Con cursos</h3><p>{conCursos}</p></div>
        </div>

        <div className="top-section">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar por nombre, correo o asignatura..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          </div>
        </div>

        <div className="table-container">
          {filtrados.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No se encontraron docentes.</p>
          ) : (
            <table className="postulantes-table">
              <thead>
                <tr>
                  <th>ID</th><th>Nombre</th><th>Correo</th><th>Teléfono</th>
                  <th>Asignaturas</th><th>Horarios ocupados</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td><strong>{d.nombre} {d.apellido}</strong></td>
                    <td>{d.email}</td>
                    <td>{d.telefono}</td>
                    <td>
                      {d.asignaturas.length === 0
                        ? <span style={{ color: "#94a3b8" }}>Sin asignar</span>
                        : d.asignaturas.map((a, i) => <span key={i} className="tag-asignatura">{a}</span>)
                      }
                    </td>
                    <td>
                      {d.horariosOcupados.length === 0
                        ? <span style={{ color: "#94a3b8" }}>Libre</span>
                        : <span style={{ color: "#64748b", fontSize: "12px" }}>{d.horariosOcupados.length} horario(s)</span>
                      }
                    </td>
                    <td>
                      <span className={`estado ${d.estado === "ACTIVO" ? "aprobado" : "rechazado"}`}>
                        {d.estado}
                      </span>
                    </td>
                    <td>
                      <div className="acciones">
                        <button className="btn-view" title="Ver detalle" onClick={() => abrirVer(d)}><FaEye /></button>
                        <button className="btn-approve" title="Asignar curso" onClick={() => abrirAsignar(d)}><FaChalkboardTeacher /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {modal === "ver" && docenteSeleccionado && (
          <div className="postulante-modal-overlay">
            <div className="postulante-modal-content" style={{ width: "480px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Detalle del Docente</h2>
                <button onClick={cerrarModal} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#64748b" }}><FaTimes /></button>
              </div>
              <div className="postulante-modal-info">
                <p><strong>Nombre:</strong> {docenteSeleccionado.nombre} {docenteSeleccionado.apellido}</p>
                <p><strong>Correo:</strong> {docenteSeleccionado.email}</p>
                <p><strong>Teléfono:</strong> {docenteSeleccionado.telefono}</p>
                <p><strong>Estado:</strong>
                  <span className={`estado ${docenteSeleccionado.estado === "ACTIVO" ? "aprobado" : "rechazado"}`} style={{ marginLeft: "8px" }}>
                    {docenteSeleccionado.estado}
                  </span>
                </p>
                <hr />
                <p><strong>Asignaturas que imparte:</strong></p>
                {docenteSeleccionado.asignaturas.length === 0
                  ? <p style={{ color: "#94a3b8" }}>Sin asignaturas asignadas</p>
                  : docenteSeleccionado.asignaturas.map((a, i) => <span key={i} className="tag-asignatura">{a}</span>)
                }
                <hr />
                <p><strong>Horarios ocupados:</strong></p>
                {docenteSeleccionado.horariosOcupados.length === 0
                  ? <p style={{ color: "#22c55e", fontWeight: "600" }}>✓ Completamente disponible</p>
                  : <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{docenteSeleccionado.horariosOcupados.map((h, i) => <span key={i} className="tag-horario ocupado">{h}</span>)}</div>
                }
                <hr />
                <p><strong>Horarios disponibles:</strong></p>
                {horariosDisponibles.length === 0
                  ? <p style={{ color: "#ef4444" }}>Sin disponibilidad</p>
                  : <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{horariosDisponibles.map((h, i) => <span key={i} className="tag-horario disponible">{h}</span>)}</div>
                }
              </div>
              <button className="postulante-btn-close" onClick={cerrarModal} style={{ marginTop: "20px" }}>Cerrar</button>
            </div>
          </div>
        )}

        {modal === "asignar" && docenteSeleccionado && (
          <div className="postulante-modal-overlay">
            <div className="postulante-modal-content" style={{ width: "460px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Asignar Curso</h2>
                <button onClick={cerrarModal} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#64748b" }}><FaTimes /></button>
              </div>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>
                Docente: <strong>{docenteSeleccionado.nombre} {docenteSeleccionado.apellido}</strong>
              </p>
              <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="form-group">
                  <label>Curso a asignar</label>
                  <select value={asignarForm.curso} onChange={e => setAsignarForm(prev => ({ ...prev, curso: e.target.value }))}>
                    <option value="">Selecciona un curso</option>
                    {CURSOS_DISPONIBLES.map((c, i) => <option key={i} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Horario disponible</label>
                  {horariosDisponibles.length === 0
                    ? <p style={{ color: "#ef4444", fontSize: "13px" }}>Este docente no tiene horarios disponibles.</p>
                    : (
                      <select value={asignarForm.horario} onChange={e => setAsignarForm(prev => ({ ...prev, horario: e.target.value }))}>
                        <option value="">Selecciona un horario</option>
                        {horariosDisponibles.map((h, i) => <option key={i} value={h}>{h}</option>)}
                      </select>
                    )
                  }
                </div>
              </div>
              {errorAsignar && <p style={{ color: "#ef4444", fontSize: "13px", margin: "8px 0" }}>{errorAsignar}</p>}
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                <button className="postulante-btn-close" onClick={guardarAsignacion}>Confirmar Asignación</button>
                <button onClick={cerrarModal} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontWeight: "600", color: "#64748b" }}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}