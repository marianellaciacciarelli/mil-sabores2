import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Catalogo = () => {
  // Aquí podrías traer productos desde data.js o una API más adelante
  const productos = [
    {
      id: 1,
      nombre: "Torta Cuadrada de Chocolate",
      categoria: "Tortas Cuadradas",
      descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
      precio: 45000,
      img: "/img/torta-chocolatee.jpg",
    },
    {
      id: 2,
      nombre: "Torta Cuadrada de Frutas",
      categoria: "Tortas Cuadradas",
      descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.",
      precio: 50000,
      img: "/img/fruta.jpg",
    },
    {
      id: 3,
      nombre: "Torta Circular de Vainilla",
      categoria: "Tortas Circulares",
      descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y glaseado dulce.",
      precio: 40000,
      img: "/img/torta-vainilla-circular.jpg",
    },
    {
      id: 4,
      nombre: "Torta Circular de Manjar",
      categoria: "Tortas Circulares",
      descripcion: "Torta tradicional chilena con manjar y nueces.",
      precio: 42000,
      img: "/img/torta-circular-manjar.jpg",
    },
    {
      id: 5,
      nombre: "Mousse de Chocolate",
      categoria: "Postres Individuales",
      descripcion: "Cremoso postre individual hecho con chocolate de alta calidad.",
      precio: 5000,
      img: "/img/mousse-chocolate.jpg",
    },
    {
      id: 6,
      nombre: "Tiramisú Clásico",
      categoria: "Postres Individuales",
      descripcion: "Postre italiano con capas de café, mascarpone y cacao.",
      precio: 5500,
      img: "/img/tiramisu-clasico.jpg",
    },
  ];

  return (
    <div style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "sans-serif" }}>
      <header className="py-4 text-center">
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍰 Catálogo de Productos 🍰</h1>
        <p className="text-muted">Pastelería 1000 Sabores – Celebrando 50 años de tradición</p>
      </header>

      <main className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="img-fluid"
                    style={{
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      border: "2px solid #8B4513",
                    }}
                  />
                  <br />
                  <h6 className="card-subtitle mb-2 text-muted">{producto.categoria}</h6>
                  <p className="card-text">{producto.descripcion}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">
                      ${producto.precio.toLocaleString("es-CL")} CLP
                    </span>
                    <button className="btn btn-sm btn-warning" style={btnStyle}>
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>


    </div>
  );
};

// 🎨 Estilo del botón (como en tu HTML original)
const btnStyle = {
  backgroundColor: "#FFC0CB",
  border: "none",
  color: "#8B4513",
  fontWeight: 600,
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

