import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function App() {

  const token = localStorage.getItem("token");

  return (
    <div>
      <Sidebar />

      <main>
        <Outlet />
      </main>

      <Footer />

      {token && <p>Sesión activa</p>}
    </div>
  );
}

