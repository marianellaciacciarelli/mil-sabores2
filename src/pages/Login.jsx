import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ navegación SPA
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // ✅ hook de React Router

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "admin" && password === "1234") {
        setMensaje("🎉 Inicio de sesión exitoso. Bienvenido a Pastelería 1000 Sabores!");
        setTimeout(() => navigate("/admin", { state: { usuarioFromLogin: usuario } }), 1000);
    } else if (usuario === "usuario" && password === "1234") { // Usa 'else if' aquí
        setMensaje("🎉 Inicio de sesión exitoso. Bienvenido a Pastelería 1000 Sabores!");
        setTimeout(() => navigate("/ofertas", { state: { usuarioFromLogin: usuario } }), 1000);
    } else { // Este 'else' captura todos los casos que no cumplen las condiciones anteriores
        setMensaje("❌ Usuario o contraseña incorrectos.");
    }
        

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <main
      className="login-container d-flex align-items-center justify-content-center min-vh-100"
    >
      <div
        className="login-card p-4 shadow rounded"
        style={{
          backgroundColor: "white",
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          color: "#5D4037",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "'Pacifico', cursive", color: "#B84E24" }}
        >
          Iniciar Sesión 🍰
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="fw-bold">Usuario</label>
          <input
            type="text"
            className="form-control mb-3"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
          />

          <label className="fw-bold">Contraseña</label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#FFC0CB",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Entrar 🔐
          </button>

          {/* Botón que navega a Registro sin recargar */}
          <button
            type="button"
            className="btn w-100"
            onClick={() => navigate("/registrousuario", { state: { usuarioFromLogin: usuario } })}
            style={{
              backgroundColor: "#FFC0CB",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Registrar 🧁
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
