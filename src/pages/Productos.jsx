import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  // Cargar productos reales desde API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((res) => {
        console.log("Productos cargados:", res.data); // DEBUG
        setProductos(res.data);
      })
      .catch((err) => console.error("Error cargando productos", err));
  }, []);

  return (
    <main
      className="container py-4"
      style={{
        backgroundColor: "#FFF5E1",
        color: "#5D4037",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <header className="text-center mb-5">
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍮 Nuestros Productos</h1>
        <p className="lead">Descubre la dulzura de Pastelería 1000 Sabores</p>
      </header>

      <section className="row g-4">
        {productos.map((producto) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={producto.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={producto.rutaImagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  height: "200px",
                  objectFit: "cover",
                }}
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

                <p className="fw-bold">
                  ${producto.precio?.toLocaleString("es-CL")}
                </p>

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

        {productos.length === 0 && (
          <p className="text-center text-muted">No hay productos.</p>
        )}
      </section>
    </main>
  );
};

export default Productos;