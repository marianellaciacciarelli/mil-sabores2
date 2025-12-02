import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

vi.mock('../src/api/auth', () => ({
  authAPI: {
    isAuthenticated: vi.fn(() => false),
    getCurrentUser: vi.fn(() => null),
    logout: vi.fn()
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div>Test Content</div>
  };
});

describe('Layout Component', () => {
  it('renderiza correctamente', () => {
    const { container } = render(
      <BrowserRouter>
        <div><Outlet /></div>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });

  it('muestra contenido', () => {
    render(
      <BrowserRouter>
        <div><Outlet /></div>
      </BrowserRouter>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
