import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompraExitosa = () => {
  return (
    <main
      className="container py-5"
      style={{
        backgroundColor: "#FFF5E1",
        color: "#5D4037",
        fontFamily: "Lato, sans-serif",
      }}
    >
      {/* Encabezado */}
      <header className="text-center mb-5">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#B84E24" }}>
          🧾 ¡Compra Realizada con Éxito!
        </h1>
        <p className="lead">
          Gracias por preferir <strong>Pastelería 1000 Sabores</strong>.  
          Tu pedido ha sido procesado correctamente.
        </p>
      </header>

      {/* Información del cliente */}
      <section className="mb-5">
        <h2
          className="p-2 rounded"
          style={{ backgroundColor: "#FFCC8B", color: "#5D4037" }}
        >
          Información del Cliente
        </h2>
        <div className="row mt-3">
          <div className="col-md-6">
            <p><strong>Nombre:</strong> María José Pino</p>
            <p><strong>Correo:</strong> mjpino@example.com</p>
          </div>
          <div className="col-md-6">
            <p><strong>Región:</strong> Metropolitana de Santiago</p>
            <p><strong>Comuna:</strong> Cerrillos</p>
          </div>
        </div>
      </section>

      {/* Resumen de la compra */}
      <section>
        <h2
          className="p-2 rounded"
          style={{ backgroundColor: "#FFD8A8", color: "#5D4037" }}
        >
          Resumen de la Compra
        </h2>

        <table className="table table-striped table-bordered mt-3">
          <thead style={{ backgroundColor: "#FFCC8B" }}>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="/img/torta_selva.jpg"
                  alt="Torta Selva Negra"
                  width="60"
                />
              </td>
              <td>Torta Selva Negra</td>
              <td>$18.000</td>
              <td>1</td>
              <td>$18.000</td>
            </tr>
            <tr>
              <td>
                <img
                  src="/img/mini_cheesecake.jpg"
                  alt="Mini Cheesecake"
                  width="60"
                />
              </td>
              <td>Mini Cheesecake</td>
              <td>$3.500</td>
              <td>2</td>
              <td>$7.000</td>
            </tr>
          </tbody>
        </table>

        <div className="text-end mt-4">
          <h4>
            <strong>Total Pagado: $25.000</strong>
          </h4>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn mx-2"
            style={{
              backgroundColor: "#28A745",
              color: "white",
              borderRadius: "8px",
            }}
          >
            📄 Imprimir Boleta en PDF
          </button>
          <button
            className="btn mx-2"
            style={{
              backgroundColor: "#F9A826",
              color: "white",
              borderRadius: "8px",
            }}
          >
            ✉️ Enviar Boleta por Correo
          </button>
        </div>
      </section>

      {/* Mensaje final */}
      <footer className="text-center mt-5">
        <p className="fw-semibold">
          💕 ¡Esperamos que disfrutes tus productos y vuelvas pronto!
        </p>
      </footer>
    </main>
  );
};

export default CompraExitosa;
