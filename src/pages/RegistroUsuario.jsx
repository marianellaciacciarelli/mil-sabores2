import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField.jsx";
import { authAPI } from "../api/auth";

export default function RegistroUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    terminos: false,
  });

  const [validated, setValidated] = useState(false);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [id]: type === "checkbox" ? checked : value }));
  };

  const samePassword = form.password && form.password === form.password2;
  const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
  const passOk = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&.]{8,}$/.test(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== INICIO DE REGISTRO ===');
    console.log('Datos del formulario:', form);
    console.log('Email válido:', emailOk);
    console.log('Contraseña válida:', passOk);
    console.log('Contraseñas coinciden:', samePassword);
    console.log('Términos aceptados:', form.terminos);

    const formEl = e.currentTarget;
    const allOk = formEl.checkValidity() && emailOk && passOk && samePassword && form.terminos;
    
    console.log('Validación general:', allOk);

    if (allOk) {
      setLoading(true);
      setError("");
      
      console.log('=== ENVIANDO PETICIÓN AL SERVIDOR ===');
      console.log('URL:', 'http://localhost:8082/api/auth/register');

      try {
        // Llamar a la API de registro
        const response = await authAPI.register({
          email: form.email,
          password: form.password,
          firstName: form.nombre,
          lastName: form.apellido
        });
        
        console.log('=== REGISTRO EXITOSO ===');
        console.log('Respuesta del servidor:', response);

        setOk(true);
        setValidated(false);

        // Limpiar formulario
        setForm({ 
          nombre: "", 
          apellido: "",
          email: "",
          password: "",
          password2: "",
          terminos: false
        });

        // Redirigir al home después de 2 segundos
        setTimeout(() => {
          navigate('/home');
        }, 2000);

      } catch (err) {
        console.error('=== ERROR EN REGISTRO ===');
        console.error('Error completo:', err);
        console.error('Respuesta del servidor:', err.response?.data);
        console.error('Status:', err.response?.status);
        
        setError(err.response?.data?.message || "Error al registrar usuario. Intenta nuevamente.");
        setOk(false);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('=== VALIDACIÓN FALLIDA ===');
      console.log('Revisando validaciones individuales...');
      console.log('✓ formEl.checkValidity():', formEl.checkValidity());
      console.log('✓ emailOk:', emailOk, '- Email:', form.email);
      console.log('✓ passOk:', passOk, '- Password:', form.password);
      console.log('✓ samePassword:', samePassword, '- Pass1:', form.password, 'Pass2:', form.password2);
      console.log('✓ términos:', form.terminos);
      
      // Probar regex paso a paso
      console.log('=== DEBUGGING CONTRASEÑA ===');
      console.log('Contraseña actual:', form.password);
      console.log('Tiene letras?', /[A-Za-z]/.test(form.password));
      console.log('Tiene números?', /\d/.test(form.password));
      console.log('Longitud >= 8?', form.password.length >= 8);
      console.log('Solo caracteres válidos?', /^[A-Za-z\d@$!%*#?&.]+$/.test(form.password));
      
      setOk(false);
      setValidated(true);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow border-0" style={{ borderRadius: 18, background: "#FFF7EA" }}>
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-3">
                <img src="/img/logo-reg.png" alt="Logo" style={{ height: 56 }} />
                <h2 className="fw-bold mt-2" style={{ color: "#8B4513" }}>Crear cuenta</h2>
                <p className="text-muted mb-0">Únete a 1000 Sabores para comprar más rápido y guardar tus favoritos ✨</p>
              </div>

              <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={onChange}
                  required
                  disabled={loading}
                />
                <div className="invalid-feedback">Escribe tu nombre.</div>
              </div>
              
              <div className="col-12 col-md-6">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  value={form.apellido}
                  onChange={onChange}
                  required
                  disabled={loading}
                />
                <div className="invalid-feedback">Escribe tu apellido.</div>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className={`form-control ${form.email && !emailOk ? "is-invalid" : ""}`}
                placeholder="nombre@ejemplo.com"
                value={form.email}
                onChange={onChange}
                required
                disabled={loading}
              />
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <PasswordField
                      id="password"
                      label="Contraseña"
                      value={form.password}
                      onChange={onChange}
                      isValid={form.password === "" || passOk}
                      disabled={loading}
                    />
                    <div className="form-text">Mínimo 8 caracteres, incluye letras y números.</div>
                  </div>
                  <div className="col-12 col-md-6">
                    <PasswordField
                      id="password2"
                      label="Repite la contraseña"
                      value={form.password2}
                      onChange={onChange}
                      isValid={form.password2 === "" || samePassword}
                      disabled={loading}
                    />
                    {!samePassword && form.password2 && (
                      <div className="invalid-feedback d-block">Las contraseñas no coinciden.</div>
                    )}
                  </div>
                </div>

                <div className="form-check my-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="terminos" 
                    checked={form.terminos} 
                    onChange={onChange} 
                    required 
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los <a href="#" className="link-primary">Términos y Condiciones</a> y la <a href="#" className="link-primary">Política de Privacidad</a>.
                  </label>
                  <div className="invalid-feedback">Debes aceptar los términos para continuar.</div>
                </div>

                <div className="d-grid d-md-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-lg" 
                    style={{ backgroundColor: "#8B4513", color: "#fff", borderRadius: 12 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registrando...
                      </>
                    ) : (
                      "Crear cuenta"
                    )}
                  </button>
                  <a href="/inicioSesion" className="btn btn-lg btn-outline-secondary" style={{ borderRadius: 12 }}>
                    Ya tengo cuenta
                  </a>
                </div>

                {ok && (
                  <div className="alert alert-success mt-3 mb-0" role="alert">
                    🎉 ¡Registro exitoso! Te damos la bienvenida a 1000 Sabores. Redirigiendo...
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    ❌ {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}