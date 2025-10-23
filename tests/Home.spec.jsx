// 🏠 Test del componente Home.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home";

describe("🏠 Componente Home", () => {
  // ✅ 1️⃣ Verifica que el título principal se muestre correctamente
  it("muestra el título principal", () => {
    render(<Home />);
    expect(screen.getByText(/Celebra la dulzura de la vida/i)).toBeInTheDocument();
  });

  // ✅ 2️⃣ Verifica que exista una imagen con alt="Logo"
  it("muestra la imagen del logo", () => {
    render(<Home />);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  // ✅ 3️⃣ Comprueba que haya uno o más párrafos descriptivos
  it("contiene uno o más párrafos descriptivos", () => {
    render(<Home />);
    const parrafos = screen.getAllByText((content, element) => {
      return element.tagName.toLowerCase() === "p";
    });
    expect(parrafos.length).toBeGreaterThan(0);
  });

  // ✅ 4️⃣ Verifica que exista el texto “Productos Destacados”
  it("muestra la sección 'Productos Destacados'", () => {
    render(<Home />);
    expect(screen.getByText(/Productos Destacados/i)).toBeInTheDocument();
  });
});
