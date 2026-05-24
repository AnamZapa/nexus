import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {

  // Verificar si existe token
  const token = localStorage.getItem("token");

  // Si NO hay token → redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si sí hay token → muestra la página
  return children;
}