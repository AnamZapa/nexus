import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { careers } from "../data/career";
import "../styles/Postulantes.css";
import "../styles/Cursos.css";

const CURSOS_MOCK = [
  { id: 1, nombre: "Arte Culinario", categoria: "Gastronomía", duracionHoras: 100, cuposDisponibles: 18, cuposMaximos: 20, precio: 1500000, instructor: "María Torres", mensajeDisponibilidad: "DISPONIBLE" },
  { id: 2, nombre: "Desarrollo de Software", categoria: "Ingeniería", duracionHoras: 160, cuposDisponibles: 12, cuposMaximos: 30, precio: 2500000, instructor: "Carlos Mendoza", mensajeDisponibilidad: "DISPONIBLE" },
  { id: 3, nombre: "Comercio Internacional", categoria: "Negocios", duracionHoras: 140, cuposDisponibles: 0, cuposMaximos: 20, precio: 2200000, instructor: "Andrés Ruiz", mensajeDisponibilidad: "AGOTADO" },
  { id: 4, nombre: "Seguridad Laboral", categoria: "Seguridad", duracionHoras: 80, cuposDisponibles: 3, cuposMaximos: 15, precio: 1200000, instructor: "Pedro Vargas", mensajeDisponibilidad: "últimos cupos disponibles!" },
  { id: 5, nombre: "Sistemas Informáticos", categoria: "Tecnología", duracionHoras: 120, cuposDisponibles: 10, cuposMaximos: 25, precio: 1900000, instructor: "Sofía Castro", mensajeDisponibilidad: "DISPONIBLE" },
  { id: 6, nombre: "Producción de Eventos", categoria: "Entretenimiento", duracionHoras: 90, cuposDisponibles: 5, cuposMaximos: 18, precio: 1600000, instructor: "Laura Gómez", mensajeDisponibilidad: "últimos cupos disponibles!" },
];

const FORM_VACIO = {
  nombre: "", categoria: "", duracionHoras: "", cuposMaximos: "",
  precio: "", instructor: "", mensajeDisponibilidad: "DISPONIBLE",
};

export default function Cursos() {
  const [cursos, setCursos] = useState(CURSOS_MOCK);
  const [busqueda, setBusqueda] = useState("");
  const [filtroDisp, setFiltroDisp] = useState("Todos");
  const [modal, setModal] = useState(null); // null | "crear" | "editar" | "eliminar"
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [error, setError] = useState("");

  // Stats
  const total = cursos.length;
  const disponibles = cursos.filter(c => c.mensajeDisponibilidad === "DISPONIBLE").length;
  const ultimos = cursos.filter(c => c.mensajeDisponibilidad?.includes("últimos")).length;
  const agotados = cursos.filter(c => c.mensajeDisponibilidad === "AGOTADO").length;

  const filtrados = cursos.filter(c => {
    const matchBusqueda =
      c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.categoria?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(busqueda.toLowerCase());
    const matchDisp =
      filtroDisp === "Todos" ||
      (filtroDisp === "DISPONIBLE" && c.mensajeDisponibilidad === "DISPONIBLE") ||
      (filtroDisp === "AGOTADO" && c.mensajeDisponibilidad === "AGOTADO") ||
      (filtroDisp === "últimos" && c.mensajeDisponibilidad?.includes("últimos"));
    return matchBusqueda && matchDisp;
  });

  const abrirCrear = () => {
    setForm(FORM_VACIO);
    setError("");
    setModal("crear");
  };

  const abrirEditar = (curso) => {
    setCursoSeleccionado(curso);
    setForm({ ...curso });
    setError("");
    setModal("editar");
  };

  const abrirEliminar = (curso) => {
    setCursoSeleccionado(curso);
    setModal("eliminar");
  };

  const cerrarModal = () => {
    setModal(null);
    setCursoSeleccionado(null);
    setForm(FORM_VACIO);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!form.nombre || !form.categoria || !form.duracionHoras ||
        !form.cuposMaximos || !form.precio || !form.instructor) {
      setError("Por favor completa todos los campos.");
      return false;
    }
    return true;
  };

  const guardarCurso = () => {
    if (!validar()) return;

    const cuposNum = parseInt(form.cuposMaximos);
    const dispNum = modal === "editar" ? cursoSeleccionado.cuposDisponibles : cuposNum;
    let disp = "DISPONIBLE";
    if (dispNum === 0) disp = "AGOTADO";
    else if (dispNum <= 5) disp = "últimos cupos disponibles!";

    if (modal === "crear") {
      const nuevo = {
        ...form,
        id: Date.now(),
        cuposDisponibles: cuposNum,
        cuposMaximos: cuposNum,
        duracionHoras: parseInt(form.duracionHoras),
        precio: parseFloat(form.precio),
        mensajeDisponibilidad: disp,
      };
      setCursos(prev => [...prev, nuevo]);
    } else {
      setCursos(prev => prev.map(c =>
        c.id === cursoSeleccionado.id
          ? { ...c, ...form, duracionHoras: parseInt(form.duracionHoras), precio: parseFloat(form.precio), cuposMaximos: cuposNum, mensajeDisponibilidad: disp }
          : c
      ));
    }
    cerrarModal();
  };

  const eliminarCurso = () => {
    setCursos(prev => prev.filter(c => c.id !== cursoSeleccionado.id));
    cerrarModal();
  };

  return (
    <div className="postulantes-content">

      <h1 className="titulo-pagina">Gestión de Cursos</h1>

      {/* STATS */}
      <div className="dashboard-cards">
        <div className="card total"><h3>Total Cursos</h3><p>{total}</p></div>
        <div className="card aprobado"><h3>Disponibles</h3><p>{disponibles}</p></div>
        <div className="card pendiente"><h3>Últimos cupos</h3><p>{ultimos}</p></div>
        <div className="card rechazado"><h3>Agotados</h3><p>{agotados}</p></div>
      </div>

      {/* TOP SECTION */}
      <div className="top-section">
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div className="filtro-dropdown">
            <select value={filtroDisp} onChange={e => setFiltroDisp(e.target.value)}>
              <option value="Todos">Todos</option>
              <option value="DISPONIBLE">Disponibles</option>
              <option value="últimos">Últimos cupos</option>
              <option value="AGOTADO">Agotados</option>
            </select>
          </div>
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o instructor..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-nuevo" onClick={abrirCrear}>
          <FaPlus /> Nuevo Curso
        </button>
      </div>

      {/* TABLA */}
      <div className="table-container">
        {filtrados.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No se encontraron cursos.
          </p>
        ) : (
          <table className="postulantes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Duración (h)</th>
                <th>Cupos</th>
                <th>Precio</th>
                <th>Instructor</th>
                <th>Disponibilidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td><strong>{c.nombre}</strong></td>
                  <td>{c.categoria}</td>
                  <td>{c.duracionHoras}h</td>
                  <td>{c.cuposDisponibles} / {c.cuposMaximos}</td>
                  <td>${Number(c.precio).toLocaleString("es-CO")}</td>
                  <td>{c.instructor}</td>
                  <td>
                    <span className={`estado ${
                      c.mensajeDisponibilidad === "AGOTADO" ? "rechazado"
                      : c.mensajeDisponibilidad?.includes("últimos") ? "pendiente"
                      : "aprobado"
                    }`}>
                      {c.mensajeDisponibilidad}
                    </span>
                  </td>
                  <td>
                    <div className="acciones">
                      <button className="btn-view" title="Editar" onClick={() => abrirEditar(c)}>
                        <FaEdit />
                      </button>
                      <button className="btn-reject" title="Eliminar" onClick={() => abrirEliminar(c)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL CREAR / EDITAR */}
      {(modal === "crear" || modal === "editar") && (
        <div className="postulante-modal-overlay">
          <div className="postulante-modal-content" style={{ width: "560px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0 }}>{modal === "crear" ? "Nuevo Curso" : "Editar Curso"}</h2>
              <button onClick={cerrarModal} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#64748b" }}>
                <FaTimes />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Nombre del curso</label>
                <select name="nombre" value={form.nombre} onChange={handleChange}>
                  <option value="">Selecciona un programa</option>
                  {careers.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <input name="categoria" placeholder="Ej: Ingeniería" value={form.categoria} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Duración (horas)</label>
                <input name="duracionHoras" type="number" placeholder="Ej: 120" value={form.duracionHoras} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Cupos máximos</label>
                <input name="cuposMaximos" type="number" placeholder="Ej: 30" value={form.cuposMaximos} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input name="precio" type="number" placeholder="Ej: 2500000" value={form.precio} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Instructor</label>
                <input name="instructor" placeholder="Nombre del instructor" value={form.instructor} onChange={handleChange} />
              </div>
            </div>

            {error && <p style={{ color: "#ef4444", fontSize: "13px", margin: "8px 0" }}>{error}</p>}

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button className="postulante-btn-close" onClick={guardarCurso}>
                {modal === "crear" ? "Crear Curso" : "Guardar Cambios"}
              </button>
              <button onClick={cerrarModal} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontWeight: "600", color: "#64748b" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {modal === "eliminar" && cursoSeleccionado && (
        <div className="postulante-modal-overlay">
          <div className="postulante-modal-content" style={{ width: "420px", textAlign: "center" }}>
            <p style={{ fontSize: "48px", margin: "0 0 12px" }}>🗑️</p>
            <h2 style={{ marginBottom: "10px" }}>Eliminar Curso</h2>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              ¿Estás segura de eliminar <strong>{cursoSeleccionado.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={eliminarCurso} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "none", background: "#ef4444", color: "white", cursor: "pointer", fontWeight: "600" }}>
                Sí, eliminar
              </button>
              <button onClick={cerrarModal} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontWeight: "600", color: "#64748b" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}