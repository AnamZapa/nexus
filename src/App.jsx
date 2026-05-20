import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {

  const location = useLocation();

  const isAdmin =
    location.pathname.startsWith("/dashboard");

  return (

    <div>
      {!isAdmin && <Navbar />}
      <AppRoutes />
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {

  return (
    <Router>
      <Layout />
    </Router>
  );
}