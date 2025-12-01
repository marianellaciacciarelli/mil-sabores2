// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MisCompras from "../src/pages/MisCompras";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente MisCompras", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que se renderice el título de mis compras
  it("renderiza el título de mis compras", () => {
    renderWithRouter(<MisCompras />);
    expect(screen.getByText(/Mis Compras/i) || screen.getByText(/Historial/i)).toBeTruthy();
  });

  // Verifica que muestre mensaje cuando no hay compras
  it("muestra mensaje cuando no hay compras", () => {
    renderWithRouter(<MisCompras />);
    expect(screen.getByText(/No tienes compras/i) || screen.getByText(/vacío/i) || screen.getByText(/sin pedidos/i)).toBeTruthy();
  });
});
