// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompraExitosa from "../src/pages/CompraExitosa";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente CompraExitosa", () => {
  // Verifica que muestre mensaje de éxito
  it("muestra mensaje de compra exitosa", () => {
    renderWithRouter(<CompraExitosa />);
    expect(screen.getByText(/éxito/i) || screen.getByText(/exitosa/i)).toBeTruthy();
  });

  // Verifica que tenga botón para volver
  it("muestra botón para continuar", () => {
    renderWithRouter(<CompraExitosa />);
    const link = screen.getByRole("link", { name: /Volver/i }) || 
                 screen.getByRole("link", { name: /Inicio/i }) ||
                 screen.getByRole("link", { name: /Continuar/i });
    expect(link).toBeInTheDocument();
  });
});
