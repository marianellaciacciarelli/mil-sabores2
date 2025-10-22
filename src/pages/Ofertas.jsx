import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Ofertas = () => {
  // Productos simulados en oferta
  const productosOferta = [
    {
      id: 1,
      nombre: "Torta Tres Leches",
      descripcion: "Bizcocho suave con mezcla de tres leches y cobertura de crema.",
      precioOriginal: 18000,
      precioOferta: 14500,
      imagen: "/img/torta_tresleches.jpg",
    },
    {
      id: 2,
      nombre: "Cheesecake de Frutilla",
      descripcion: "Base de galleta con suave crema de queso y frutillas frescas.",
      precioOriginal: 15000,
      precioOferta: 12000,
      imagen: "/img/cheesecake_frutilla.jpg",
    },
    {
      id: 3,
      nombre: "Cupcakes de Chocolate",
      descripcion: "Pack de 6 cupcakes rellenos de chocolate amargo y crema.",
      precioOriginal: 9000,
      precioOferta: 7000,
      imagen: "/img/cupcakes_choco.jpg",
    },
    {
      id: 4,
      nombre: "Pie de Limón Familiar",
      descripcion: "Deliciosa base crocante, relleno de limón y merengue dorado.",
      precioOriginal: 12500,
      precioOferta: 9900,
      imagen: "/img/pie_limon.jpg",
    },
  ];

  return (
    <main
      className="container py-4"
      style={{
        backgroundColor: "#FFF5E1",
        color: "#5D4037",
        fontFamily: "Lato, sans-serif",
      }}
    >
      {/* Encabezado */}
      <header className="text-center mb-5">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#B84E24" }}>
          🎉 Ofertas Especiales
        </h1>
        <p className="lead">
          Aprovecha nuestros descuentos por tiempo limitado y endulza tu día con{" "}
          <strong>Pastelería 1000 Sabores</strong> 🍰
        </p>
      </header>

      {/* Tarjetas de ofertas */}
      <section className="row g-4">
        {productosOferta.map((producto) => (
          <div className="col-md-6 col-lg-3" key={producto.id}>
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="card-img-top"
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  objectFit: "cover",
                  height: "180px",
                }}
              />
              <div className="card-body text-center">
                <h5
                  className="card-title fw-bold"
                  style={{ color: "#B84E24", fontSize: "1.1rem" }}
                >
                  {producto.nombre}
                </h5>
                <p
                  className="card-text"
                  style={{ fontSize: "0.9rem", minHeight: "50px" }}
                >
                  {producto.descripcion}
                </p>
                <p className="mb-1">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#888",
                      fontSize: "0.9rem",
                    }}
                  >
                    ${producto.precioOriginal.toLocaleString()}
                  </span>
                </p>
                <h5 style={{ color: "#28A745" }}>
                  ${producto.precioOferta.toLocaleString()}
                </h5>
                <button
                  className="btn mt-2"
                  style={{
                    backgroundColor: "#F9A826",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Ofertas;
