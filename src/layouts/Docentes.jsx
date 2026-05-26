import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/Postulantes.css";

export default function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/usuarios")
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.content ?? [];
        const soloDocentes = lista.filter((u) => u.rol === "PROFESOR");
        setDocentes(soloDocentes);
        setCargando(false);
      })
      .catch(() => {
        setError("No hay docentes disponibles en este momento.");
        setCargando(false);
      });
  }, []);

  const filtrados = docentes.filter((d) =>
    d.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="postulantes-content">

      <h1 className="titulo-pagina">Gestión de Docentes</h1>

      <div className="top-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">

        {cargando && (
          <p style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Cargando docentes...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
            {error}
          </p>
        )}

        {!cargando && !error && filtrados.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 40px" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>👨‍🏫</p>
            <p style={{ fontSize: "18px", color: "#0f172a", fontWeight: "600", marginBottom: "8px" }}>
              No hay docentes registrados
            </p>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Los usuarios con rol PROFESOR aparecerán aquí.
            </p>
          </div>
        )}

        {!cargando && !error && filtrados.length > 0 && (
          <table className="postulantes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.nombre}</td>
                  <td>{d.apellido}</td>
                  <td>{d.email}</td>
                  <td>{d.telefono ?? "—"}</td>
                  <td>
                    <span className={`estado ${
                      d.estado?.toLowerCase() === "activo"
                        ? "aprobado"
                        : "rechazado"
                    }`}>
                      {d.estado}
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