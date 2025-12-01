// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Carrito from "../src/pages/Carrito";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que muestre mensaje cuando el carrito está vacío
  it("muestra mensaje de carrito vacío", () => {
    renderWithRouter(<Carrito />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver Catálogo/i })).toBeInTheDocument();
  });

  // Verifica que muestre productos cuando hay items en el carrito
  it("muestra productos del carrito desde localStorage", () => {
    const carritoMock = [
      { id: 1, nombre: "Torta de Chocolate", precio: 15000, cantidad: 2, imagen: "torta.jpg" },
    ];
    localStorage.setItem("carrito_ms", JSON.stringify(carritoMock));

    renderWithRouter(<Carrito />);
    expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument();
    expect(screen.getByText(/Cantidad: 2/i)).toBeInTheDocument();
  });
});
