import {
  FaChartBar,
    FaUserGraduate,
  FaCog
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../../styles/sidebar.css";

export default function Sidebar() {

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <h2>NEXUS ADMIN</h2>

      </div>

      <nav>

        <Link to="/dashboard">
          <FaChartBar />
          Dashboard
        </Link>

        <Link to="/dashboard/postulantes">
          <FaUserGraduate />
          Postulantes
        </Link>

        <Link to="/dashboard/cursos">
          <FaUserGraduate />
          Cursos
        </Link>

        <Link to="/dashboard/docentes">
          <FaUserGraduate />
          Docentes
        </Link>

        <Link to="/dashboard/configuracion">
          <FaCog />
          Configuración
        </Link>

      </nav>

    </aside>
  );
}