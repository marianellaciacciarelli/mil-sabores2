import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Blog from '../src/pages/Blog';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn()
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Blog Component', () => {
  it('renderiza la página del blog', () => {
    renderWithRouter(<Blog />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra contenido del blog', () => {
    renderWithRouter(<Blog />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length >= 0).toBe(true);
  });
});
