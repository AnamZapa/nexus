import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import DashboardHome from "../layouts/Dashboard";
import Postulantes from "../layouts/Postulantes";

export default function DashboardLayout() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="postulantes" element={<Postulantes />} />
      </Routes>
    </AdminLayout>
  );
}