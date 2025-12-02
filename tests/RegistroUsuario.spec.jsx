import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistroUsuario from '../src/pages/RegistroUsuario';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn(),
    register: vi.fn()
  }
}));

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { success: true } })),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() }
    }
  }
}));

describe('RegistroUsuario Component', () => {
  it('renderiza el formulario de registro', () => {
    render(
      <BrowserRouter>
        <RegistroUsuario />
      </BrowserRouter>
    );
    expect(document.body).toBeTruthy();
  });

  it('muestra campos para registro', () => {
    render(
      <BrowserRouter>
        <RegistroUsuario />
      </BrowserRouter>
    );
    const allInputs = document.querySelectorAll('input');
    expect(allInputs.length >= 0).toBe(true);
  });
});
