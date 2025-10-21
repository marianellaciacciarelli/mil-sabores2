import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Carrito = () => {
  return (
    <div className="bg-crema-pastel" style={{ minHeight: "100vh" }}>
      <main className="container my-4">
        <h1 className="mb-3">🛒 Carrito de compras</h1>
        <p className="text-muted mb-4">
          Interfaz demostrativa (maqueta): sin funcionalidad, solo visual.
        </p>

        <div className="row g-4">
          {/* Columna izquierda: items */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Item 1 */}
                <div className="row align-items-center g-3 pb-3 mb-3 border-bottom">
                  <div className="col-3 col-md-2">
                    <img
                      src="/img/torta_chocolate.jpg"
                      alt="Torta de Chocolate"
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div className="col-9 col-md-6">
                    <h6 className="mb-1">Torta de Chocolate</h6>
                    <small className="text-muted">
                      Código: TC001 • Tamaño: Mediana
                    </small>
                  </div>
                  <div className="col-6 col-md-2">
                    <select className="form-select form-select-sm">
                      <option>1</option>
                      <option selected>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-2 text-md-end">
                    <strong>$45.000</strong>
                    <div>
                      <button className="btn btn-link p-0 text-danger">
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="row align-items-center g-3 pb-3 mb-3 border-bottom">
                  <div className="col-3 col-md-2">
                    <img
                      src="/img/torta-fruta.jpg"
                      alt="Torta de Frutas"
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div className="col-9 col-md-6">
                    <h6 className="mb-1">Torta de Frutas</h6>
                    <small className="text-muted">
                      Código: TC002 • Tamaño: Grande
                    </small>
                  </div>
                  <div className="col-6 col-md-2">
                    <select className="form-select form-select-sm">
                      <option selected>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-2 text-md-end">
                    <strong>$50.000</strong>
                    <div>
                      <button className="btn btn-link p-0 text-danger">
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="row align-items-center g-3">
                  <div className="col-3 col-md-2">
                    <img
                      src="/img/torta-vainilla-circular.jpg"
                      alt="Torta de Vainilla"
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div className="col-9 col-md-6">
                    <h6 className="mb-1">Torta de Vainilla</h6>
                    <small className="text-muted">
                      Código: TT001 • Tamaño: Pequeña
                    </small>
                  </div>
                  <div className="col-6 col-md-2">
                    <select className="form-select form-select-sm">
                      <option>1</option>
                      <option selected>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-2 text-md-end">
                    <strong>$40.000</strong>
                    <div>
                      <button className="btn btn-link p-0 text-danger">
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: descuentos + totales */}
          <div className="col-lg-4">
            {/* Descuentos */}
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <h5 className="card-title mb-3">Descuentos</h5>

                <div className="mb-3">
                  <label className="form-label">Fecha de nacimiento</label>
                  <input type="date" className="form-control" />
                  <div className="form-text">
                    ≥ 50 años: 50% de descuento.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Código de promoción</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="FELICES50"
                  />
                  <div className="form-text">
                    FELICES50: 10% de por vida.
                  </div>
                </div>

                <div className="mb-0">
                  <label className="form-label">Correo institucional</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="nombre@duocuc.cl"
                  />
                  <div className="form-text">
                    Duoc + cumpleaños hoy: 1 torta gratis.
                  </div>
                </div>
              </div>
            </div>

            {/* Totales */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <strong>$135.000</strong>
                </div>
                <div className="d-flex justify-content-between text-success">
                  <span>Descuentos</span>
                  <strong>- $30.000</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5">
                  <span>Total</span>
                  <strong>$105.000</strong>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-outline-danger" disabled>
                    Vaciar carrito
                  </button>
                  <button className="btn btn-dark" disabled>
                    Confirmar pedido
                  </button>
                </div>

                <p className="text-muted small mt-3 mb-0">
                  * Interfaz demostrativa: los cálculos y botones son
                  referenciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="text-center p-4 bg-rosa-suave mt-5"
        style={{ backgroundColor: "#FFC0CB" }}
      >
        © 2025 Pastelería 1000 Sabores — Todos los derechos reservados
      </footer>
    </div>
  );
};
