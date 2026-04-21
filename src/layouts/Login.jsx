import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, endpoints } from "../services/api";
import { successAlert, errorAlert } from "../helpers/alerts";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await apiFetch(endpoints.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", "fake-token");

      successAlert("Login exitoso");

      navigate("/services");

    } catch (error) {
      errorAlert("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tienes cuenta?
        <Link to="/register"> Regístrate aquí</Link>
      </p>
    </div>
  );
}