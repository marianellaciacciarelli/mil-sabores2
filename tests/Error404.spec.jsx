import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Error404 } from '../src/pages/Error404';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Error404 Component', () => {
  it('renderiza el mensaje de error 404', () => {
    renderWithRouter(<Error404 />);
    const errorMessage = screen.getByText(/no existe/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('muestra contenido en la pagina', () => {
    renderWithRouter(<Error404 />);
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });
});
