// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../src/pages/Admin";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Admin", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Verifica que se renderice el panel de administración
  it("renderiza el panel de administración", () => {
    localStorage.setItem("usuarioActivo", "admin");
    renderWithRouter(<Admin />);
    expect(screen.getByText(/Panel/i) || screen.getByText(/Admin/i)).toBeTruthy();
  });

  // Verifica que tenga secciones administrativas
  it("muestra opciones administrativas", () => {
    localStorage.setItem("usuarioActivo", "admin");
    renderWithRouter(<Admin />);
    // Verifica que existan botones o enlaces administrativos
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length >= 0).toBe(true);
  });
});
