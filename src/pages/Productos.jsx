import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Cargar productos reales desde API
  useEffect(() => {
    axios
      .get("http://44.213.57.93:8080/api/v1/productos")
      .then((res) => {
        console.log("Productos cargados:", res.data); // DEBUG
        setProductos(res.data);
      })
      .catch((err) => console.error("Error cargando productos", err));
  }, []);

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    try {
      // Obtener carrito actual
      const carritoActual = JSON.parse(localStorage.getItem("carrito_ms") || "[]");
      
      // Verificar si el producto ya está en el carrito
      const productoExistente = carritoActual.find(item => item.id === producto.id);
      
      let nuevoCarrito;
      if (productoExistente) {
        // Si ya existe, incrementar cantidad (verificar stock)
        if (productoExistente.cantidad >= (producto.stock || 0)) {
          setMensaje(`⚠️ Stock máximo alcanzado para ${producto.nombre}`);
          setTimeout(() => setMensaje(""), 3000);
          return;
        }
        
        nuevoCarrito = carritoActual.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo
        if ((producto.stock || 0) <= 0) {
          setMensaje(`❌ ${producto.nombre} no tiene stock disponible`);
          setTimeout(() => setMensaje(""), 3000);
          return;
        }
        
        const nuevoProducto = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          imagen: producto.rutaImagen,
          stock: producto.stock
        };
        
        nuevoCarrito = [...carritoActual, nuevoProducto];
      }
      
      // Guardar en localStorage
      localStorage.setItem("carrito_ms", JSON.stringify(nuevoCarrito));
      
      setMensaje(`✅ ${producto.nombre} agregado al carrito`);
      setTimeout(() => setMensaje(""), 3000);
      
    } catch (error) {
      console.error("Error agregando al carrito:", error);
      setMensaje("❌ Error al agregar al carrito");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

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
        
        {mensaje && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {mensaje}
          </div>
        )}
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
                
                <div className="mb-2">
                  <small className="text-muted">
                    Stock: {producto.stock || 0} unidades
                  </small>
                </div>

                <button
                  className="btn"
                  style={{
                    backgroundColor: (producto.stock || 0) > 0 ? "#F9A826" : "#6c757d",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={(producto.stock || 0) <= 0}
                >
                  {(producto.stock || 0) > 0 ? "Agregar al carrito" : "Sin stock"}
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
