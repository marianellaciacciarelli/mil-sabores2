import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    run: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    fechaNacimiento: "",
    direccion: "",
    comuna: "",
    tipoUsuario: "",
    codigoDcto: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (formData.password !== formData.confirmarPassword) {
      setMensaje("⚠️ Las contraseñas no coinciden");
      return;
    }

    // Validación simple de campos vacíos
    if (Object.values(formData).some((campo) => campo === "")) {
      setMensaje("⚠️ Por favor completa todos los campos");
      return;
    }

    // Si todo está bien
    setMensaje("✅ Registro completado con éxito!");
    setFormData({
      nombre: "",
      apellido: "",
      run: "",
      correo: "",
      password: "",
      confirmarPassword: "",
      fechaNacimiento: "",
      direccion: "",
      comuna: "",
      tipoUsuario: "",
      codigoDcto: "",
    });
  };

  return (
    <div
      className="body-registro"
      style={{
        backgroundColor: "#FFF5E1",
        color: "#5D4037",
        fontFamily: "'Lato', sans-serif",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
      <div className="container my-5">
        <div className="text-center mb-4">
          <img src="/img/logo-reg.png" width="100" alt="Logo Pastelería" />
        </div>

        <h2 className="text-center mb-4" style={{ color: "#594621" }}>
          Registro de Usuario
        </h2>

        <div
          className="card shadow p-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            minHeight: "600px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ej: María José"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apellido">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Ej: Vásquez Araya"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="run">Run</label>
              <input
                type="text"
                className="form-control"
                id="run"
                placeholder="Ej: 12345678-9"
                value={formData.run}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Ej: mariav@duocuc.cl"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="4 a 10 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="confirmarPassword"
                placeholder="Repite la contraseña"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comuna">Comuna</label>
              <input
                type="text"
                className="form-control"
                id="comuna"
                value={formData.comuna}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoUsuario">Tipo de Usuario</label>
              <select
                className="form-control"
                id="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="codigoDcto">Código de Descuento</label>
              <input
                type="text"
                className="form-control"
                id="codigoDcto"
                value={formData.codigoDcto}
                onChange={handleChange}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#d9bc83" }}
              >
                Registrarse
              </button>
            </div>

            {mensaje && (
              <div className="alert alert-info mt-3 text-center">{mensaje}</div>
            )}
          </form>
        </div>
      </div>

      <footer
        className="text-center p-4 mt-4"
        style={{ backgroundColor: "#FFC0CB" }}
      >
        © 2025 Pastelería 1000 Sabores — Todos los derechos reservados
      </footer>
    </div>
  );
};

