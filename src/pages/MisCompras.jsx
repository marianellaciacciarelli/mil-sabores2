import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../api/orders';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MisCompras = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await ordersAPI.getMyOrders();
      setOrders(response);
    } catch (error) {
      console.error('Error al cargar las 贸rdenes:', error);
      
      if (error.response?.status === 401) {
        setError('Debe iniciar sesi贸n para ver sus compras');
      } else {
        setError('Error al cargar las 贸rdenes. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDIENTE: { class: 'warning', text: 'Pendiente', icon: '' },
      PAGADA: { class: 'success', text: 'Pagada', icon: '' },
      ENVIADA: { class: 'info', text: 'Enviada', icon: '' },
      ENTREGADA: { class: 'primary', text: 'Entregada', icon: '' },
      CANCELADA: { class: 'danger', text: 'Cancelada', icon: '' }
    };

    const config = statusConfig[status] || statusConfig.PENDIENTE;
    
    return (
      <span className={`badge bg-${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error(error)
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  if (loading) {
    return (
      <main className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando sus compras...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading"> Error</h4>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-primary" onClick={loadUserOrders}>
               Intentar nuevamente
            </button>
            <Link to="/login" className="btn btn-outline-secondary">
               Iniciar sesi贸n
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-12">
          <div 
            className="text-center mb-4 p-4 rounded"
            style={{ backgroundColor: '#FFF5E1' }}
          >
            <h2 
              className="mb-2" 
              style={{ color: '#8B4513', fontFamily: 'Pacifico, cursive' }}
            >
              Mis Compras
            </h2>
            <p className="text-muted">Historial de todas tus 贸rdenes</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center">
              <div className="alert alert-info" role="alert">
                <h4>馃摑 Sin compras registradas</h4>
                <p>A煤n no has realizado ninguna compra.</p>
                <Link to="/catalogo" className="btn btn-primary">
                  Explorar productos
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div key={order.id} className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-light">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="mb-0">
                            馃搫 Orden #{order.id}
                          </h6>
                          <small className="text-muted">
                            {formatDate(order.fechaVenta)}
                          </small>
                        </div>
                        <div className="col-auto">
                          {getStatusBadge(order.estado)}
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Informaci贸n del cliente */}
                      <div className="mb-3">
                        <h6 className="text-muted">Cliente:</h6>
                        <p className="mb-1">{order.nombreCliente}</p>
                        {order.emailCliente && (
                          <small className="text-muted">馃摟 {order.emailCliente}</small>
                        )}
                      </div>

                      {/* Direcci贸n de env铆o */}
                      {order.direccionEnvio && (
                        <div className="mb-3">
                          <h6 className="text-muted">Direcci贸n de env铆o:</h6>
                          <p className="small">{order.direccionEnvio}</p>
                        </div>
                      )}

                      {/* Productos */}
                      <div className="mb-3">
                        <h6 className="text-muted">Productos:</h6>
                        {order.detalles && order.detalles.length > 0 ? (
                          <ul className="list-unstyled mb-0">
                            {order.detalles.map((detalle, index) => (
                              <li key={index} className="small d-flex justify-content-between">
                                <span>
                                  {detalle.producto?.nombre || `Producto ID: ${detalle.productoId}`} 
                                  <span className="text-muted"> (x{detalle.cantidad})</span>
                                </span>
                                <span>
                                  {formatCurrency(detalle.precio * detalle.cantidad)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="small text-muted">Productos no disponibles</p>
                        )}
                      </div>
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>Total: {formatCurrency(order.total)}</strong>
                        <div>
                          {order.estado === 'ENTREGADA' && (
                            <button className="btn btn-outline-success btn-sm me-2">
                              Calificar
                            </button>
                          )}
                          <button className="btn btn-outline-primary btn-sm">
                            Detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bot贸n para volver */}
          <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline-primary">
              馃彔 Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MisCompras;
