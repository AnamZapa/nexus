import Sidebar from "../components/admin/Sidebar";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (

    <div className="admin-container">

      <Sidebar />

      <main className="dashboard-content">

        <h1>Panel Administrativo</h1>

        <div className="cards-container">

          <div className="admin-card">
            <h3>Total Postulantes</h3>
            <p>1250</p>
          </div>

          <div className="admin-card">
            <h3>Aprobados</h3>
            <p>700</p>
          </div>

          <div className="admin-card">
            <h3>Pendientes</h3>
            <p>320</p>
          </div>

        </div>

        {/* Outlet for nested dashboard routes (e.g. /dashboard/postulantes) */}
        <Outlet />
      </main>

    </div>
  );
};

export default Dashboard;