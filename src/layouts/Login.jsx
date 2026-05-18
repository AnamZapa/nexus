import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoNexus from "../assets/Imagenes/logo nexus blanco-01.png";
import fondoPantalla from "../assets/Imagenes/Fondo Página.jpeg";

// ── Credenciales mock (reemplazar por apiFetch cuando haya BD) ──
const USUARIOS = [
  { email: "admin@univ.edu", password: "admin123", rol: "admin", nombre: "Administrador" },
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

        // Busca coincidencia en mock (quitar esto cuando haya BD)
        const usuario = USUARIOS.find(
            (u) => u.email === email && u.password === password);

        if (usuario) {
            // Guarda sesión básica en localStorage
            localStorage.setItem("token", "mock-token");
            localStorage.setItem("usuario", JSON.stringify(usuario));
            navigate(usuario.rol === "admin" ? "/dashboard" : "/services");
        } else {
            setError(
                "Credenciales incorrectas."
            );
        }

        // ── Cuando tengas BD, reemplaza el bloque de arriba por esto: ──
        // try {
        //     const res = await apiFetch(endpoints.login, {
        //         method: "POST",
        //         body: JSON.stringify({ email, password, rol }),
        //     });
        //     localStorage.setItem("token", res.token);
        //     localStorage.setItem("usuario", JSON.stringify(res.usuario));
        //     navigate(rol === "admin" ? "/dashboard" : "/services");
        // } catch {
        //     setError("Credenciales inválidas");
        // }
    };

    return (
        <div className="fondo"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(15, 42, 67, 0.8), #000), url(${fondoPantalla})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden'
            }}>
            <div className={`contenedor-login ${rol}`}>

                <div className="encabezado">
                    <Link className="logo" to="/">
                        <img src={logoNexus} alt="Logo Nexus" className="logo-img" />
                    </Link>
                    <h2>Portal Admisiones</h2>
                    <p>Bienvenido al sistema de acceso universitario</p>
                </div>

                <div className="selector">
                    <button type="button" className={rol === "estudiante" ? "activo" : ""}
                        onClick={() => setRol("estudiante")}>
                        Estudiante
                    </button>
                    <button type="button" className={rol === "admin" ? "activo" : ""}
                        onClick={() => setRol("admin")}>
                        Personal Administrativo
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email"
                        id="email"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Mensaje de error */}
                    {error && (
                        <p style={{ color: "#f87171", fontSize: 13, margin: "4px 0 0" }}>
                            {error}
                        </p>
                    )}

                    <div className="botones">
                        <button type="submit">Iniciar Sesión</button>
                        <button type="button" onClick={() => navigate("/register")}>
                            Crear cuenta
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}