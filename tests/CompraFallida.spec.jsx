// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompraFallida from "../src/pages/CompraFallida";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente CompraFallida", () => {
  // Verifica que muestre mensaje de error
  it("muestra mensaje de compra fallida", () => {
    renderWithRouter(<CompraFallida />);
    expect(screen.getByText(/error/i) || screen.getByText(/fallida/i) || screen.getByText(/problema/i)).toBeTruthy();
  });

  // Verifica que tenga opción para reintentar
  it("muestra opción para reintentar o volver", () => {
    renderWithRouter(<CompraFallida />);
    const link = screen.getByRole("link", { name: /Reintentar/i }) || 
                 screen.getByRole("link", { name: /Volver/i }) ||
                 screen.getByRole("link", { name: /Carrito/i });
    expect(link).toBeInTheDocument();
  });
});
