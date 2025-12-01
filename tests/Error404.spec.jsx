// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Error404 from "../src/pages/Error404";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Error404", () => {
  // Verifica que muestre mensaje de error 404
  it("muestra mensaje de página no encontrada", () => {
    renderWithRouter(<Error404 />);
    expect(screen.getByText(/404/i) || screen.getByText(/no encontrada/i)).toBeTruthy();
  });

  // Verifica que tenga botón para volver al inicio
  it("muestra enlace para volver al inicio", () => {
    renderWithRouter(<Error404 />);
    const link = screen.getByRole("link", { name: /Inicio/i }) || 
                 screen.getByRole("link", { name: /Volver/i }) ||
                 screen.getByRole("link", { name: /Home/i });
    expect(link).toBeInTheDocument();
  });
});
