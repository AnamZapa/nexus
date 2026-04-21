import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav>
      <h3>Menú</h3>

      <NavLink to="/login">Login</NavLink>
      <br />

      <NavLink to="/register">Register</NavLink>
      <br />

      <NavLink to="/services">Servicios</NavLink>
    </nav>
  );
}