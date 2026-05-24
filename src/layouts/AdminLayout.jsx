import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({ children }) {

  return (

    <div className="admin-layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Contenido */}

      <main className="admin-content">

        {children}

      </main>

    </div>

  );

}