// tests/Ofertas.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Ofertas from "../src/pages/Ofertas";

// 🔹 Mock de useNavigate adaptado a Vitest
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Componente Ofertas", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("renderiza el título y el texto del 50% de descuento", () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /ofertas especiales/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/50% de descuento/i)).toBeInTheDocument();
  });

  it("muestra las 4 tarjetas con precios original y de oferta", () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("img").length).toBe(4);
    expect(screen.getByText("$45.000 CLP")).toBeInTheDocument();
    expect(screen.getByText("$22.500 CLP")).toBeInTheDocument();
  });

  it("agrega un producto al localStorage y navega al carrito", () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );

    const boton = screen.getAllByRole("button", {
      name: /agregar al carrito/i,
    })[0];
    fireEvent.click(boton);

    const carrito = JSON.parse(localStorage.getItem("carrito_ms"));
    expect(carrito[0].precio).toBe(22500);
    expect(mockNavigate).toHaveBeenCalledWith("/carrito");
  });

  it("cambia imagen a placeholder si ocurre un error de carga", () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );

    const img = screen.getAllByRole("img")[0];
    fireEvent.error(img);

    expect(img.src).toContain("/img/placeholder.jpg");
    expect(img.alt).toBe("Imagen no disponible");
  });
});