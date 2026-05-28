import { Routes, Route } from "react-router-dom";

import DashboardHome from "../layouts/Dashboard";
import Postulantes from "../layouts/Postulantes";
import Cursos from "../layouts/Cursos";
import Docentes from "../layouts/Docentes";

export default function DashboardLayout() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="postulantes" element={<Postulantes />} />
      <Route path="cursos" element={<Cursos />} />
      <Route path="docentes" element={<Docentes />} />
    </Routes>
  );
}