import {
  FaChartBar,
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCog
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "../../styles/sidebar.css";

export default function Sidebar() {

  return (

    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <h2>NEXUS</h2>

      </div>

      {/* MENU */}

      <nav>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaChartBar />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/postulantes"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaUserGraduate />
          <span>Postulantes</span>
        </NavLink>

        <NavLink
          to="/dashboard/cursos"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaBookOpen />
          <span>Cursos</span>
        </NavLink>

        <NavLink
          to="/dashboard/docentes"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaChalkboardTeacher />
          <span>Docentes</span>
        </NavLink>

        <NavLink
          to="/dashboard/configuracion"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <FaCog />
          <span>Configuración</span>
        </NavLink>

      </nav>

    </aside>
  );
}