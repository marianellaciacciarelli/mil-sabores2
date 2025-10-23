// src/pages/Ofertas.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CLP = (n) => n.toLocaleString("es-CL");

const productosOferta = [
  {
    id: 1,
    nombre: "Torta Cuadrada de Chocolate",
    descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
    precio: 45000,
    imagen: "/img/torta-chocolatee.jpg",
  },
  {
    id: 2,
    nombre: "Torta Cuadrada de Frutas",
    descripcion: "Mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.",
    precio: 50000,
    imagen: "/img/fruta.jpg",
  },
  {
    id: 3,
    nombre: "Torta Circular de Vainilla",
    descripcion: "Bizcocho de vainilla clásico con crema pastelera y glaseado dulce.",
    precio: 40000,
    imagen: "/img/torta-vainilla-circular.jpg",
  },
  {
    id: 4,
    nombre: "Torta Circular de Manjar",
    descripcion: "Torta tradicional chilena con manjar y nueces.",
    precio: 42000,
    imagen: "/img/torta-circular-manjar.jpg",
  },
];

const Ofertas = () => {
  const navigate = useNavigate();
  const onImgError = (e) => {
    e.currentTarget.src = "/img/placeholder.jpg";
    e.currentTarget.alt = "Imagen no disponible";
  };

  // 🧠 Función que agrega productos al carrito
  const agregarAlCarrito = (producto) => {
    const key = "carrito_ms";
    let arr = [];
    try {
      arr = JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      arr = [];
    }

    const precioOferta = Math.round(producto.precio * 0.5);
    const prod = {
      id: producto.id,
      nombre: producto.nombre,
      precio: precioOferta, // 👈 precio rebajado
      imagen: producto.imagen,
      categoria: "Ofertas",
      cantidad: 1,
    };

    const index = arr.findIndex((it) => it.id === prod.id);
    if (index >= 0) arr[index].cantidad = (arr[index].cantidad ?? 1) + 1;
    else arr.push(prod);

    localStorage.setItem(key, JSON.stringify(arr));
    navigate("/carrito");
  };

  return (
    <main
      className="container-custom bg-crema-pastel text-choco py-5"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      <header className="text-center mb-5">
        <h1
          className="fw-bold"
          style={{ fontFamily: "'Pacifico', cursive", color: "var(--choco)" }}
        >
          🎉 Ofertas Especiales
        </h1>
        <p className="lead">
          ¡Aprovecha un <strong>50% de descuento</strong> en nuestras tortas más queridas! 🍰
        </p>
      </header>

      <section className="row g-4">
        {productosOferta.map((p) => {
          const precioOferta = Math.round(p.precio * 0.5);
          return (
            <div className="col-sm-6 col-lg-3" key={p.id}>
              <div className="card h-100 border-0 shadow-soft round-2xl d-flex flex-column">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  onError={onImgError}
                  className="card-img-top"
                  style={{ height: 220, objectFit: "cover" }}
                />

                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5
                      className="card-title fw-bold text-choco"
                      style={{ fontFamily: "'Pacifico', cursive" }}
                    >
                      {p.nombre}
                    </h5>
                    <p className="card-text">{p.descripcion}</p>
                    <div>
                      <span
                        className="text-muted me-2"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "0.9rem",
                        }}
                      >
                        ${CLP(p.precio)} CLP
                      </span>
                      <span
                        className="fw-bold"
                        style={{ color: "#28a745", fontSize: "1.1rem" }}
                      >
                        ${CLP(precioOferta)} CLP
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn mt-3"
                    style={{
                      backgroundColor: "#FFC0CB",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      border: "none",
                    }}
                    onClick={() => agregarAlCarrito(p)} // ✅ aquí va la magia
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Ofertas;
