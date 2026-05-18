import { Routes, Route } from 'react-router-dom';

import Home from '../layouts/Home';
import Services from '../layouts/Services';
import Login from '../layouts/Login';
import Register from '../layouts/Register';
import Dashboard from '../layouts/Dashboard';
import Detalle from '../components/Detalle';
import Admisiones from '../layouts/Admisiones';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/programa/:id" element={<Detalle />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admisiones" element={<Admisiones />} />
    </Routes>
  );
}