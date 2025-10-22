import React, { useState } from "react";
import Footer from '../components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === "admin" && password === "1234") {
      setMensaje("🎉 Inicio de sesión exitoso. Bienvenido a Pastelería 1000 Sabores!");
    } else {
      setMensaje("❌ Usuario o contraseña incorrectos.");
    }
    setTimeout(() => setMensaje(""), 3000);
    setUsuario("");
    setPassword("");
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        fontFamily: "Lato, sans-serif",
      }}
    >
      <div
        className="p-4 shadow rounded"
        style={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "'Pacifico', cursive", color: "#B84E24" }}
        >
          Iniciar Sesión 🍰
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#F9A826",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Entrar 🔐
          </button>
        </form>

        {mensaje && (
          <div
            className={`alert mt-3 text-center ${
              mensaje.includes("exitoso") ? "alert-success" : "alert-danger"
            }`}
          >
            {mensaje}
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
