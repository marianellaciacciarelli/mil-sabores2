// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Catalogo } from "../src/pages/Catalogo";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("🍰 Componente Catalogo", () => {
  beforeEach(() => {
    // Limpia el localStorage antes de cada test
    localStorage.clear();
  });

  // ✅ 1️⃣ Verifica que el título principal se renderice
  it("renderiza el título correctamente", () => {
    renderWithRouter(<Catalogo />);
    // Usa una expresión regular para evitar errores por emojis o espacios
    expect(screen.getByText(/Catálogo de Productos/i)).toBeInTheDocument();
  });

  // ✅ 2️⃣ Verifica el subtítulo con los 50 años de tradición
  it("muestra el mensaje de tradición", () => {
    renderWithRouter(<Catalogo />);
    expect(
      screen.getByText(/Pastelería 1000 Sabores – Celebrando 50 años de tradición/i)
    ).toBeInTheDocument();
  });

  // ✅ 3️⃣ Verifica que se rendericen varios productos
  it("renderiza varios productos del catálogo", () => {
    renderWithRouter(<Catalogo />);
    expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Tiramisú Clásico")).toBeInTheDocument();
  });

  // ✅ 4️⃣ Comprueba que exista el botón/link “Ir al carrito”
  it("muestra el botón 'Ir al carrito'", () => {
    renderWithRouter(<Catalogo />);
    const botonCarrito = screen.getByRole("link", { name: /Ir al carrito/i });
    expect(botonCarrito).toBeInTheDocument();
  });

  // ✅ 5️⃣ Verifica que se muestre la sesión activa si hay usuario guardado
  it("muestra sesión activa si hay usuario guardado", () => {
    localStorage.setItem("usuarioActivo", "admin");
    renderWithRouter(<Catalogo />);
    expect(screen.getByText("👤 Sesión: admin")).toBeInTheDocument();
  });

  // ✅ 6️⃣ Comprueba que el botón “Cerrar sesión” borre el usuario
  it("cierra sesión al presionar el botón 'Cerrar sesión'", () => {
    localStorage.setItem("usuarioActivo", "admin");
    renderWithRouter(<Catalogo />);

    const botonCerrar = screen.getByRole("button", { name: /Cerrar sesión/i });
    fireEvent.click(botonCerrar);

    expect(localStorage.getItem("usuarioActivo")).toBeNull();
  });

  // ✅ 7️⃣ Verifica que agregar un producto actualiza el carrito
  it("agrega productos al carrito", () => {
    renderWithRouter(<Catalogo />);
    const botonAgregar = screen.getAllByRole("button", { name: /Agregar/i })[0];
    fireEvent.click(botonAgregar);

    const carrito = JSON.parse(localStorage.getItem("carrito"));
    expect(carrito.length).toBe(1);
  });
});
