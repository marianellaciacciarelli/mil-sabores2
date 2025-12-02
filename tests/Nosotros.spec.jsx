import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Nosotros } from '../src/pages/Nosotros';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn()
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Nosotros Component', () => {
  it('renderiza la pagina sin errores', () => {
    renderWithRouter(<Nosotros />);
    const container = document.querySelector('main');
    expect(container).toBeTruthy();
  });

  it('contiene informacion de la empresa', () => {
    renderWithRouter(<Nosotros />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});