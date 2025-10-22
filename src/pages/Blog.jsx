import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Blog = () => {
  // Datos simulados de artículos del blog
  const articulos = [
    {
      id: 1,
      titulo: "Cómo logramos el merengue perfecto 🍋",
      fecha: "15 de octubre de 2025",
      resumen:
        "Descubre los secretos detrás de nuestro merengue italiano suave, brillante y delicioso. Te contamos los errores más comunes y cómo evitarlos.",
      imagen: "/img/merengue.jpg",
    },
    {
      id: 2,
      titulo: "Nuevos sabores de temporada 🎃",
      fecha: "5 de octubre de 2025",
      resumen:
        "Lanzamos una línea especial con ingredientes de otoño: calabaza, canela y nuez. Ideal para los días fríos, ven a probarlos a la tienda.",
      imagen: "/img/calabaza.jpg",
    },
    {
      id: 3,
      titulo: "Detrás de cada torta hay una historia ❤️",
      fecha: "30 de septiembre de 2025",
      resumen:
        "Conoce cómo nace cada receta familiar en Pastelería 1000 Sabores, donde combinamos tradición, innovación y mucho cariño en cada creación.",
      imagen: "/img/torta_historia.jpg",
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
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>📰 Nuestro Blog</h1>
        <p className="lead">
          Historias, recetas y consejos dulces de <strong>Pastelería 1000 Sabores</strong>
        </p>
      </header>

      {/* Listado de artículos */}
      <section className="row g-4">
        {articulos.map((articulo) => (
          <div className="col-md-6 col-lg-4" key={articulo.id}>
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={articulo.imagen}
                className="card-img-top"
                alt={articulo.titulo}
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  objectFit: "cover",
                  height: "180px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#B84E24" }}>
                  {articulo.titulo}
                </h5>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {articulo.fecha}
                </p>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {articulo.resumen}
                </p>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#F9A826",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  Leer más 🍰
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Blog;
