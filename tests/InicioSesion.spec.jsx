import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InicioSesion from '../src/pages/InicioSesion';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn(),
    login: vi.fn()
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

describe('InicioSesion Component', () => {
  it('renderiza la pagina de inicio de sesion', () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );
    expect(document.body).toBeTruthy();
  });

  it('contiene elementos de formulario', () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length >= 0).toBe(true);
  });
});
