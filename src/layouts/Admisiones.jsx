// src/layouts/Admisiones.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../helpers/alerts";
import { apiFetch, endpoints } from "../services/api";
import { careers } from "../data/career";

export default function Admisiones() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipoDoc: "",
    numeroDoc: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    carrera: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !form.tipoDoc ||
      !form.numeroDoc ||
      !form.nombres ||
      !form.apellidos ||
      !form.email ||
      !form.telefono ||
      !form.carrera
    ) {
      errorAlert("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);

      await apiFetch(endpoints.inscripcion, {
        method: "POST",
        body: JSON.stringify(form),
      });

      successAlert("¡Inscripción realizada con éxito! Pronto nos comunicaremos contigo.");
      navigate("/");
    } catch (error) {
      errorAlert("Ocurrió un error al enviar tu inscripción. Intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fondo">
      <div className="form-card">
        <div className="form-header">
          <span className="logo-text">🛡 NEXUS</span>
          <h2>Formulario de Inscripción</h2>
          <p>Completa tus datos para inscribirte en un programa académico</p>
        </div>

        <div className="form-body">

          {/* Tipo y número de documento */}
          <div className="input-group">
            <div className="form-field">
              <label>Tipo de documento</label>
              <select name="tipoDoc" value={form.tipoDoc} onChange={handleChange}>
                <option value="">SELECCIONE</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
              </select>
            </div>
            <div className="form-field">
              <label>Número de documento</label>
              <input
                name="numeroDoc"
                placeholder="INGRESA TU DOCUMENTO"
                value={form.numeroDoc}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Nombres y apellidos */}
          <div className="input-group">
            <div className="form-field">
              <label>Nombres</label>
              <input
                name="nombres"
                placeholder="INGRESE SUS NOMBRES"
                value={form.nombres}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Apellidos</label>
              <input
                name="apellidos"
                placeholder="INGRESE SUS APELLIDOS"
                value={form.apellidos}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email y teléfono */}
          <div className="input-group">
            <div className="form-field">
              <label>Correo electrónico</label>
              <input
                name="email"
                type="email"
                placeholder="INGRESE SU EMAIL"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Teléfono / Celular</label>
              <input
                name="telefono"
                type="tel"
                placeholder="INGRESE SU TELÉFONO"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Carrera */}
          <div className="form-field">
            <label>Programa académico de interés</label>
            <select name="carrera" value={form.carrera} onChange={handleChange}>
              <option value="">SELECCIONE UN PROGRAMA</option>
              {careers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-registrar"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Inscripción"}
          </button>

        </div>
      </div>
    </div>
  );
}