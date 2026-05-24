import AdminLayout from "./AdminLayout";
import "../styles/admin.css";

const DashboardHome = () => {

  return (

    <AdminLayout>

      <div>

        <h1 className="dashboard-title">
          Panel Administrativo
        </h1>

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

      </div>

    </AdminLayout>

  );
};

export default DashboardHome;