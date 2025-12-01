// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../src/components/Footer";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Footer", () => {
  // Verifica que se renderice el footer
  it("renderiza el footer", () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole("contentinfo") || document.querySelector("footer");
    expect(footer).toBeTruthy();
  });

  // Verifica que muestre información de copyright o empresa
  it("muestra información de copyright", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/©/i) || screen.getByText(/1000 Sabores/i) || screen.getByText(/2024/i) || screen.getByText(/2025/i)).toBeTruthy();
  });
});
