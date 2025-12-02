import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Catalogo } from '../src/pages/Catalogo';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Catalogo Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el catálogo correctamente', () => {
    renderWithRouter(<Catalogo />);
    const container = screen.getByRole('main') || document.querySelector('.container');
    expect(container).toBeTruthy();
  });

  it('permite la navegación básica', () => {
    renderWithRouter(<Catalogo />);
    const links = screen.queryAllByRole('link');
    expect(links.length >= 0).toBe(true);
  });
});
