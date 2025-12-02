import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavbarMS from '../src/components/Navbar';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn()
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza la barra de navegacion', () => {
    renderWithRouter(<NavbarMS />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('contiene enlaces de navegacion', () => {
    renderWithRouter(<NavbarMS />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
