import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavbarMS from '../components/Navbar';
import Footer from '../components/Footer';

import { useState, useEffect } from "react"; // IMPORTAMOS lo necesario para llamar la API desde React
import axios from "axios";

export default function Home() {

  // ESTADO donde guardamos los productos destacados que vienen del backend
  const [destacados, setDestacados] = useState([]);

  // useEffect que se ejecuta al cargar la página
  // Aquí hacemos la petición al backend para traer los productos destacados
  useEffect(() => {
    axios
      .get("http://44.213.57.93:8080/api/v1/productos/destacados")  // LLAMADA A LA API REAL
      .then((res) => {
        console.log("Destacados recibidos:", res.data); // Mostrar la respuesta en consola
        setDestacados(res.data); // Guardamos los productos en el estado
      })
      .catch((err) => {
        console.error("Error cargando destacados:", err);
      });
  }, []); // [] → se ejecuta solo una vez al cargar

  return (
    <>

      {/* ================= HERO ================= */}
      <section className="text-center p-5 bg-crema-pastel">
        <img
          src="/img/logo.png"
          alt="Logo"
          style={{ maxWidth: 350, width: '100%', height: 'auto', marginBottom: 20 }}
        />
        <h1 className="display-4 brand-script">Celebra la dulzura de la vida</h1>
        <p className="lead">Pastelería 1000 Sabores — 50 años de tradición</p>
        <div className="mt-2">
          <Button href="/catalogo" variant="outline-dark" className="m-2">Ver Catálogo</Button>
          <Button href="/nosotros" variant="outline-dark" className="m-2">Conócenos</Button>
        </div>
      </section>

      {/* ================= ENUNCIADO / MISIÓN / VISIÓN ================= */}
      <section className="my-5">
        <Container>
          <Row className="text-center g-4">
            <Col md={4}>
              <h3 className="brand-script">👑 Enunciado</h3>
              <p>
                Pastelería 1000 Sabores celebra su 50 aniversario como un referente en la repostería chilena.
                Buscamos renovar nuestro sistema de ventas online para ofrecer una experiencia de compra moderna y accesible.
              </p>
            </Col>
            <Col md={4}>
              <h3 className="brand-script">🍪 Misión</h3>
              <p>
                Ofrecer una experiencia dulce y memorable, proporcionando tortas y productos de repostería
                de alta calidad para todas las ocasiones, celebrando nuestras raíces históricas y fomentando la creatividad.
              </p>
            </Col>
            <Col md={4}>
              <h3 className="brand-script">✨ Visión</h3>
              <p>
                Convertirnos en la tienda online líder de repostería en Chile, reconocida por innovación, calidad y
                el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= PRODUCTOS DESTACADOS ================= */}
      <section className="my-5">
        <Container>
          <h2 className="mb-4 text-center brand-script">Productos Destacados</h2>

          <Row className="g-4">

            {/* aqui antes habian productos estaticos (MAQUETADOS)
                ahora se pintan automaticamente desde el backend */}
            {destacados.map((p) => (
              <Col key={p.id} md={4}>
                <Card className="h-100 shadow-soft card-hover">

                  {/* Si el backend trae una imagen, se muestra */}
                  

                {p.rutaImagen && (<Card.Img src={p.rutaImagen}alt={p.nombre}style={{
                width: "100%",
                height: "200px",       //MISMA ALTURA
                objectFit: "cover",    //RECORTA SIN DEFORMAR
                borderRadius: "8px 8px 0 0"}}/>
)}


                  <Card.Body>
                    {/* Datos REALES desde la BD */}
                    <Card.Title>{p.nombre}</Card.Title>
                    <Card.Text>{p.descripcion}</Card.Text>

                    <p className="fw-bold">${p.precio}</p>

                    <Button href="/catalogo" variant="dark">Ver más</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}