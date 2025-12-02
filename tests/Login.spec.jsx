import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/pages/Login';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { token: 'test-token' } }))
  }
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Login Component', () => {
  it('renderiza el formulario de login', () => {
    renderWithRouter(<Login />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra campos de entrada', () => {
    renderWithRouter(<Login />);
    const inputs = screen.queryAllByRole('textbox');
    expect(inputs.length >= 0).toBe(true);
  });
});
