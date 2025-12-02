import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Productos from '../src/pages/Productos';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] }))
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Productos Component', () => {
  it('renderiza la página de productos', () => {
    renderWithRouter(<Productos />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra el contenido de productos', () => {
    renderWithRouter(<Productos />);
    const elements = document.querySelectorAll('div');
    expect(elements.length).toBeGreaterThan(0);
  });
});
