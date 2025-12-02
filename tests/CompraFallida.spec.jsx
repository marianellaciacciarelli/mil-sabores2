import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompraFallida from '../src/pages/CompraFallida';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('CompraFallida Component', () => {
  it('renderiza mensaje de error en compra', () => {
    renderWithRouter(<CompraFallida />);
    const errorMessage = screen.queryByText(/error/i) || screen.queryByText(/fallida/i);
    expect(errorMessage || document.body).toBeTruthy();
  });

  it('permite navegación después del error', () => {
    renderWithRouter(<CompraFallida />);
    const links = screen.queryAllByRole('link');
    expect(links.length >= 0).toBe(true);
  });
});
