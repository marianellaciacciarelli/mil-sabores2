import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">🛒 Finalizar compra</h2>

      {/* FORMULARIO DE CLIENTE */}
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" placeholder="Ej: María José" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input type="text" className="form-control" placeholder="Ej: Pino" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" placeholder="ejemplo@email.com" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Región</label>
          <select className="form-select">
            <option>Seleccionar...</option>
            <option>Región Metropolitana</option>
            <option>Valparaíso</option>
            <option>Biobío</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Comuna</label>
          <input type="text" className="form-control" placeholder="Ej: Cerrillos" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" placeholder="Ej: Av. Siempre Viva 742" />
        </div>
      </form>

      {/* SEPARADOR */}
      <hr className="my-5" />

      {/* TABLA DE PRODUCTOS */}
      <h4 className="mb-3 fw-semibold">Resumen del carrito</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="https://via.placeholder.com/50" alt="Producto" /></td>
              <td>Torta de Chocolate</td>
              <td>1</td>
              <td>$12.000</td>
              <td>$12.000</td>
            </tr>
            <tr>
              <td><img src="https://via.placeholder.com/50" alt="Producto" /></td>
              <td>Cheesecake de Frambuesa</td>
              <td>2</td>
              <td>$9.000</td>
              <td>$18.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TOTAL Y BOTÓN */}
      <div className="text-end mt-4">
        <h5 className="fw-bold">Total a pagar: $30.000</h5>
        <button type="button" className="btn btn-success mt-3 px-4">
          💳 Pagar ahora
        </button>
      </div>

      <footer className="text-center mt-5 text-muted small">
        <p>
          Gracias por confiar en <strong>Pastelería 1000 Sabores</strong> 💚
        </p>
      </footer>
    </div>
  );
};

export default Checkout;

