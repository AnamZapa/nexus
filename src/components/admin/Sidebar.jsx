import {
  FaChartBar,
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import logoNexus from "../../assets/imagenes/logo nexus blanco-01.png";
import "../../styles/Sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    //  limpiar sesión (ajusta si usas token real)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirigir a página principal
    navigate("/");
  };

  return (

    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">
        <img
          src={logoNexus}
          alt="Nexus Logo"
          className="sidebar-logo-img"
        />
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

        {/* CERRAR SESIÓN */}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </button>

      </nav>

    </aside>
  );
}