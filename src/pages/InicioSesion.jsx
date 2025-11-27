import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { authAPI } from "../api/auth";

const InicioSesion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const response = await authAPI.login(email, password);
      
      setMensaje("🎉 ¡Inicio de sesión exitoso! Bienvenido a Pastelería 1000 Sabores 🍰");
      
      // Redirigir al home después de 1 segundo
      setTimeout(() => {
        navigate('/home');
      }, 1000);
      
    } catch (error) {
      console.error('Error en login:', error);
      setMensaje("❌ Usuario o contraseña incorrectos, inténtalo nuevamente.");
      setTimeout(() => setMensaje(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundColor: "#FFF5E1",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <div
        className="p-4 shadow rounded"
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Pacifico', cursive",
            color: "#B84E24",
          }}
        >
          Iniciar Sesión 🍰
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Ingresando...
              </>
            ) : (
              <>Entrar 🔐</>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            ¿No tienes cuenta?{' '}
            <a 
              href="/registroUsuario" 
              style={{ color: "#B84E24", fontWeight: "bold", textDecoration: "none" }}
            >
              Regístrate aquí
            </a>
          </p>
        </div>

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

export default InicioSesion;
