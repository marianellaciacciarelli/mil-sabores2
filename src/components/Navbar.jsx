import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { authAPI } from "../api/auth";

export default function NavbarMS() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const checkAuth = () => {
      const authenticated = authAPI.isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        const currentUser = authAPI.getCurrentUser();
        setUser(currentUser);
      }
    };

    checkAuth();
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/home';
  };

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
            
            {isLoggedIn ? (
              <>
                <Nav.Link href="/mis-compras">📋 Mis Compras</Nav.Link>
                <Nav.Item className="d-flex align-items-center me-2">
                  <span className="text-muted small">
                    👤 Hola, {user?.firstName || 'Usuario'}
                  </span>
                </Nav.Item>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/inicioSesion">Login</Nav.Link>
                <Nav.Link href="/registroUsuario">Registro</Nav.Link>
              </>
            )}
            
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