import Sidebar from "../components/admin/Sidebar";
import "../styles/adminLayout.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">
        <div className="admin-page">
          {children}
        </div>
      </main>
    </div>
  );
}