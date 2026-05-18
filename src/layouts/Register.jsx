// src/layouts/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../helpers/alerts";
import { apiFetch, endpoints } from "../services/api";
import "../styles/Login.css";

const INITIAL_FORM = {
  tipoDoc: "",
  numeroDoc: "",
  email: "",
  nombres: "",
  apellidos: "",
  contrasena: "",
  confirmar: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setForm(INITIAL_FORM);

  const isFormValid = () => Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      errorAlert("Por favor completa todos los campos.");
      return;
    }

    if (form.contrasena !== form.confirmar) {
      errorAlert("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      await apiFetch(endpoints.registro, {
        method: "POST",
        body: JSON.stringify({
          tipoDoc: form.tipoDoc,
          numeroDoc: form.numeroDoc,
          email: form.email,
          nombres: form.nombres,
          apellidos: form.apellidos,
          contrasena: form.contrasena,
        }),
      });

      successAlert("¡Cuenta creada exitosamente!");
      handleReset();
      navigate("/login");
    } catch (error) {
      errorAlert("Error al crear la cuenta. Intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fondo">
      <div className="contenedor-login" style={{ maxWidth: "500px" }}>

        <div className="encabezado">
          <div className="logo">🛡 NEXUS</div>
          <h2>Registro de Aspirante</h2>
          <p>Ingresa tu información</p>
        </div>

        <form onSubmit={handleSubmit}>

          <select name="tipoDoc" value={form.tipoDoc} onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", marginBottom: "12px", fontSize: "14px" }}>
            <option value="">TIPO DE DOCUMENTO</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="TI">Tarjeta de identidad</option>
          </select>

          <input
            name="numeroDoc"
            placeholder="NÚMERO DE DOCUMENTO"
            value={form.numeroDoc}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="nombres"
            placeholder="NOMBRES"
            value={form.nombres}
            onChange={handleChange}
          />

          <input
            name="apellidos"
            placeholder="APELLIDOS"
            value={form.apellidos}
            onChange={handleChange}
          />

          <input
            name="contrasena"
            type="password"
            placeholder="CONTRASEÑA"
            value={form.contrasena}
            onChange={handleChange}
          />

          <input
            name="confirmar"
            type="password"
            placeholder="REPITA SU CONTRASEÑA"
            value={form.confirmar}
            onChange={handleChange}
          />

          <div className="botones">
            <button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarme"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}