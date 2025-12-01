// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordField from "../src/components/PasswordField";

describe("Componente PasswordField", () => {
  // Verifica que se renderice el campo de contraseña
  it("renderiza el campo de contraseña", () => {
    render(<PasswordField value="" onChange={() => {}} />);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // Verifica que el botón de mostrar/ocultar funcione
  it("cambia el tipo de input al hacer clic en mostrar/ocultar", () => {
    render(<PasswordField value="" onChange={() => {}} />);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const toggleButton = screen.getByRole("button");

    expect(passwordInput).toHaveAttribute("type", "password");
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
