import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const CompraExitosa = () => {
  const location = useLocation();
  const orderData = location.state;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount || 0);
  };

  return (
    <main
      className="container text-center my-5 p-4 rounded shadow"
      style={{ backgroundColor: "#E8F5E9", maxWidth: "700px" }}
    >
      <div className="mb-4">
        <div className="display-1 text-success">✅</div>
        <h2 className="text-success mb-3">¡Compra realizada con éxito!</h2>
      </div>

      {orderData ? (
        <div className="card mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">📄 Detalles de tu pedido</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-start">
                <p className="mb-2">
                  <strong>Número de orden:</strong> #{orderData.orderId}
                </p>
                <p className="mb-2">
                  <strong>Cliente:</strong> {orderData.nombreCliente}
                </p>
              </div>
              <div className="col-md-6 text-start">
                <p className="mb-2">
                  <strong>Total pagado:</strong> {formatCurrency(orderData.total)}
                </p>
                <p className="mb-2">
                  <strong>Estado:</strong> 
                  <span className="badge bg-warning ms-2">Procesando</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info mb-4">
          <h5>📦 Pedido procesado correctamente</h5>
          <p className="mb-0">Revisa tu email para los detalles del pedido</p>
        </div>
      )}

      <div className="mb-4">
        <h5 className="text-primary">🎂 ¿Qué sigue ahora?</h5>
        <div className="row mt-3">
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-light rounded">
              <h6>📧 Confirmación</h6>
              <small>Recibirás un email con los detalles</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-light rounded">
              <h6>👨‍🍳 Preparación</h6>
              <small>Nuestro equipo preparará tu pedido</small>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-light rounded">
              <h6>🚚 Entrega</h6>
              <small>Te contactaremos para coordinar</small>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="fw-bold text-success">
          ¡Gracias por confiar en Pastelería 1000 Sabores! 🍰
        </p>
        <p className="text-muted">
          Tu experiencia es importante para nosotros. Esperamos que disfrutes cada bocado.
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/catalogo" className="btn btn-primary">
          🛍️ Seguir comprando
        </Link>
        {localStorage.getItem('token') && (
          <Link to="/mis-compras" className="btn btn-outline-primary">
            📋 Ver mis compras
          </Link>
        )}
        <Link to="/home" className="btn btn-outline-secondary">
          🏠 Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default CompraExitosa;
