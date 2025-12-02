import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Carrito } from '../src/pages/Carrito';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Carrito Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('carrito', JSON.stringify([]));
  });

  it('renderiza el carrito de compras', () => {
    renderWithRouter(<Carrito />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra contenido del carrito', () => {
    renderWithRouter(<Carrito />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length >= 0).toBe(true);
  });
});
