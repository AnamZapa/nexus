import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClock,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/studentSidebar.css";
import logoNexus from "../../assets/imagenes/logo nexus blanco-01.png";

export default function StudentSidebar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <aside className="student-sidebar">

      {/* LOGO */}
      <div className="student-logo">

        <img
          src={logoNexus}
          alt="Nexus Logo"
          className="student-logo-img"
        />

      </div>

      <nav>

        {/* =========================
            ESTADO PENDIENTE
        ========================= */}

        {user?.estado === "Pendiente" && (
          <>

            <NavLink to="/student" end>
              <FaHome />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/student/perfil">
              <FaUserGraduate />
              <span>Mi perfil</span>
            </NavLink>

          </>
        )}

        {/* =========================
            ESTADO APROBADO
        ========================= */}

        {user?.estado === "Aprobado" && (
          <>

            <NavLink to="/student" end>
              <FaHome />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/student/programa">
              <FaBook />
              <span>Mi programa</span>
            </NavLink>

            <NavLink to="/student/horario">
              <FaClock />
              <span>Horario</span>
            </NavLink>

            <NavLink to="/student/perfil">
              <FaUserGraduate />
              <span>Mi perfil</span>
            </NavLink>

          </>
        )}

        {/* =========================
            ESTADO RECHAZADO
        ========================= */}

        {user?.estado === "Rechazado" && (
          <>

            <NavLink to="/student/rechazado" end>
              <FaHome />
              <span>Resultado</span>
            </NavLink>

          </>
        )}

        {/* LOGOUT */}

        <button
          className="student-logout"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Cerrar sesión
          </span>

        </button>

      </nav>

    </aside>
  );
}