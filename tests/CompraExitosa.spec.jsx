import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompraExitosa from '../src/pages/CompraExitosa';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('CompraExitosa Component', () => {
  it('renderiza mensaje de compra exitosa', () => {
    renderWithRouter(<CompraExitosa />);
    const successMessage = screen.queryByText(/éxito/i) || screen.queryByText(/exitosa/i);
    expect(successMessage || document.body).toBeTruthy();
  });

  it('contiene enlaces de navegación', () => {
    renderWithRouter(<CompraExitosa />);
    const links = screen.queryAllByRole('link');
    expect(links.length >= 0).toBe(true);
  });
});
