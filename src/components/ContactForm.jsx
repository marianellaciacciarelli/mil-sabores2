import { useState } from 'react'


export default function ContactForm() {
const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
const [sent, setSent] = useState(false)
const [validated, setValidated] = useState(false)


const handleChange = (e) => {
const { id, value } = e.target
setFormData((prev) => ({ ...prev, [id]: value }))
}


const handleSubmit = (e) => {
e.preventDefault()
const form = e.currentTarget
const emailOk = /.+@.+\..+/.test(formData.email)


if (form.checkValidity() && emailOk) {
// TODO: reemplazar por fetch a su backend cuando lo tengan
setSent(true)
setValidated(false)
setFormData({ nombre: '', email: '', mensaje: '' })
setTimeout(() => setSent(false), 3000)
} else {
setSent(false)
setValidated(true)
}
}

return (
<form noValidate onSubmit={handleSubmit} className={validated ? 'was-validated' : ''}>
<div className="row mb-3">
<div className="col-12">
<label htmlFor="nombre" className="form-label">Nombre completo</label>
<input
type="text"
id="nombre"
className="form-control"
placeholder="Tu nombre"
value={formData.nombre}
onChange={handleChange}
required
/>
<div className="invalid-feedback">Por favor ingresa tu nombre.</div>
</div>
</div>

<div className="row mb-3">
<div className="col-12">
<label htmlFor="email" className="form-label">Correo electrónico</label>
<input
type="email"
id="email"
className="form-control"
placeholder="nombre@ejemplo.com"
value={formData.email}
onChange={handleChange}
required
/>
<div className="invalid-feedback">Ingresa un correo válido.</div>
</div>
</div>

<div className="row mb-3">
<div className="col-12">
<label htmlFor="mensaje" className="form-label">Mensaje</label>
<textarea
id="mensaje"
rows={4}
className="form-control"
placeholder="Escribe tu mensaje aquí"
value={formData.mensaje}
onChange={handleChange}
required
/>
<div className="invalid-feedback">Cuéntanos en qué podemos ayudarte.</div>
</div>
</div>

<div className="row">
<div className="col-12 d-flex gap-2">
<button type="submit" className="btn" style={{ backgroundColor: '#8B4513', color: '#fff' }}>Enviar</button>
<button
type="button"
className="btn btn-outline-secondary"
onClick={() => setFormData({ nombre: '', email: '', mensaje: '' })}
>
Limpiar
</button>
</div>
</div>

{sent && (
<div className="alert alert-success mt-3 mb-0" role="alert">
🎉 Enviado Exitosamente 🎉
</div>
)}
</form>
)
}
