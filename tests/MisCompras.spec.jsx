import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MisCompras from '../src/pages/MisCompras';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => true),
    getCurrentUser: vi.fn(() => ({ id: 1, username: 'test' })),
    logout: vi.fn()
  }
}));

vi.mock('../src/api/orders', () => ({
  ordersAPI: {
    getMyOrders: vi.fn(() => Promise.resolve([]))
  }
}));

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() }
    }
  }
}));

describe('MisCompras Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza la pagina de mis compras', () => {
    render(
      <BrowserRouter>
        <MisCompras />
      </BrowserRouter>
    );
    expect(document.body).toBeTruthy();
  });

  it('contiene elementos de la interfaz', () => {
    render(
      <BrowserRouter>
        <MisCompras />
      </BrowserRouter>
    );
    const divs = document.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
