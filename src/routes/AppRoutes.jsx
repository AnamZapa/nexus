import { Routes, Route } from 'react-router-dom';

import Home from '../layouts/Home';
import Services from '../layouts/Services';
import Login from '../layouts/Login';
import Register from '../layouts/Register';

import Postulantes from '../layouts/Postulantes';

import Detalle from '../components/Detalle';

import ProtectedRoute from "./ProtectedRoute";
import DashboardHome from "../layouts/Dashboard";

export default function AppRoutes() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/services" element={<Services />} />

      <Route
        path="/programa/:id"
        element={<Detalle />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
      path="/dashboard"
      element={
      <ProtectedRoute>
      <DashboardHome />
      </ProtectedRoute>
  }
/>

      <Route
        path="/dashboard/postulantes"
        element={<Postulantes />}
      />

    </Routes>
  );
}