// src/pages/Carrito.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Formateador de moneda CLP
const fmt = (n) =>
  n.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [cupon, setCupon] = useState(""); // cupón ingresado
  const [descuento, setDescuento] = useState(0); // monto de descuento
  const navigate = useNavigate();

  // 1️⃣ Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      let items = JSON.parse(localStorage.getItem("carrito_ms") || "[]");
      if (!Array.isArray(items) || items.length === 0) {
        items = JSON.parse(localStorage.getItem("carrito") || "[]");
      }

      const normalizados = (items || []).map((it, i) => ({
        id: it.id ?? it.codigo ?? `tmp-${i}`,
        nombre: it.nombre ?? "Producto",
        precio: Number(it.precio ?? 0) || 0,
        cantidad: Number(it.cantidad ?? 1) || 1,
        imagen: it.imagen ?? it.img ?? "/img/placeholder.jpg",
      }));

      setCarrito(normalizados);
    } catch {
      setCarrito([]);
    }
  }, []);

  // 2️⃣ Calcular subtotal y total con descuento
  useEffect(() => {
    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const desc = cupon.trim().toUpperCase() === "FELICES50" ? subtotal * 0.1 : 0;
    setDescuento(desc);
    setTotal(subtotal - desc);
  }, [carrito, cupon]);

  // 3️⃣ Funciones para manipular carrito
  const guardarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito_ms", JSON.stringify(nuevo));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const nuevo = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    guardarCarrito(nuevo);
  };

  const eliminarProducto = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevo);
  };

  const vaciar = () => guardarCarrito([]);

  // 4️⃣ Vista vacía
  if (carrito.length === 0) {
    return (
      <main className="container py-4 text-center">
        <h2 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
          🛒 Carrito de compras
        </h2>
        <p className="text-muted">Tu carrito está vacío.</p>
        <button className="btn btn-dark" onClick={() => navigate("/catalogo")}>
          Ver catálogo
        </button>
      </main>
    );
  }

  // 5️⃣ Vista normal
  return (
    <main className="container py-4">
      <h2 className="mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
        🛒 Mi carrito de compras
      </h2>

      <div className="row">
        {/* Lista de productos */}
        <div className="col-md-8">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                  onError={(e) => (e.currentTarget.src = "/img/placeholder.jpg")}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-1">{item.nombre}</h5>
                  <p className="mb-0 text-muted">{fmt(item.precio)} c/u</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(item.id)}
                >
                  🗑 Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen y cupón */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
              Resumen
            </h5>

            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <strong>{fmt(total + descuento)}</strong>
            </div>

            <div className="mb-3 mt-2">
              <label className="form-label">Cupón de descuento</label>
              <input
                type="text"
                className="form-control"
                placeholder="FELICES50"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
              />
              <div className="form-text">Cupón FELICES50 aplica 10% de descuento.</div>
            </div>

            {descuento > 0 && (
              <div className="d-flex justify-content-between text-success mb-2">
                <span>Descuento aplicado:</span>
                <strong>- {fmt(descuento)}</strong>
              </div>
            )}

            <hr />
            <div className="d-flex justify-content-between fs-5">
              <span>Total:</span>
              <strong>{fmt(total)}</strong>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-outline-danger" onClick={vaciar}>
                Vaciar carrito
              </button>
              <button className="btn btn-dark btn-lg" onClick={() => navigate("/checkout")}>
                Confirmar pedido
              </button>
            </div>

            <p className="text-muted small mt-3 mb-0">
              * Los datos del carrito se guardan en tu navegador (localStorage).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
