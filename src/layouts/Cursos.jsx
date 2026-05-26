import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/Postulantes.css";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cursos")
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        const lista = data.content ?? data;
        setCursos(Array.isArray(lista) ? lista : []);
        setCargando(false);
      })
      .catch(() => {
        setError("No hay cursos disponibles en este momento.");
        setCargando(false);
      });
  }, []);

  const filtrados = cursos.filter((c) =>
    c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.categoria?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="postulantes-content">

      <h1 className="titulo-pagina">Gestión de Cursos</h1>

      <div className="top-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">

        {cargando && (
          <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Cargando cursos...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
            {error}
          </p>
        )}

        {!cargando && !error && filtrados.length === 0 && (
          <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No hay cursos registrados.
          </p>
        )}

        {!cargando && !error && filtrados.length > 0 && (
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
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.categoria}</td>
                  <td>{c.duracionHoras}</td>
                  <td>{c.cuposDisponibles} / {c.cuposMaximos}</td>
                  <td>${Number(c.precio ?? 0).toLocaleString("es-CO")}</td>
                  <td>{c.instructor}</td>
                  <td>
                    <span className={`estado ${
                      c.mensajeDisponibilidad === "AGOTADO"
                        ? "rechazado"
                        : "aprobado"
                    }`}>
                      {c.mensajeDisponibilidad ?? "DISPONIBLE"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}