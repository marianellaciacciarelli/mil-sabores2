import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CompraFallida = () => {
  return (
    <main
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5E1",
        backgroundImage:
          "url('https://i.pinimg.com/originals/7b/64/57/7b64572cf6e4cfd7aabf3e7b9600b3a8.jpg')", // nuevo fondo pastel cupcakes
        backgroundRepeat: "repeat",
        backgroundSize: "300px",
        fontFamily: "'Lato', sans-serif",
        padding: "20px",
      }}
    >
      <div
        className="p-5 bg-white shadow rounded text-center"
        style={{
          maxWidth: 600,
          border: "2px solid #FFDFA0",
          backgroundColor: "#fffaf0cc", // fondo blanco crema translúcido
        }}
      >
        <h1
          className="mb-3"
          style={{
            color: "#E53935",
            fontFamily: "'Pacifico', cursive",
          }}
        >
          ⚠️
 Compra fallida
        </h1>

        <p style={{ color: "#5D4037", fontSize: "18px" }}>
          La tarjeta ingresada está <strong>vencida</strong> o no es válida.
          Por favor revisa la fecha de vencimiento o utiliza otra tarjeta para continuar.
        </p>

        <div className="mt-4">
          <Link to="/checkout" className="btn btn-warning px-4">
            🔁
 Volver a intentar
          </Link>
        </div>

        <footer className="mt-4" style={{ color: "#8B4E24" }}>
          ❤️
 Pastelería 1000 Sabores — endulzando momentos desde 1975 ❤️

        </footer>
      </div>
    </main>
  );
};

export default CompraFallida;
