// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import InicioSesion from "../src/pages/InicioSesion";
import { vi } from "vitest";

// Mock de authAPI
vi.mock("../src/api/auth", () => ({
  authAPI: {
    login: vi.fn(),
  },
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🧭 Función auxiliar para envolver el componente en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Componente InicioSesion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verifica que el formulario se renderice correctamente
  it("renderiza el formulario de inicio de sesión", () => {
    renderWithRouter(<InicioSesion />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  // Verifica que se puedan ingresar datos en los campos
  it("permite ingresar email y contraseña", () => {
    renderWithRouter(<InicioSesion />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});
