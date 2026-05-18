import { Routes, Route } from 'react-router-dom';

import Home from '../layouts/Home';
import Services from '../layouts/Services';
import Login from '../layouts/Login';
import Register from '../layouts/Register';
import Admisiones from '../layouts/Admisiones';
import Detalle from '../components/Detalle';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admisiones" element={<Admisiones />} />
      
      <Route path="/programa/:id" element={<Detalle />} />
    </Routes>
  );
}