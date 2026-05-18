import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {

  const location = useLocation();

  // Rutas donde NO quieres navbar/footer
  const isDashboard =
    location.pathname === "/dashboard";

  return (

    <div className="page-wrapper">

      {!isDashboard && <Navbar />}

      <AppRoutes />

      {!isDashboard && <Footer />}

    </div>
  );
}

function App() {

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
