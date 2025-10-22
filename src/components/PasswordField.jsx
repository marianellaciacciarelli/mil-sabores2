import { useState } from "react";

export default function PasswordField({ id, label, value, onChange, isValid = true }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-1">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <input
          id={id}
          type={show ? "text" : "password"}
          className={`form-control ${!isValid ? "is-invalid" : ""}`}
          placeholder="********"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? "Ocultar" : "Ver"}
        </button>
      </div>
    </div>
  );
}
