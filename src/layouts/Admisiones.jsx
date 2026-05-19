// src/layouts/Admisiones.jsx

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { successAlert, errorAlert } from "../helpers/alerts";
import { apiFetch, endpoints } from "../services/api";
import { careers } from "../data/career";
import "../styles/Login.css";
import logoNexus from "../assets/imagenes/logo nexus blanco-01.png";

const INITIAL_FORM = {
  tipoDoc: "",
  numeroDoc: "",
  fechaNacimiento: "",
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  carrera: "",
};

export default function Admisiones() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    carrera: searchParams.get("carrera") ?? "",
  });

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

    try {
      setLoading(true);
      await apiFetch(endpoints.inscripcion, {
        method: "POST",
        body: JSON.stringify(form),
      });
      successAlert("¡Inscripción realizada con éxito! Pronto nos comunicaremos contigo.");
      handleReset();
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
      <div className="contenedor-login" style={{ maxWidth: "500px" }}>

        <div className="encabezado">
            <img src={logoNexus} alt="Logo Nexus" className="logo-img" />
            <h2>Formulario de Inscripción</h2>
            <p>Completa tus datos para inscribirte en un programa académico</p>
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
            name="fechaNacimiento"
            type="date"
            placeholder="FECHA DE NACIMIENTO"
            value={form.fechaNacimiento}
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
            name="email"
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="telefono"
            type="tel"
            placeholder="TELÉFONO / CELULAR"
            value={form.telefono}
            onChange={handleChange}
          />

          <select name="carrera" value={form.carrera} onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", marginBottom: "12px", fontSize: "14px" }}>
            <option value="">PROGRAMA ACADÉMICO</option>
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <div className="botones">
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Inscripción"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}