import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoNexus from "../assets/imagenes/logo nexus blanco-01.png";
import fondoPantalla from "../assets/imagenes/Fondo Página.jpeg";

// ── Usuarios MOCK ──
const USUARIOS = [
  {
    email: "admin@univ.edu",
    password: "admin123",
    rol: "admin",
    nombre: "Administrador",
  },

  // 👇 ESTUDIANTE APROBADO
  {
    email: "estudiante@univ.edu",
    password: "123456",
    rol: "estudiante",
    nombre: "Ana Gómez",
    estado: "Aprobado",
  },
];

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [rol, setRol] = useState("admin");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Buscar usuario
    const usuario = USUARIOS.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.rol === rol
    );

    if (usuario) {

      // Guardar sesión
      localStorage.setItem("token", "mock-token");

      // 👇 IMPORTANTE: guardar como "user"
      localStorage.setItem(
        "user",
        JSON.stringify(usuario)
      );

      // Redirecciones
      if (usuario.rol === "admin") {

        navigate("/dashboard");

      } else {

        navigate("/student");

      }

    } else {

      setError("Credenciales incorrectas.");

    }
  };

  return (

    <div
      className="fondo"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(15, 42, 67, 0.8), #000), url(${fondoPantalla})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >

      <div className={`contenedor-login ${rol}`}>

        {/* HEADER */}
        <div className="encabezado">

          <Link className="logo" to="/">
            <img
              src={logoNexus}
              alt="Logo Nexus"
              className="logo-img"
            />
          </Link>

          <h2>Portal Admisiones</h2>

          <p>
            Bienvenido al sistema de acceso universitario
          </p>

        </div>

        {/* SELECTOR */}
        <div className="selector">

          <button
            type="button"
            className={rol === "estudiante" ? "activo" : ""}
            onClick={() => setRol("estudiante")}
          >
            Estudiante
          </button>

          <button
            type="button"
            className={rol === "admin" ? "activo" : ""}
            onClick={() => setRol("admin")}
          >
            Personal Administrativo
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <label htmlFor="email">
            Correo Electrónico
          </label>

          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">
            Contraseña
          </label>

          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ERROR */}
          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: 13,
                margin: "4px 0 0",
              }}
            >
              {error}
            </p>
          )}

          {/* BOTONES */}
          <div className="botones">

            <button type="submit">
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Crear cuenta
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}