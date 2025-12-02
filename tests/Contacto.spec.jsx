import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contacto from '../src/pages/Contacto';

describe('Contacto Component', () => {
  it('renderiza la página de contacto', () => {
    render(<Contacto />);
    const heading = screen.getByText(/Contacta con Nosotros/i);
    expect(heading).toBeInTheDocument();
  });

  it('contiene el formulario de contacto', () => {
    render(<Contacto />);
    const nombreLabel = screen.getByLabelText(/nombre/i);
    expect(nombreLabel).toBeInTheDocument();
  });
});
