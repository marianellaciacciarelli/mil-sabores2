import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Catalogo = () => {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Detectar usuario activo (desde login o localStorage)
  useEffect(() => {
    const desdeLogin = location.state?.usuarioFromLogin ?? null;
    if (desdeLogin) {
      localStorage.setItem("usuarioActivo", desdeLogin);
      setUsuarioActivo(desdeLogin);
    } else {
      const guardado = localStorage.getItem("usuarioActivo");
      if (guardado) setUsuarioActivo(guardado);
    }

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCantidadCarrito(carrito.length);
  }, [location.state]);

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuarioActivo(null);
    navigate("/login");
  };

  // 🔹 Productos
  const productos = [
    { id: 1, nombre: "Torta Cuadrada de Chocolate", categoria: "Tortas Cuadradas", descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", precio: 45000, img: "/img/torta-chocolatee.jpg" },
    { id: 2, nombre: "Torta Cuadrada de Frutas", categoria: "Tortas Cuadradas", descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.", precio: 50000, img: "/img/fruta.jpg" },
    { id: 3, nombre: "Torta Circular de Vainilla", categoria: "Tortas Circulares", descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y glaseado dulce.", precio: 40000, img: "/img/torta-vainilla-circular.jpg" },
    { id: 4, nombre: "Torta Circular de Manjar", categoria: "Tortas Circulares", descripcion: "Torta tradicional chilena con manjar y nueces.", precio: 42000, img: "/img/torta-circular-manjar.jpg" },
    { id: 5, nombre: "Mousse de Chocolate", categoria: "Postres Individuales", descripcion: "Cremoso postre individual hecho con chocolate de alta calidad.", precio: 5000, img: "/img/mousse-chocolate.jpg" },
    { id: 6, nombre: "Tiramisú Clásico", categoria: "Postres Individuales", descripcion: "Postre italiano con capas de café, mascarpone y cacao.", precio: 5500, img: "/img/tiramisu-clasico.jpg" },
  ];

  // 🔹 Agregar al carrito
  const agregarAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setCantidadCarrito(carrito.length);
    alert('✅ ${producto.nombre} agregado al carrito');
  };

  return (
    <div style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "sans-serif" }}>
      {/* 🔸 Sesión activa arriba */}
      {usuarioActivo && (
        <div
          style={{
            backgroundColor: "#FFC0CB",
            color: "#5D4037",
            padding: "10px 16px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            fontWeight: "bold",
          }}
        >
          <span>👤 Sesión: {usuarioActivo}</span>
          <button
            onClick={handleLogout}
            className="btn btn-sm"
            style={{
              backgroundColor: "#B84E24",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión 🚪
          </button>
        </div>
      )}

      <header className="py-4 text-center">
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍰 Catálogo de Productos 🍰</h1>
        <p className="text-muted">Pastelería 1000 Sabores – Celebrando 50 años de tradición</p>
        <h6>🛒 Productos en carrito: {cantidadCarrito}</h6>
      </header>

      {/* 🔹 Productos */}
      <main className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {productos.map((p) => (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <img
                    src={p.img}
                    alt={p.nombre}
                    className="img-fluid"
                    style={{
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      border: "2px solid #8B4513",
                    }}
                  />
                  <br />
                  <h6 className="card-subtitle mb-2 text-muted">{p.categoria}</h6>
                  <p className="card-text">{p.descripcion}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">
                      ${p.precio.toLocaleString("es-CL")} CLP
                    </span>
                    <button
                      className="btn btn-sm btn-warning"
                      style={btnStyle}
                      onClick={() => agregarAlCarrito(p)}
                    >
                      🛒 Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Botón “Ir al carrito” al final */}
      <div className="text-center mt-4 mb-4">
        <Link
          to="/carrito"
          className="btn"
          style={{
            backgroundColor: "#FFC0CB",
            color: "#5D4037",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            border: "2px solid #B84E24",
          }}
        >
          🛒 Ir al carrito
        </Link>
      </div>

      <footer className="text-center p-4 mt-0" style={{ backgroundColor: "#FFC0CB" }}>
        <p>❤️ ¡Celebra la dulzura de la vida con Pastelería 1000 Sabores! ❤️</p>
        © 2025 Pastelería 1000 Sabores — Todos los derechos reservados
      </footer>
    </div>
  );
};

const btnStyle = {
  backgroundColor: "#FFC0CB",
  border: "none",
  color: "#8B4513",
  fontWeight: 600,
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};