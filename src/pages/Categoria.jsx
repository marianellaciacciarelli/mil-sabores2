import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Categoria = () => {
  // Datos simulados de categorías y productos
  const categorias = [
    {
      nombre: "Tortas",
      color: "#FFCC8B",
      productos: [
        { id: 1, nombre: "Torta Selva Negra", precio: "$18.000", imagen: "/img/torta_selva.jpg" },
        { id: 2, nombre: "Torta de Mil Hojas", precio: "$16.000", imagen: "/img/milhojas.jpg" },
      ],
    },
    {
      nombre: "Postres Individuales",
      color: "#FFD8A8",
      productos: [
        { id: 3, nombre: "Mini Cheesecake", precio: "$3.500", imagen: "/img/mini_cheesecake.jpg" },
        { id: 4, nombre: "Vasito Tiramisú", precio: "$3.000", imagen: "/img/tiramisu.jpg" },
      ],
    },
    {
      nombre: "Panadería",
      color: "#FFF0C1",
      productos: [
        { id: 5, nombre: "Berlines Rellenos", precio: "$2.000", imagen: "/img/berlines.jpg" },
        { id: 6, nombre: "Cachitos de Crema", precio: "$2.500", imagen: "/img/cachitos.jpg" },
      ],
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
      {/* Título principal */}
      <header className="text-center mb-5">
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍰 Categorías</h1>
        <p className="lead">Explora nuestros productos según su tipo o preparación</p>
      </header>

      {/* Listado de categorías */}
      {categorias.map((cat, index) => (
        <section key={index} className="mb-5">
          <h2
            className="p-3 rounded text-center"
            style={{ backgroundColor: cat.color, color: "#5D4037" }}
          >
            {cat.nombre}
          </h2>

          <div className="row g-4">
            {cat.productos.map((prod) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={prod.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={prod.imagen}
                    className="card-img-top"
                    alt={prod.nombre}
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="fw-bold" style={{ color: "#B84E24" }}>
                      {prod.nombre}
                    </h5>
                    <p className="fw-semibold">{prod.precio}</p>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#F9A826",
                        color: "#fff",
                        borderRadius: "8px",
                      }}
                    >
                      Ver más 🍪
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Categoria;
