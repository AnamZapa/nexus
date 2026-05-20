import {
  FaChartBar,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaCog
} from "react-icons/fa";

import "../../styles/Sidebar.css";

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
          Cursos
        </li>

        <li>
          <FaTimesCircle />
          Docentes
        </li>

      </ul>

    </aside>
  );
};

export default Sidebar;