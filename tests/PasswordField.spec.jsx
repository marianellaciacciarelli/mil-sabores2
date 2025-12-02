import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordField from '../src/components/PasswordField';

describe('PasswordField Component', () => {
  it('renderiza el campo de contraseña', () => {
    render(<PasswordField id="password" value="" onChange={() => {}} />);
    const passwordInput = screen.getByLabelText(/contraseña/i) || document.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('acepta props correctamente', () => {
    const handleChange = () => {};
    render(<PasswordField id="test-pass" value="test123" onChange={handleChange} />);
    const input = document.querySelector('input[type="password"]');
    expect(input).toBeTruthy();
  });
});
