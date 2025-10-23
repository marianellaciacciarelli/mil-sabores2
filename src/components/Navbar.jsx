import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import React from "react";

export default function NavbarMS() {
  return (
    <Navbar expand="lg" className="navbar-ms shadow-soft">
      <Container>
        <Navbar.Brand href="/home" className="fw-bold brand-script">
          🍰 Pastelería 1000 Sabores
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/nosotros">Nosotros</Nav.Link>
            <Nav.Link href="/catalogo">Catálogo</Nav.Link>
            <Nav.Link href="/ofertas">Ofertas</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registrousuario">Registro</Nav.Link>
            {/*<Nav.Link href="/blog">Blog</Nav.Link>   SI EL MAIKEL AGREGA BLOG, ACTIVAR ESTO*/}
            <Button as="a" href="/carrito" variant="outline-dark" size="sm">
              🛒 Carrito
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}