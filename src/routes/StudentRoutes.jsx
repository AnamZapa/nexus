import { Routes, Route } from "react-router-dom";

import StudentDashboard from "../layouts/student/StudentDashboard";
import StudentPending from "../layouts/student/StudentPending";
import StudentProfile from "../layouts/student/StudentProfile";
import StudentPrograma from "../layouts/student/StudentPrograma";
import StudentHorario from "../layouts/student/StudentHorario";
import StudentRejected from "../layouts/student/StudentRejected";

export default function StudentRoutes() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  console.log(user);

  return (

    <Routes>

      {/* =========================
          ESTUDIANTE PENDIENTE
      ========================= */}

      {user?.estado === "Pendiente" && (
        <>

          <Route
            index
            element={<StudentPending />}
          />

          <Route
            path="perfil"
            element={<StudentProfile />}
          />

        </>
      )}

      {/* =========================
          ESTUDIANTE APROBADO
      ========================= */}

      {user?.estado === "Aprobado" && (
        <>

          <Route
            index
            element={<StudentDashboard />}
          />

          <Route
            path="programa"
            element={<StudentPrograma />}
          />

          <Route
            path="horario"
            element={<StudentHorario />}
          />

          <Route
            path="perfil"
            element={<StudentProfile />}
          />

        </>
      )}

      {/* =========================
          ESTUDIANTE RECHAZADO
      ========================= */}

      {user?.estado === "Rechazado" && (
        <>

          <Route
            index
            element={<StudentRejected />}
          />

          <Route
            path="rechazado"
            element={<StudentRejected />}
          />

          <Route
            path="perfil"
            element={<StudentProfile />}
          />

        </>
      )}

    </Routes>
  );
}