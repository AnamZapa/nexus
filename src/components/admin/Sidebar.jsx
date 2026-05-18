import {
  FaChartBar,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaCog
} from "react-icons/fa";

import "../../styles/admin.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <h2>NEXUS ADMIN</h2>

      <ul>

        <li>
          <FaChartBar />
          Dashboard
        </li>

        <li>
          <FaUserGraduate />
          Postulantes
        </li>

        <li>
          <FaCheckCircle />
          Aprobados
        </li>

        <li>
          <FaTimesCircle />
          Rechazados
        </li>

        <li>
          <FaCog />
          Configuración
        </li>

      </ul>

    </aside>
  );
};

export default Sidebar;