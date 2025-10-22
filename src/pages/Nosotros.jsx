import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Nosotros = () => {
  return (
    <main
      className="container-custom bg-crema-pastel p-4"
      style={{
        backgroundColor: "#FFF5E1",
        color: "#5D4037",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "'Pacifico', cursive" }}>🍰 Bienvenidos a Nuestra Tienda</h1>
        <p className="lead">Pastelería 1000 Sabores — 50 años de tradición</p>
      </header>

      <section className="my-4">
        <h2
          className="p-2 rounded"
          style={{ backgroundColor: "#FFC0CB", color: "#5D4037" }}
        >
          📖 Nuestra Historia
        </h2>
        <p>
          Somos una tienda dedicada a ofrecer productos tradicionales con la máxima calidad. 
          Cada receta tiene una historia que rescata el sabor y el cariño de generaciones.
        </p>
        <p>
          Pastelería 1000 Sabores comenzó como un pequeño taller familiar, donde cada torta y cada pastel 
          era preparado con dedicación. Con el tiempo, nuestra calidad y el amor por lo que hacemos nos 
          convirtieron en un referente de la repostería nacional. Hoy, seguimos preservando esas recetas 
          tradicionales que han pasado de generación en generación, incorporando también nuevas propuestas 
          que sorprenden y deleitan a nuestros clientes.
        </p>
      </section>

      <section className="my-4">
        <h2
          className="p-2 rounded"
          style={{ backgroundColor: "#8B4513", color: "#FFF5E1" }}
        >
          ✨ Recomendaciones Personalizadas
        </h2>
        <p>
          Conoce nuestras sugerencias basadas en tus preferencias y compras anteriores para que disfrutes 
          siempre lo mejor.
        </p>
        <p>
          Nuestro equipo de pasteleros y nuestro sistema de recomendaciones trabajan juntos para sorprenderte 
          con opciones hechas a tu medida. Así garantizamos que siempre encuentres algo nuevo que se ajuste 
          a tus gustos, desde clásicos de la casa hasta creaciones innovadoras.
        </p>
      </section>

      <section className="my-4">
        <h2
          className="p-2 rounded"
          style={{ backgroundColor: "#FFC0CB", color: "#5D4037" }}
        >
          🤝 Impacto Comunitario
        </h2>
        <p>
          Al comprar con nosotros, apoyas a estudiantes de gastronomía y a la comunidad local, fomentando 
          el desarrollo y la tradición.
        </p>
        <p>
          Además, generamos instancias de colaboración con escuelas y pequeños productores, contribuyendo 
          al crecimiento del rubro gastronómico en la región. Creemos firmemente que cada compra no solo 
          endulza tu mesa, sino que también impulsa sueños y oportunidades.
        </p>
      </section>

      <section className="text-center">
        <img
          src="/img/milsabores.png"
          alt="Logo Pastelería 1000 Sabores"
          style={{
            maxWidth: "300px",
            width: "100%",
            height: "auto",
            marginBottom: "20px",
          }}
        />
      </section>


    </main>
  );
};
