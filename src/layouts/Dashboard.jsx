import Sidebar from "../components/admin/Sidebar";

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

      </main>

    </div>
  );
};

export default Dashboard;