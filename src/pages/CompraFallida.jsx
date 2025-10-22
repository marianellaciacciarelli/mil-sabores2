import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompraFallida = () => {
  return (
    <main
      className="container py-4"
      style={{ backgroundColor: "#FFF5E1", minHeight: "100vh", fontFamily: "Lato, sans-serif" }}
    >
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "Pacifico, cursive", color: "#B84A39" }}>
          ❌ No se pudo realizar el pago
        </h1>
        <p className="lead text-muted">
          Hubo un problema al procesar tu compra. Inténtalo nuevamente más tarde.
        </p>
      </header>

      <section className="p-4 bg-white rounded shadow-sm mb-4">
        <h4 style={{ color: "#B84A39" }}>Detalles del intento de compra</h4>
        <p className="mb-1"><strong>Código de orden:</strong> #20240705</p>
        <p className="mb-1"><strong>Cliente:</strong> Pedro Hacker</p>
        <p className="mb-3"><strong>Correo:</strong> pedro.hacke20@example.com</p>

        <h5 className="mt-4" style={{ color: "#B84A39" }}>Productos seleccionados</h5>
        <table className="table table-bordered text-center mt-3">
          <thead className="table-warning">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="/img/pastel1.png" alt="Pastel" width="50" /></td>
              <td>Cheesecake Frutilla</td>
              <td>$5.990</td>
              <td>1</td>
              <td>$5.990</td>
            </tr>
            <tr>
              <td><img src="/img/pastel2.png" alt="Pastel" width="50" /></td>
              <td>Brownie Tradicional</td>
              <td>$4.990</td>
              <td>1</td>
              <td>$4.990</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4" className="text-end">Total pagado:</th>
              <th>$10.980</th>
            </tr>
          </tfoot>
        </table>
      </section>

      <div className="text-center">
        <button
          onClick={() => window.location.href = "/checkout"}
          className="btn btn-warning me-2"
        >
          🔄 Volver a intentar el pago
        </button>

        <button
          onClick={() => window.location.href = "/"}
          className="btn btn-outline-danger"
        >
          🏠 Volver al inicio
        </button>
      </div>

      <footer className="text-center mt-5">
        <small style={{ color: "#6c757d" }}>
          © 2025 Pastelería 1000 Sabores — Dulzura que alegra cada momento 🍰
        </small>
      </footer>
    </main>
  );
};

export default CompraFallida;
