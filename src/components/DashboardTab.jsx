import { useEffect, useState } from "react";
import { ordersAPI } from "../api/orders";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount || 0);

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error(error);
    return dateString;
  }
};

const getStatusBadge = (status) => {
  const statusConfig = {
    PENDIENTE: { class: "warning", text: "Pendiente" },
    PAGADA: { class: "success", text: "Pagada" },
    ENVIADA: { class: "info", text: "Enviada" },
    ENTREGADA: { class: "primary", text: "Entregada" },
    CANCELADA: { class: "danger", text: "Cancelada" },
  };

  const config = statusConfig[status] || statusConfig.PENDIENTE;

  return <span className={`badge bg-${config.class}`}>{config.text}</span>;
};

export default function DashboardTab() {
  const [ventas, setVentas] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  const loadDashboardData = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");
      const ventasData = await ordersAPI.getOrders();
      setVentas(ventasData);
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
      setDashboardError("Error al cargar datos de ventas");
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div>
      {/* Header del Dashboard */}
      <div className="row mb-4 p-3 rounded" style={{ backgroundColor: "#FFF5E1" }}>
        <div className="col-12 text-center">
          <h2
            className="mb-2"
            style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}
          >
            Dashboard de Ventas
          </h2>
          <p className="text-muted">Gestión de órdenes y ventas</p>
          {dashboardError && <div className="alert alert-warning">{dashboardError}</div>}
        </div>
      </div>

      {dashboardLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Resumen estadístico */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card text-center h-100">
                <div className="card-body bg-success text-white">
                  <h5>Total Ventas</h5>
                  <h3>{ventas.length}</h3>
                  <small>Órdenes registradas</small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-center h-100">
                <div className="card-body bg-info text-white">
                  <h5>Ingresos Totales</h5>
                  <h3>
                    {formatCurrency(
                      ventas.reduce((sum, venta) => sum + (venta.total || 0), 0)
                    )}
                  </h3>
                  <small>Suma total</small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-center h-100">
                <div className="card-body bg-warning text-white">
                  <h5>Pendientes</h5>
                  <h3>{ventas.filter((v) => v.estado === "PENDIENTE").length}</h3>
                  <small>Por procesar</small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-center h-100">
                <div className="card-body bg-primary text-white">
                  <h5>Entregadas</h5>
                  <h3>{ventas.filter((v) => v.estado === "ENTREGADA").length}</h3>
                  <small>Completadas</small>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de ventas */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Últimas Ventas</h5>
                </div>
                <div className="card-body">
                  {ventas.length === 0 ? (
                    <div className="text-center text-muted">
                      No hay ventas registradas
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Productos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ventas.map((venta) => (
                            <tr key={venta.id}>
                              <td>
                                <strong>#{venta.id}</strong>
                              </td>
                              <td>{formatDate(venta.fecha)}</td>
                              <td>{venta.nombreCliente}</td>
                              <td>
                                <small className="text-muted">{venta.emailCliente}</small>
                              </td>
                              <td>
                                <strong>{formatCurrency(venta.total)}</strong>
                              </td>
                              <td>{getStatusBadge(venta.estado)}</td>
                              <td>
                                <small>
                                  {venta.detalles?.length || 0} productos
                                  {venta.detalles && venta.detalles.length > 0 && (
                                    <div className="mt-1">
                                      {venta.detalles.map((detalle, idx) => (
                                        <div key={idx} className="text-muted">
                                          {detalle.nombreProducto} (x{detalle.cantidad})
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </small>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-outline-primary" onClick={loadDashboardData}>
          Actualizar Dashboard
        </button>
      </div>
    </div>
  );
}
