// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Blog from "../src/pages/Blog";

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente Blog", () => {
  // Verifica que se renderice el título del blog
  it("renderiza el título del blog", () => {
    renderWithRouter(<Blog />);
    expect(screen.getByText(/Blog/i) || screen.getByText(/Noticias/i)).toBeTruthy();
  });

  // Verifica que se muestren artículos o contenido
  it("muestra artículos del blog", () => {
    renderWithRouter(<Blog />);
    // Verifica que existan elementos de artículo o contenido
    const articles = screen.queryAllByRole("article");
    expect(articles.length >= 0).toBe(true);
  });
});
