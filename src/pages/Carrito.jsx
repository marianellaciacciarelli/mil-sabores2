// src/pages/Carrito.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLP = (n) =>
  n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  // Cargar desde localStorage (prioriza 'carrito_ms', si no existe pruebo con 'carrito')
  useEffect(() => {
    let base = [];
    try {
      const mine = JSON.parse(localStorage.getItem("carrito_ms") || "[]");
      const legacy = JSON.parse(localStorage.getItem("carrito") || "[]");
      base = Array.isArray(mine) && mine.length ? mine : Array.isArray(legacy) ? legacy : [];
    } catch {
      base = [];
    }
    const norm = base.map((it, i) => ({
      id: it.id ?? it.codigo ?? `tmp-${i}`,
      nombre: it.nombre ?? "Producto",
      precio: Number(it.precio ?? it.price ?? 0) || 0,
      cantidad: Number(it.cantidad ?? it.qty ?? 1) || 1,
      imagen: it.imagen ?? it.img ?? "/img/placeholder.jpg",
      categoria: it.categoria ?? "",
      codigo: it.codigo ?? undefined,
      tamaño: it.tamaño ?? undefined,
    }));
    setCarrito(norm);
  }, []);

  // Helpers CRUD
  const guardar = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito_ms", JSON.stringify(nuevo));
  };
  const cambiarCantidad = (id, cant) => {
    if (cant < 1) return;
    guardar(carrito.map((it) => (it.id === id ? { ...it, cantidad: cant } : it)));
  };
  const quitar = (id) => guardar(carrito.filter((it) => it.id !== id));
  const vaciar = () => guardar([]);

  // Cálculos
  const subtotal = carrito.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  const descuentos = 0; // deja listo para reglas futuras
  const total = Math.max(0, subtotal - descuentos);

  // Carrito vacío → misma estética
  if (!carrito.length) {
    return (
      <div className="bg-crema-pastel" style={{ minHeight: "100vh" }}>
        <main className="container my-4 text-center">
          <h1 className="mb-3" style={{ fontFamily: "'Pacifico', cursive", color: "var(--choco)" }}>
            🛒 Carrito de compras
          </h1>
          <p className="text-muted mb-4">Tu carrito está vacío.</p>
          <button className="button" onClick={() => navigate("/catalogo")}>
            Ver catálogo
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-crema-pastel" style={{ minHeight: "100vh" }}>
      <main className="container my-4">
        <h1 className="mb-3" style={{ fontFamily: "'Pacifico', cursive", color: "var(--choco)" }}>
          🛒 Carrito de compras
        </h1>
        <p className="text-muted mb-4">
          Interfaz con el mismo diseño de la maqueta, ahora con funcionalidad.
        </p>

        <div className="row g-4">
          {/* Columna izquierda: items (misma UI de la maqueta) */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {carrito.map((item, i) => (
                  <div
                    key={item.id}
                    className={`row align-items-center g-3 ${
                      i < carrito.length - 1 ? "pb-3 mb-3 border-bottom" : ""
                    }`}
                  >
                    {/* imagen */}
                    <div className="col-3 col-md-2">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="img-fluid rounded"
                        style={{ objectFit: "cover", aspectRatio: "1/1" }}
                        onError={(e) => (e.currentTarget.src = "/img/placeholder.jpg")}
                      />
                    </div>

                    {/* nombre + detalle (código/tamaño si tienes) */}
                    <div className="col-9 col-md-6">
                      <h6 className="mb-1">{item.nombre}</h6>
                      <small className="text-muted">
                        {item.codigo ? `Código: ${item.codigo}` : ""}
                        {item.codigo && item.tamaño ? " • " : ""}
                        {item.tamaño ? `Tamaño: ${item.tamaño}` : ""}
                      </small>
                    </div>

                    {/* select cantidad (decorativo en la maqueta, funcional aquí) */}
                    <div className="col-6 col-md-2">
                      <select
                        className="form-select form-select-sm"
                        value={item.cantidad}
                        onChange={(e) => cambiarCantidad(item.id, Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* precio + quitar */}
                    <div className="col-6 col-md-2 text-md-end">
                      <strong>{CLP(item.precio)}</strong>
                      <div>
                        <button className="btn btn-link p-0 text-danger" onClick={() => quitar(item.id)}>
                          Quitar
                        </button>
                      </div>
                      <div className="small text-muted">{CLP(item.precio * item.cantidad)} total</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: descuentos + totales (idéntica a la maqueta) */}
          <div className="col-lg-4">
            {/* Descuentos (UI; sin lógica aún) */}
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title mb-3">Descuentos</h5>

                <div className="mb-3">
                  <label className="form-label">Fecha de nacimiento</label>
                  <input type="date" className="form-control" />
                  <div className="form-text">≥ 50 años: 50% de descuento.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Código de promoción</label>
                  <input type="text" className="form-control" placeholder="FELICES50" />
                  <div className="form-text">FELICES50: 10% de por vida.</div>
                </div>

                <div className="mb-0">
                  <label className="form-label">Correo institucional</label>
                  <input type="email" className="form-control" placeholder="nombre@duocuc.cl" />
                  <div className="form-text">Duoc + cumpleaños hoy: 1 torta gratis.</div>
                </div>
              </div>
            </div>

            {/* Resumen (cálculos reales) */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen</h5>

                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>{CLP(subtotal)}</strong>
                </div>
                <div className="d-flex justify-content-between text-success">
                  <span>Descuentos</span>
                  <strong>- {CLP(descuentos)}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5">
                  <span>Total</span>
                  <strong>{CLP(total)}</strong>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-outline-danger" onClick={vaciar}>
                    Vaciar carrito
                  </button>
                  <button className="btn btn-dark" onClick={() => navigate("/checkout")}>
                    Confirmar pedido
                  </button>
                </div>

                <p className="text-muted small mt-3 mb-0">
                  * Interfaz demostrativa: los descuentos de arriba son referenciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
