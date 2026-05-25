import { useState } from "react";
import AdminLayout from "./AdminLayout";
import "../styles/admin.css";

const FLASK_URL = "http://localhost:5000";

const GRAFICAS = [
  { id: "ocupacion",  titulo: "Ocupación de Cursos",             icono: "📊" },
  { id: "cupos",      titulo: "Cupos Disponibles vs Máximos",    icono: "🪑" },
  { id: "estados",    titulo: "Estados de Solicitudes",          icono: "📋" },
  { id: "roles",      titulo: "Usuarios por Rol",                icono: "👥" },
  { id: "aprobacion", titulo: "Tasa de Aprobación por Programa", icono: "✅" },
];

function GraficaCard({ id, titulo, icono }) {
  const [ts, setTs] = useState(Date.now());
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const recargar = () => {
    setCargando(true);
    setError(false);
    setTs(Date.now());
  };

  return (
    <div className="grafica-card">
      <div className="grafica-card-header">
        <span>{icono} {titulo}</span>
        <button className="btn-recargar" onClick={recargar}>↺ Recargar</button>
      </div>

      {cargando && !error && (
        <div className="grafica-placeholder">Generando gráfica...</div>
      )}

      {error && (
        <div className="grafica-error">
          ❌ No se pudo cargar. ¿Está corriendo <code>python microservicio.py</code>?
          <button className="btn-reintentar" onClick={recargar}>Reintentar</button>
        </div>
      )}

      <img
        src={`${FLASK_URL}/graficas/${id}?t=${ts}`}
        alt={titulo}
        style={{ display: cargando || error ? "none" : "block" }}
        onLoad={() => setCargando(false)}
        onError={() => { setCargando(false); setError(true); }}
      />
    </div>
  );
}

const DashboardHome = () => {
  return (
    <AdminLayout>
      <div>

        <h1 className="dashboard-title">Panel Administrativo</h1>

        <div className="graficas-grid">
          {GRAFICAS.map((g) => (
            <GraficaCard key={g.id} {...g} />
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default DashboardHome;