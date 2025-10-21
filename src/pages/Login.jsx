import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Login = () => {
  const [form, setForm] = useState({ usuario: "", contrasena: "", recordarme: false });
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.usuario && form.contrasena) {
      setExito(true);
      setForm({ usuario: "", contrasena: "", recordarme: false });
      setTimeout(() => setExito(false), 3000); // Oculta mensaje después de 3 segundos
    } else {
      setExito(false);
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="login-card" style={styles.card}>
        <h2 className="text-center mb-4" style={styles.title}>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Ingresa tu usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Ingresa tu contraseña"
            value={form.contrasena}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="recordarme"
              name="recordarme"
              checked={form.recordarme}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="recordarme" className="form-check-label">
              Recordarme
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Iniciar Sesión
          </button>
        </form>

        {exito && (
          <div className="alert alert-success mt-3 text-center">
            🎉 ¡Inicio de sesión exitoso! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

// 🎨 Estilos en objeto JS (puedes pasarlos al CSS si prefieres)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#FFF5E1",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    padding: "2rem",
    maxWidth: "400px",
    width: "100%",
    color: "#5D4037",
    fontFamily: "'Lato', sans-serif",
  },
  title: {
    fontFamily: "'Pacifico', cursive",
    color: "#5D4037",
  },
};
