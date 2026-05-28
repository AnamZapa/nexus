import React from 'react';
import { LayoutDashboard, GraduationCap, BookOpen, Calendar, LogOut, Shield } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Shield />
          <span className="logo-inner-n">N</span>
        </div>
        <span className="brand-name">NEXUS</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <LayoutDashboard />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <GraduationCap />
              <span>Mi proceso</span>
            </a>
          </li>
          <li className="nav-item active">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <BookOpen />
              <span>Mi programa</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
              <Calendar />
              <span>Horario</span>
            </a>
          </li>
          <li className="nav-item logout-item">
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onLogout(); }}>
              <LogOut />
              <span>Cerrar sesión</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <span className="status-indicator"></span>
        <span>Base de Datos Conectada</span>
      </div>
    </aside>
  );
}
