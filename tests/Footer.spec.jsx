import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer';

describe('Footer Component', () => {
  it('renderiza el pie de pagina correctamente', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('muestra el año actual en el copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(new RegExp(currentYear.toString()));
    expect(yearText).toBeInTheDocument();
  });
});
