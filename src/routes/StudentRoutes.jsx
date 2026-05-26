import { Routes, Route } from "react-router-dom";

import StudentDashboard from "../layouts/student/StudentDashboard";
import StudentProceso from "../layouts/student/StudentProceso";
import StudentPrograma from "../layouts/student/StudentPrograma";
import StudentHorario from "../layouts/student/StudentHorario";
import StudentRejected from "../layouts/student/StudentRejected";

export default function StudentRoutes() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  console.log(user);

  return (

    <Routes>

      {/* APROBADO */}
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
        path="proceso"
        element={<StudentProceso />}
      />

      <Route
        path="rechazado"
        element={<StudentRejected />}
      />

    </Routes>
  );
}