import { useState } from "react";
import PasswordField from "../components/PasswordField.jsx";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    password2: "",
    terminos: false,
  });

  const [validated, setValidated] = useState(false);
  const [ok, setOk] = useState(false);

  const onChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [id]: type === "checkbox" ? checked : value }));
  };

  const samePassword = form.password && form.password === form.password2;
  const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
  const telOk =
    form.telefono === "" ||
    /^(\+?56)?\s?9\d{8}$/.test(form.telefono.replace(/\s/g, ""));
  const passOk =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const allOk =
      formEl.checkValidity() &&
      emailOk &&
      telOk &&
      passOk &&
      samePassword &&
      form.terminos;

    if (allOk) {
      setOk(true);
      setValidated(false);
      // TODO: enviar al backend
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        password: "",
        password2: "",
        terminos: false,
      });
      setTimeout(() => setOk(false), 2800);
    } else {
      setOk(false);
      setValidated(true);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div
            className="card shadow border-0"
            style={{ borderRadius: 18, background: "#FFF7EA" }}
          >
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-3">
                <img src="/img/logo-reg.png" alt="Logo" style={{ height: 56 }} />
                <h2 className="fw-bold mt-2" style={{ color: "#8B4513" }}>
                  Crear cuenta
                </h2>
                <p className="text-muted mb-0">
                  Únete a 1000 Sabores para comprar más rápido y guardar tus
                  favoritos ✨
                </p>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit}
                className={validated ? "was-validated" : ""}
              >
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Marianella Ciacciarelli"
                    value={form.nombre}
                    onChange={onChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Escribe tu nombre y apellido.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      form.email && !emailOk ? "is-invalid" : ""
                    }`}
                    placeholder="nombre@ejemplo.com"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                  <div className="invalid-feedback">Ingresa un correo válido.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Celular (opcional)
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    className={`form-control ${
                      form.telefono && !telOk ? "is-invalid" : ""
                    }`}
                    placeholder="+56 9 1234 5678"
                    value={form.telefono}
                    onChange={onChange}
                  />
                  <div className="form-text">
                    Formato sugerido Chile: +56 9 XXXXXXXX
                  </div>
                  <div className="invalid-feedback">
                    Revisa el formato del número.
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <PasswordField
                      id="password"
                      label="Contraseña"
                      value={form.password}
                      onChange={onChange}
                      isValid={form.password === "" || passOk}
                    />
                    <div className="form-text">
                      Mínimo 8 caracteres, incluye letras y números.
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <PasswordField
                      id="password2"
                      label="Repite la contraseña"
                      value={form.password2}
                      onChange={onChange}
                      isValid={form.password2 === "" || samePassword}
                    />
                    {!samePassword && form.password2 && (
                      <div className="invalid-feedback d-block">
                        Las contraseñas no coinciden.
                      </div>
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
                  />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los{" "}
                    <a href="#" className="link-primary">
                      Términos y Condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="#" className="link-primary">
                      Política de Privacidad
                    </a>
                    .
                  </label>
                  <div className="invalid-feedback">
                    Debes aceptar los términos para continuar.
                  </div>
                </div>

                <div className="d-grid d-md-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#8B4513",
                      color: "#fff",
                      borderRadius: 12,
                    }}
                  >
                    Crear cuenta
                  </button>
                  <a
                    href="/login"
                    className="btn btn-lg btn-outline-secondary"
                    style={{ borderRadius: 12 }}
                  >
                    Ya tengo cuenta
                  </a>
                </div>

                {ok && (
                  <div className="alert alert-success mt-3 mb-0" role="alert">
                    🎉 ¡Registro exitoso! Te damos la bienvenida a 1000 Sabores.
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
