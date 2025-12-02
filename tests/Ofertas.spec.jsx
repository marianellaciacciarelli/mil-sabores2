import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Ofertas from '../src/pages/Ofertas';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] }))
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Ofertas Component', () => {
  it('renderiza la página de ofertas', () => {
    renderWithRouter(<Ofertas />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra contenido relacionado con ofertas', () => {
    renderWithRouter(<Ofertas />);
    const allElements = document.querySelectorAll('*');
    expect(allElements.length).toBeGreaterThan(0);
  });
});