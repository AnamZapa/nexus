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

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <aside className="student-sidebar">

            <div className="student-logo">
                <img
                    src={logoNexus}
                    alt="Nexus Logo"
                    className="student-logo-img"
                />
            </div>

            <nav>

                {/* DASHBOARD */}
                <NavLink to="/student" end>
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                {/* PROCESO */}
                <NavLink to="/student/proceso">
                    <FaUserGraduate />
                    <span>Mi proceso</span>
                </NavLink>

                {/* PROGRAMA */}
                <NavLink to="/student/programa">
                    <FaBook />
                    <span>Mi programa</span>
                </NavLink>

                {/* HORARIO */}
                <NavLink to="/student/horario">
                    <FaClock />
                    <span>Horario</span>
                </NavLink>

                {/* LOGOUT */}
                <button
                    className="student-logout"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Cerrar sesión</span>
                </button>

            </nav>

        </aside>
    );
}