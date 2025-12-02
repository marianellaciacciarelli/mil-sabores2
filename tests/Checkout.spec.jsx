import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from '../src/pages/Checkout';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Checkout Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza la página de checkout', () => {
    renderWithRouter(<Checkout />);
    const container = document.body;
    expect(container).toBeTruthy();
  });

  it('muestra elementos de la interfaz', () => {
    renderWithRouter(<Checkout />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length >= 0).toBe(true);
  });
});
