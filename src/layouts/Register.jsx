import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h2>Registro</h2>

      <p>
        ¿Ya tienes cuenta?
        <Link to="/login"> Inicia sesión</Link>
      </p>
    </div>
  );
}