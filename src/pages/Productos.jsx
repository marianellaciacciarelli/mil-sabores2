import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  // Simulación de productos (puedes reemplazar con datos reales o importarlos de un JSON)
  const productos = [
    {
      id: 1,
      nombre: "Torta de Chocolate",
      descripcion: "Bizcocho húmedo con ganache artesanal.",
      precio: "$15.000",
      imagen: "/img/torta_chocolate.jpg",
    },
    {
      id: 2,
      nombre: "Cheesecake de Maracuyá",
      descripcion: "Cremoso y fresco, con base de galletas y salsa tropical.",
      precio: "$13.000",
      imagen: "/img/cheesecake_maracuya.jpg",
    },
    {
      id: 3,
      nombre: "Cupcakes Decorados",
      descripcion: "Pack de 6 unidades con crema pastelera y decoración temática.",
      precio: "$10.000",
      imagen: "/img/cupcakes.jpg",
    },
    {
      id: 4,
      nombre: "Pie de Limón",
      descripcion: "Clásico con base crujiente y suave merengue italiano.",
      precio: "$12.000",
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
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍮 Nuestros Productos</h1>
        <p className="lead">Descubre la dulzura de Pastelería 1000 Sabores</p>
      </header>

      {/* Listado de productos */}
      <section className="row g-4">
        {productos.map((producto) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={producto.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
              />
              <div className="card-body text-center">
                <h5
                  className="card-title"
                  style={{ color: "#B84E24", fontWeight: "bold" }}
                >
                  {producto.nombre}
                </h5>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {producto.descripcion}
                </p>
                <p className="fw-bold">{producto.precio}</p>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#F9A826",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  Agregar al carrito 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Productos;
