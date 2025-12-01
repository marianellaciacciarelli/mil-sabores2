// 🧁 Importamos las librerías necesarias
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../src/components/ContactForm";

describe("Componente ContactForm", () => {
  // Verifica que se renderice el formulario
  it("renderiza el formulario de contacto", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  // Verifica que se puedan ingresar datos
  it("permite ingresar datos en los campos", () => {
    render(<ContactForm />);
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });

    expect(nombreInput.value).toBe("Juan Pérez");
    expect(emailInput.value).toBe("juan@example.com");
  });
});
