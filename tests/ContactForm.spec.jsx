import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../src/components/ContactForm';

describe('ContactForm Component', () => {
  it('renderiza el formulario con campos de entrada', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  it('permite ingresar datos en los campos', () => {
    render(<ContactForm />);
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Correo/i);

    fireEvent.change(nombreInput, { target: { value: 'Juan Perez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });

    expect(nombreInput.value).toBe('Juan Perez');
    expect(emailInput.value).toBe('juan@example.com');
  });
});
