import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Checkout = () => {
  const navigate = useNavigate();

  // Campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    direccion: "",
    numeroTarjeta: "",
    vencimiento: "",
    codigo: "",
    clave: "",
  });

  const [error, setError] = useState("");

  // Maneja los cambios en los campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validación y navegación al pagar
  const handlePago = (e) => {
    e.preventDefault();

    const {
      nombre,
      apellido,
      correo,
      direccion,
      numeroTarjeta,
      vencimiento,
      codigo,
      clave,
    } = formData;

    // Validar campos vacíos
    if (
      !nombre ||
      !apellido ||
      !correo ||
      !direccion ||
      !numeroTarjeta ||
      !vencimiento ||
      !codigo ||
      !clave
    ) {
      setError("⚠️ Debes completar todos los campos.");
      return;
    }

    // Validar correo electrónico
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!emailValido) {
      setError("⚠️ Ingresa un correo electrónico válido.");
      return;
    }

    // Validar número de tarjeta (16 dígitos)
    const tarjetaValida = /^[0-9]{16}$/.test(numeroTarjeta);
    if (!tarjetaValida) {
      setError("⚠️ El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    // Validar fecha de vencimiento formato MM/AA
    const fechaValida = /^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento);
    if (!fechaValida) {
      setError("⚠️ Ingresa la fecha de vencimiento en formato MM/AA.");
      return;
    }

    // 🟠 NUEVA VALIDACIÓN: TARJETA VENCIDA
    const [mesStr, añoStr] = vencimiento.split("/");
    const mes = parseInt(mesStr, 10);
    const año = parseInt(añoStr, 10);

    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const añoActual = parseInt(hoy.getFullYear().toString().slice(-2));

    if (año < añoActual || (año === añoActual && mes < mesActual)) {
      navigate("/compraFallida"); // redirige si está vencida
      return;
    }

    // Validar código de seguridad (3 dígitos)
    const codigoValido = /^[0-9]{3}$/.test(codigo);
    if (!codigoValido) {
      setError("⚠️ El código de seguridad debe tener 3 números.");
      return;
    }

    // Validar clave (mínimo 4 dígitos)
    const claveValida = /^[0-9]{4,}$/.test(clave);
    if (!claveValida) {
      setError("⚠️ La clave debe tener al menos 4 dígitos.");
      return;
    }

    // Si todo está bien, redirigir a compra exitosa
    setError("");
    navigate("/compraExitosa");
  };

  return (
    <main
      className="container my-5 p-4 rounded shadow"
      style={{ backgroundColor: "#FFF5E1", maxWidth: "700px" }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}
      >
        🍰 Finalizar Compra
      </h2>

      <form onSubmit={handlePago}>
        {/* DATOS PERSONALES */}
        <h5 className="mb-3">Datos personales</h5>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        {/* DATOS TARJETA */}
        <h5 className="mb-3 mt-4">Datos de tarjeta</h5>

        <div className="mb-3">
          <label className="form-label">Número de tarjeta</label>
          <input
            type="text"
            name="numeroTarjeta"
            className="form-control"
            maxLength="16"
            placeholder="Ejemplo: 1234567812345678"
            value={formData.numeroTarjeta}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Vencimiento (MM/AA)</label>
            <input
              type="text"
              name="vencimiento"
              className="form-control"
              maxLength="5"
              placeholder="Ej: 05/28"
              value={formData.vencimiento}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Código de seguridad (CVV)</label>
            <input
              type="text"
              name="codigo"
              className="form-control"
              maxLength="3"
              placeholder="123"
              value={formData.codigo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Clave</label>
            <input
              type="password"
              name="clave"
              className="form-control"
              placeholder="**"
              value={formData.clave}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* MENSAJE DE ERROR */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* BOTONES */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success px-5 me-2">
            💳 Pagar ahora
          </button>
          <Link to="/carrito" className="btn btn-outline-secondary">
            ← Volver al carrito
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Checkout;