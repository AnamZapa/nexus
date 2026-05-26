import { Routes, Route } from "react-router-dom";

import Home from "../layouts/Home";
import Services from "../layouts/Services";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Detalle from "../components/Detalle";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./DashboardLayouts";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/programa/:id" element={<Detalle />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD PROTEGIDO */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}