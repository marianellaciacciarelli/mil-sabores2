// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contacto from "../src/pages/Contacto";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Contacto", () => {
  // Verifica que se renderice el título
  it("renderiza el título de contacto", () => {
    renderWithRouter(<Contacto />);
    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
  });

  // Verifica que se muestre la información de contacto
  it("muestra información de contacto y redes sociales", () => {
    renderWithRouter(<Contacto />);
    // Verifica que haya algún elemento relacionado con email o teléfono
    expect(screen.getByText(/Email/i) || screen.getByText(/Teléfono/i)).toBeTruthy();
  });
});
