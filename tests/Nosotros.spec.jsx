import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Nosotros } from "../src/pages/Nosotros";

describe("Página <Nosotros />", () => {
  it("renderiza el título principal y el subtítulo", () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /bienvenidos a nuestra tienda/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/50 años de tradición/i)
    ).toBeInTheDocument();
  });

  it("muestra las 3 secciones (Historia, Recomendaciones, Impacto)", () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 2, name: /nuestra historia/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /recomendaciones personalizadas/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /impacto comunitario/i })).toBeInTheDocument();
  });

  it("renderiza la imagen con el alt correcto", () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );
    const img = screen.getByAltText(/logo pastelería 1000 sabores/i);
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("/img/milsabores");
  });

  it("aplica clases de tema en el <main> (container-custom y bg-crema-pastel)", () => {
    const { container } = render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    const cls = main?.className ?? "";
    expect(cls).toContain("container-custom");
    expect(cls).toContain("bg-crema-pastel");
  });
});