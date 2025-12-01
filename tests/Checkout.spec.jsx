// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Checkout from "../src/pages/Checkout";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Checkout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que se renderice el formulario de pago
  it("renderiza el formulario de checkout", () => {
    const carritoMock = [{ id: 1, nombre: "Torta", precio: 15000, cantidad: 1 }];
    localStorage.setItem("carrito_ms", JSON.stringify(carritoMock));

    renderWithRouter(<Checkout />);
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirmar Compra/i })).toBeInTheDocument();
  });

  // Verifica que muestre el total de la compra
  it("muestra el total de la compra", () => {
    const carritoMock = [
      { id: 1, nombre: "Torta", precio: 15000, cantidad: 2 },
    ];
    localStorage.setItem("carrito_ms", JSON.stringify(carritoMock));

    renderWithRouter(<Checkout />);
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });
});
