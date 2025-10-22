import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavbarMS from '../components/Navbar';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <>

      {/* ================= HERO ================= */}
      <section className="text-center p-5 bg-crema-pastel">
        <img
          src="/img/logo.png"
          alt="Logo"
          style={{ maxWidth: 250, width: '100%', height: 'auto', marginBottom: 20 }}
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
            {[
              {
                id: 'p1',
                img: '/img/torta_chocolate.jpg',
                title: 'Torta de Chocolate',
                text: 'Deliciosa torta con capas de ganache y un toque de avellanas.',
              },
              {
                id: 'p2',
                img: '/img/torta-fruta.jpg',
                title: 'Torta de Frutas',
                text: 'Mezcla de frutas frescas con crema chantilly y bizcocho.',
              },
              {
                id: 'p3',
                img: '/img/torta-vainilla-circular.jpg',
                title: 'Torta de Vainilla',
                text: 'Bizcocho clásico relleno con crema pastelera.',
              },
            ].map((p) => (
              <Col key={p.id} md={4}>
                <Card className="h-100 shadow-soft card-hover">
                  <Card.Img src={p.img} alt={p.title} />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>{p.text}</Card.Text>
                    <Button href="/catalogo" variant="dark">Ver más</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


    </>
  );
}
