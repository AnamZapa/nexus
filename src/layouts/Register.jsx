import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../helpers/alerts";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tipoDoc: "", numeroDoc: "", email: "",
    nombres: "", apellidos: "", contrasena: "", confirmar: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.contrasena !== form.confirmar) {
      errorAlert("Las contraseñas no coinciden");
      return;
    }
    successAlert("Cuenta creada exitosamente");
    navigate("/login");
  };

  return (
    <div className="fondo">
      <div className="form-card">
        <div className="form-header">
          <span className="logo-text">🛡 NEXUS</span>
          <h2>Registro de Aspirante</h2>
          <p>Ingresa tu información</p>
        </div>
        <div className="form-body">
          <div className="input-group">
            <div className="form-field">
              <label>Tipo de documento</label>
              <select name="tipoDoc" onChange={handleChange}>
                <option value="">SELECCIONE</option>
                <option value="cc">Cédula de ciudadanía</option>
                <option value="ce">Cédula de extranjería</option>
                <option value="ti">Tarjeta de identidad</option>
              </select>
            </div>
            <div className="form-field">
              <label>Número de documento</label>
              <input name="numeroDoc" placeholder="INGRESA TU DOCUMENTO" onChange={handleChange} />
            </div>
          </div>
          <div className="form-field">
            <label>Correo electrónico</label>
            <input name="email" type="email" placeholder="INGRESE SU EMAIL" onChange={handleChange} />
          </div>
          <div className="input-group">
            <div className="form-field">
              <label>Nombres</label>
              <input name="nombres" placeholder="INGRESE SUS NOMBRES" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Apellidos</label>
              <input name="apellidos" placeholder="INGRESE SUS APELLIDOS" onChange={handleChange} />
            </div>
          </div>
          <div className="input-group">
            <div className="form-field">
              <label>Contraseña</label>
              <input name="contrasena" type="password" placeholder="ESCRIBA SU CONTRASEÑA" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Repita su contraseña</label>
              <input name="confirmar" type="password" placeholder="REPITA SU CONTRASEÑA" onChange={handleChange} />
            </div>
          </div>
          <button className="btn-registrar" onClick={handleSubmit}>Registrarme</button>
        </div>
      </div>
    </div>
  );
}