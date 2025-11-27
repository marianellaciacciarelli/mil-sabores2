import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ordersAPI } from "../api/orders";
import "bootstrap/dist/css/bootstrap.min.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener carrito del localStorage
  const [cart] = useState(() => {
    const savedCart = localStorage.getItem("carrito_ms");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // Campos del formulario
  const [formData, setFormData] = useState({
    nombreCliente: "",
    emailCliente: "",
    telefonoCliente: "",
    direccionEnvio: "",
    // Campos de tarjeta para validación local
    numeroTarjeta: "",
    vencimiento: "",
    codigo: "",
    clave: "",
  });

  // Maneja los cambios en los campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validación y procesamiento del pago
  const handlePago = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      nombreCliente,
      emailCliente,
      telefonoCliente,
      direccionEnvio,
      numeroTarjeta,
      vencimiento,
      codigo,
      clave,
    } = formData;

    try {
      // Validar que hay items en el carrito
      if (cart.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Validar campos obligatorios
      if (!nombreCliente || !direccionEnvio || !numeroTarjeta || !vencimiento || !codigo || !clave) {
        setError("⚠️ Debes completar todos los campos obligatorios.");
        return;
      }

      // Validar correo electrónico si se proporciona
      if (emailCliente && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente)) {
        setError("⚠️ Ingresa un correo electrónico válido.");
        return;
      }

      // Validar número de tarjeta (16 dígitos)
      if (!/^[0-9]{16}$/.test(numeroTarjeta)) {
        setError("⚠️ El número de tarjeta debe tener 16 dígitos.");
        return;
      }

      // Validar fecha de vencimiento formato MM/AA
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
        setError("⚠️ Ingresa la fecha de vencimiento en formato MM/AA.");
        return;
      }

      // Validar que la tarjeta no esté vencida
      const [mesStr, añoStr] = vencimiento.split("/");
      const mes = parseInt(mesStr, 10);
      const año = parseInt(añoStr, 10);
      const hoy = new Date();
      const mesActual = hoy.getMonth() + 1;
      const añoActual = parseInt(hoy.getFullYear().toString().slice(-2));

      if (año < añoActual || (año === añoActual && mes < mesActual)) {
        navigate("/compraFallida");
        return;
      }

      // Validar código de seguridad (3 dígitos)
      if (!/^[0-9]{3}$/.test(codigo)) {
        setError("⚠️ El código de seguridad debe tener 3 números.");
        return;
      }

      // Validar clave (mínimo 4 dígitos)
      if (!/^[0-9]{4,}$/.test(clave)) {
        setError("⚠️ La clave debe tener al menos 4 dígitos.");
        return;
      }

      // Formar el objeto de la orden según VentaRequestDTO
      const orderData = {
        nombreCliente: nombreCliente,
        emailCliente: emailCliente || null,
        telefonoCliente: telefonoCliente || null,
        direccionEnvio: direccionEnvio,
        detalles: cart.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad
        }))
      };

      // Enviar orden al backend
      const response = await ordersAPI.createOrder(orderData);
      
      // Limpiar carrito tras compra exitosa
      localStorage.removeItem('carrito_ms');
      localStorage.removeItem('carrito');
      
      // Redirigir a página de éxito con el ID de la orden
      navigate('/compraExitosa', { 
        state: { 
          orderId: response.id,
          total: response.total,
          nombreCliente: response.nombreCliente
        } 
      });

    } catch (error) {
      console.error('Error al procesar la compra:', error);
      
      if (error.response?.status === 409) {
        setError('Stock insuficiente para uno o más productos');
      } else if (error.response?.status === 404) {
        setError('Uno o más productos ya no están disponibles');
      } else if (error.response?.status === 401) {
        setError('Debe iniciar sesión para realizar una compra');
        navigate('/login');
      } else {
        setError('Error al procesar la compra. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="container my-5 text-center">
        <h2 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
          🛒 Carrito vacío
        </h2>
        <p className="text-muted">Agregue productos antes de proceder al checkout</p>
        <Link to="/catalogo" className="btn btn-primary">
          Ir al Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main
      className="container my-5 p-4 rounded shadow"
      style={{ backgroundColor: "#FFF5E1", maxWidth: "900px" }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}
      >
        🍰 Finalizar Compra
      </h2>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-7">
          <form onSubmit={handlePago}>
            {/* DATOS PERSONALES */}
            <h5 className="mb-3">Datos de envío</h5>

            <div className="mb-3">
              <label className="form-label">Nombre completo *</label>
              <input
                type="text"
                name="nombreCliente"
                className="form-control"
                value={formData.nombreCliente}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="emailCliente"
                className="form-control"
                value={formData.emailCliente}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="telefonoCliente"
                className="form-control"
                value={formData.telefonoCliente}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Dirección de envío *</label>
              <textarea
                name="direccionEnvio"
                className="form-control"
                rows="3"
                value={formData.direccionEnvio}
                onChange={handleChange}
                required
              />
            </div>

            {/* DATOS TARJETA */}
            <h5 className="mb-3 mt-4">Datos de tarjeta</h5>

            <div className="mb-3">
              <label className="form-label">Número de tarjeta *</label>
              <input
                type="text"
                name="numeroTarjeta"
                className="form-control"
                maxLength="16"
                placeholder="Ejemplo: 1234567812345678"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Vencimiento (MM/AA) *</label>
                <input
                  type="text"
                  name="vencimiento"
                  className="form-control"
                  maxLength="5"
                  placeholder="Ej: 05/28"
                  value={formData.vencimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Código de seguridad (CVV) *</label>
                <input
                  type="text"
                  name="codigo"
                  className="form-control"
                  maxLength="3"
                  placeholder="123"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Clave *</label>
                <input
                  type="password"
                  name="clave"
                  className="form-control"
                  placeholder="****"
                  value={formData.clave}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* MENSAJE DE ERROR */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* BOTONES */}
            <div className="text-center mt-4">
              <button 
                type="submit" 
                className="btn btn-success px-5 me-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando...
                  </>
                ) : (
                  `💳 Pagar $${total.toLocaleString('es-CL')}`
                )}
              </button>
              <Link to="/carrito" className="btn btn-outline-secondary">
                ← Volver al carrito
              </Link>
            </div>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <div>
                    <small className="text-muted">{item.nombre}</small>
                    <br />
                    <span>{item.cantidad} x ${item.precio.toLocaleString('es-CL')}</span>
                  </div>
                  <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${total.toLocaleString('es-CL')}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;