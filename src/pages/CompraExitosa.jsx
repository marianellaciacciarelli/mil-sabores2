import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const CompraExitosa = () => {
  return (
    <main
      className="container text-center my-5 p-4 rounded shadow"
      style={{ backgroundColor: "#E8F5E9", maxWidth: "700px" }}
    >
      <h2 className="text-success mb-3">✅ ¡Compra realizada con éxito!</h2>
      <p>Tu pedido ha sido procesado correctamente.</p>
      <p className="fw-bold">Gracias por confiar en Pastelería 1000 Sabores 🍰</p>
      <Link to="/catalogo" className="btn btn-primary mt-3">
        Volver al catálogo
      </Link>
    </main>
  );
};

export default CompraExitosa;
