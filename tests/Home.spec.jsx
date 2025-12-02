import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home';
import axios from 'axios';

vi.mock('axios');
vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn()
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: [] });
  });

  it('renderiza el componente Home sin errores', () => {
    renderWithRouter(<Home />);
    const logo = screen.getByAltText(/Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('muestra el logo de la pastelería', () => {
    renderWithRouter(<Home />);
    const logo = screen.getByAltText(/Logo/i);
    expect(logo).toBeInTheDocument();
  });
});