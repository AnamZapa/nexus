import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {

  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/student");

  return (

    <div>

      {!isDashboard && <Navbar />}

      <AppRoutes />

      {!isDashboard && <Footer />}

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