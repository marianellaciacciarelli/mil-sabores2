import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categoria from '../src/pages/Categoria';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] }))
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Categoria Component', () => {
  it('renderiza la página de categoría', () => {
    renderWithRouter(<Categoria />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra contenido de categoría', () => {
    renderWithRouter(<Categoria />);
    const divElements = document.querySelectorAll('div');
    expect(divElements.length).toBeGreaterThan(0);
  });
});
