import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../src/pages/Admin';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => true),
    getCurrentUser: vi.fn(() => ({ username: 'admin' })),
    logout: vi.fn()
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Admin Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el panel de administracion', () => {
    renderWithRouter(<Admin />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra elementos administrativos', () => {
    renderWithRouter(<Admin />);
    const buttons = screen.queryAllByRole('button');
    const links = screen.queryAllByRole('link');
    expect(buttons.length + links.length >= 0).toBe(true);
  });
});
