// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que se renderice la barra de navegación
  it("renderiza la barra de navegación", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  // Verifica que muestre enlaces principales
  it("muestra enlaces de navegación principales", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Inicio/i) || screen.getByText(/Home/i)).toBeTruthy();
    expect(screen.getByText(/Catálogo/i) || screen.getByText(/Productos/i)).toBeTruthy();
  });
});
