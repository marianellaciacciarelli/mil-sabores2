import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  // 🔐 Bloqueo súper simple (opcional): si no hay "isAdmin", redirige al login
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // 🧁 Datos en memoria (se pierden al recargar; está bien para la entrega)
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Torta de Chocolate", descripcion: "Bizcocho húmedo con ganache", precio: 15000 },
    { id: 2, nombre: "Cheesecake de Maracuyá", descripcion: "Cremoso con base de galleta", precio: 13000 },
  ]);

  const [form, setForm] = useState({ id: "", nombre: "", descripcion: "", precio: "" });
  const [editId, setEditId] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "precio" ? Number(value) : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) return;

    if (editId) {
      setProductos(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p));
      setEditId(null);
    } else {
      setProductos(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({ id: "", nombre: "", descripcion: "", precio: "" });
  };

  const editar = (p) => { setEditId(p.id); setForm(p); };
  const eliminar = (id) => setProductos(prev => prev.filter(p => p.id !== id));
  const cancelar = () => { setEditId(null); setForm({ id: "", nombre: "", descripcion: "", precio: "" }); };

  return (
    <main className="container py-4" style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "Lato, sans-serif" }}>
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#8B4513" }}>🛠️ Panel Admin</h1>
        <p className="lead">Crear, editar y eliminar productos</p>
      </header>

      {/* Formulario */}
      <form onSubmit={onSubmit} className="border rounded p-3 mb-4 bg-white">
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label fw-bold">Nombre</label>
            <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
          </div>
          <div className="col-md-5">
            <label className="form-label fw-bold">Descripción</label>
            <input className="form-control" name="descripcion" value={form.descripcion} onChange={onChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Precio</label>
            <input type="number" min="0" className="form-control" name="precio" value={form.precio} onChange={onChange} required />
          </div>
        </div>
        <button className="btn mt-3" style={{ backgroundColor: "#8B4513", color: "#fff", borderRadius: 8 }} type="submit">
          {editId ? "Guardar cambios" : "Agregar producto"}
        </button>
        {editId && (
          <button className="btn btn-outline-secondary mt-3 ms-2" type="button" onClick={cancelar}>
            Cancelar
          </button>
        )}
      </form>

      {/* Listado */}
      <section className="table-responsive">
        <table className="table align-middle bg-white shadow-sm">
          <thead>
            <tr>
              <th>Nombre</th><th>Descripción</th><th>Precio</th><th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td><strong>{p.nombre}</strong></td>
                <td>{p.descripcion}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn- me-2" onClick={() => editar(p)}>Editar</button>
                  <button className="btn btn-sm btn-" onClick={() => eliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr><td colSpan="4" className="text-muted">No hay productos</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
