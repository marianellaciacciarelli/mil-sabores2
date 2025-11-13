import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistroUsuario from '../src/pages/RegistroUsuario.jsx'

describe('RegistroUsuario', () => {
  it('muestra alerta de éxito al completar el formulario correctamente', async () => {
    render(<RegistroUsuario />)
    const user = userEvent.setup()

    // Completar campos
    await user.type(screen.getByLabelText(/Nombre completo/i), 'Nombre Apellido')
    await user.type(screen.getByLabelText(/Correo electrónico/i), 'NombreApellido@example.com')
    await user.type(screen.getByLabelText(/Celular/i), '+56 9 12345678')
    await user.type(screen.getByLabelText(/^Contraseña$/i), 'abc12345')     // 8+ con letras y números
    await user.type(screen.getByLabelText(/Repite la contraseña/i), 'abc12345')

    // Aceptar términos
    await user.click(screen.getByLabelText(/Acepto los/i))

    // Enviar formulario
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }))

    // Ver éxito
    expect(await screen.findByText(/Registro exitoso/i)).toBeInTheDocument()
  })

  it('muestra error cuando las contraseñas no coinciden', async () => {
    render(<RegistroUsuario />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/^Contraseña$/i), 'abc12345')
    await user.type(screen.getByLabelText(/Repite la contraseña/i), 'abc12346')

    // El mensaje se renderiza al no coincidir, sin necesidad de enviar
    expect(
      screen.getByText(/Las contraseñas no coinciden/i)
    ).toBeInTheDocument()
  })
})
