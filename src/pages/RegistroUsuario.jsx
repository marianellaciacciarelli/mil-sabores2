import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField.jsx";
import { authAPI } from "../api/auth";

export default function RegistroUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    run: "",
    email: "",
    password: "",
    password2: "",
    direccion: "",
    comuna: "",
    region: "",
    tipoUsuario: "CLIENTE",
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
  const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  const emailOk = form.email.length <= 100 && allowedDomains.some(domain => form.email.endsWith(domain));
  const passOk = form.password.length >= 4 && form.password.length <= 10;
  const runOk = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(form.run);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== INICIO DE REGISTRO ===');
    console.log('Datos del formulario:', form);
    console.log('Email válido:', emailOk);
    console.log('Contraseña válida:', passOk);
    console.log('Contraseñas coinciden:', samePassword);
    console.log('Términos aceptados:', form.terminos);

    const formEl = e.currentTarget;
    const allOk = formEl.checkValidity() && emailOk && passOk && runOk && samePassword && form.terminos;
    
    console.log('Validación general:', allOk);

    if (allOk) {
      setLoading(true);
      setError("");
      
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
              <label htmlFor="run" className="form-label">RUN</label>
              <input
                id="run"
                type="text"
                className={`form-control ${form.run && !runOk ? "is-invalid" : ""}`}
                placeholder="12.345.678-9"
                value={form.run}
                onChange={onChange}
                required
                disabled={loading}
              />
              <div className="invalid-feedback">Ingresa un RUN válido (ej: 12.345.678-9).</div>
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
              <div className="invalid-feedback">Ingresa un correo válido con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com (máx 100 caracteres).</div>
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
                    <div className="form-text">Entre 4 y 10 caracteres.</div>
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

                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-8">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input
                      id="direccion"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Av. Siempre Viva 123"
                      value={form.direccion}
                      onChange={onChange}
                      required
                      disabled={loading}
                    />
                    <div className="invalid-feedback">Escribe tu dirección.</div>
                  </div>
                  {/* Tipo de usuario siempre será CLIENTE por defecto para registros desde frontend */}
                </div>
                
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <input
                      id="comuna"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Las Condes"
                      value={form.comuna}
                      onChange={onChange}
                      required
                      disabled={loading}
                    />
                    <div className="invalid-feedback">Escribe tu comuna.</div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="region" className="form-label">Región</label>
                    <select
                      id="region"
                      className="form-select"
                      value={form.region}
                      onChange={onChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Selecciona tu región</option>
                      <option value="Región de Tarapacá">Región de Tarapacá</option>
                      <option value="Región de Antofagasta">Región de Antofagasta</option>
                      <option value="Región de Atacama">Región de Atacama</option>
                      <option value="Región de Coquimbo">Región de Coquimbo</option>
                      <option value="Región de Valparaíso">Región de Valparaíso</option>
                      <option value="Región Metropolitana">Región Metropolitana</option>
                      <option value="Región del Libertador Bernardo O'Higgins">Región del Libertador Bernardo O'Higgins</option>
                      <option value="Región del Maule">Región del Maule</option>
                      <option value="Región del Biobío">Región del Biobío</option>
                      <option value="Región de La Araucanía">Región de La Araucanía</option>
                      <option value="Región de Los Ríos">Región de Los Ríos</option>
                      <option value="Región de Los Lagos">Región de Los Lagos</option>
                      <option value="Región de Aysén">Región de Aysén</option>
                      <option value="Región de Magallanes">Región de Magallanes</option>
                    </select>
                    <div className="invalid-feedback">Selecciona tu región.</div>
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
                    ¡Registro exitoso! Te damos la bienvenida a 1000 Sabores. Redirigiendo...
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
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