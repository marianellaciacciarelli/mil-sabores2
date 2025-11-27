import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reportsAPI } from "../api/reports";
import axios from "axios";

export default function Admin() {
  const navigate = useNavigate();

  // Estado para el dashboard
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesSummary, setSalesSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [stockStatus, setStockStatus] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  // Estados para gestión de productos
  const [productos, setProductos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    rutaImagen: "",
    destacado: false,
    categoriaId: ""
  });

  // Bloqueo de acceso
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Cargar productos
  useEffect(() => {
    if (activeTab === 'productos') {
      loadProducts();
    }
  }, [activeTab]);

  // Cargar dashboard
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);

  const loadProducts = () => {
    axios
      .get("http://localhost:8080/api/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos", err));
  };

  const loadDashboardData = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");

      const [
        summaryResponse,
        topProductsResponse,
        categoriesResponse,
        clientsResponse,
        stockResponse
      ] = await Promise.all([
        reportsAPI.getSalesSummary().catch(err => ({ error: err.message })),
        reportsAPI.getTopProducts().catch(err => ({ error: err.message })),
        reportsAPI.getSalesByCategory().catch(err => ({ error: err.message })),
        reportsAPI.getTopClients().catch(err => ({ error: err.message })),
        reportsAPI.getStockStatus().catch(err => ({ error: err.message }))
      ]);

      if (!summaryResponse.error) setSalesSummary(summaryResponse);
      if (!topProductsResponse.error) setTopProducts(topProductsResponse);
      if (!categoriesResponse.error) setSalesByCategory(categoriesResponse);
      if (!clientsResponse.error) setTopClients(clientsResponse);
      if (!stockResponse.error) setStockStatus(stockResponse);

    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      setDashboardError('Error al cargar algunos datos del dashboard');
    } finally {
      setDashboardLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount || 0);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-CL').format(num || 0);
  };

  // Gestión de productos
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : (name === "precio" ? Number(value) : value)
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) return;

    try {
      const productData = {
        ...form,
        categoria: form.categoriaId ? { id: parseInt(form.categoriaId) } : null
      };

      if (editId) {
        await axios.put(`http://localhost:8080/api/productos/${editId}`, productData);
      } else {
        await axios.post("http://localhost:8080/api/productos", productData);
      }

      loadProducts();
      setForm({ 
        nombre: "", 
        descripcion: "", 
        precio: "", 
        rutaImagen: "", 
        destacado: false, 
        categoriaId: "" 
      });
      setEditId(null);
    } catch (err) {
      console.error("Error guardando", err);
      alert("No se pudo guardar");
    }
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/productos/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Error eliminando", err);
      alert("No se pudo eliminar");
    }
  };

  const editar = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      rutaImagen: p.rutaImagen || "",
      destacado: p.destacado || false,
      categoriaId: p.categoria?.id || ""
    });
  };

  const cancelar = () => {
    setEditId(null);
    setForm({ 
      nombre: "", 
      descripcion: "", 
      precio: "", 
      rutaImagen: "", 
      destacado: false, 
      categoriaId: "" 
    });
  };

  const renderDashboard = () => (
    <div>
      {/* Header del Dashboard */}
      <div 
        className="row mb-4 p-3 rounded"
        style={{ backgroundColor: "#FFF5E1" }}
      >
        <div className="col-12 text-center">
          <h2 
            className="mb-2"
            style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}
          >
            📊 Dashboard de Ventas
          </h2>
          <p className="text-muted">Resumen de actividad comercial</p>
          {dashboardError && (
            <div className="alert alert-warning">{dashboardError}</div>
          )}
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
          {/* Resumen de Ventas */}
          <div className="row mb-4">
            {salesSummary ? (
              <>
                <div className="col-md-3 mb-3">
                  <div className="card text-center h-100">
                    <div className="card-body bg-success text-white">
                      <h5>💰 Ventas Totales</h5>
                      <h3>{formatCurrency(salesSummary.ventasTotales)}</h3>
                      <small>Acumulado</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center h-100">
                    <div className="card-body bg-info text-white">
                      <h5>📦 Órdenes</h5>
                      <h3>{formatNumber(salesSummary.totalOrdenes)}</h3>
                      <small>Total</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center h-100">
                    <div className="card-body bg-warning text-white">
                      <h5>📊 Ticket Promedio</h5>
                      <h3>{formatCurrency(salesSummary.ticketPromedio)}</h3>
                      <small>Por orden</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card text-center h-100">
                    <div className="card-body bg-primary text-white">
                      <h5>🛍️ Productos Vendidos</h5>
                      <h3>{formatNumber(salesSummary.productosVendidos)}</h3>
                      <small>Unidades</small>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="alert alert-light text-center">
                  No hay datos de resumen disponibles
                </div>
              </div>
            )}
          </div>

          {/* Productos Más Vendidos y Categorías */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">🏆 Top Productos</h5>
                </div>
                <div className="card-body">
                  {topProducts.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Vendidos</th>
                            <th>Ingresos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topProducts.slice(0, 5).map((product, index) => (
                            <tr key={index}>
                              <td>{product.nombre}</td>
                              <td><span className="badge bg-success">{formatNumber(product.cantidadVendida)}</span></td>
                              <td>{formatCurrency(product.ingresoGenerado)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted text-center">Sin datos de productos</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-info text-white">
                  <h5 className="mb-0">🎯 Ventas por Categoría</h5>
                </div>
                <div className="card-body">
                  {salesByCategory.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Categoría</th>
                            <th>Productos</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByCategory.map((category, index) => (
                            <tr key={index}>
                              <td>{category.categoria}</td>
                              <td><span className="badge bg-info">{formatNumber(category.cantidadProductos)}</span></td>
                              <td>{formatCurrency(category.totalVentas)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted text-center">Sin datos de categorías</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="text-center">
        <button 
          className="btn btn-outline-primary"
          onClick={loadDashboardData}
        >
          🔄 Actualizar Dashboard
        </button>
      </div>
    </div>
  );

  const renderProductos = () => (
    <div>
      {/* Header de gestión de productos */}
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#8B4513" }}>
          🛠️ Gestión de Productos
        </h1>
        <p className="lead">Crear, editar y eliminar productos</p>
      </header>

      {/* Formulario */}
      <form onSubmit={onSubmit} className="border rounded p-3 mb-4 bg-white">
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label fw-bold">Nombre</label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Ruta Imagen</label>
            <input
              className="form-control"
              name="rutaImagen"
              value={form.rutaImagen}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Categoría</label>
            <select
              className="form-control"
              name="categoriaId"
              value={form.categoriaId}
              onChange={onChange}
            >
              <option value="">Seleccione una categoría</option>
              <option value="1">Chocolate</option>
              <option value="2">Vainilla</option>
              <option value="3">Frutilla</option>
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label fw-bold">Descripción</label>
            <input
              className="form-control"
              name="descripcion"
              value={form.descripcion}
              onChange={onChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">Precio</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="precio"
              value={form.precio}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-4 mt-4">
            <label className="form-check-label fw-bold">
              <input
                type="checkbox"
                className="form-check-input me-2"
                name="destacado"
                checked={form.destacado}
                onChange={onChange}
              />
              Destacado
            </label>
          </div>
        </div>

        <button
          className="btn mt-3"
          style={{ backgroundColor: "#8B4513", color: "#fff", borderRadius: 8 }}
          type="submit"
        >
          {editId ? "Guardar cambios" : "Agregar producto"}
        </button>

        {editId && (
          <button
            className="btn btn-outline-secondary mt-3 ms-2"
            type="button"
            onClick={cancelar}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de productos */}
      <section className="table-responsive">
        <table className="table align-middle bg-white shadow-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Destacado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td><strong>{p.nombre}</strong></td>
                <td>{p.descripcion}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td>{p.categoria?.nombre || 'Sin categoría'}</td>
                <td>{p.destacado ? '⭐' : ''}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editar(p)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-muted text-center">
                  No hay productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );

  return (
    <main className="container-fluid py-4" style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "Lato, sans-serif" }}>
      {/* Tabs de navegación */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`}
                onClick={() => setActiveTab('productos')}
              >
                🛠️ Productos
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenido según tab activo */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'productos' && renderProductos()}
    </main>
  );
}