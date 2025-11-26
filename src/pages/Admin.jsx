import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();

  // Bloqueo simple de acceso
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Productos desde la API
  const [productos, setProductos] = useState([]);

  // Formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: ""
  });

  const [editId, setEditId] = useState(null);

  // Cargar productos al entrar
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos", err));
  }, []);

  // Manejar cambios del formulario
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "precio" ? Number(value) : value
    }));
  };

  // Crear o editar producto
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) return;

    try {
      if (editId) {
        // Editar (PUT)
        await axios.put('http://localhost:8080/api/productos/${editId}', form);
      } else {
        // Crear nuevo (POST)
        await axios.post("http://localhost:8080/api/productos", form);
      }

      // Refrescar lista
      const res = await axios.get("http://localhost:8080/api/productos");
      setProductos(res.data);

      // Limpiar formulario
      setForm({ nombre: "", descripcion: "", precio: "" });
      setEditId(null);

    } catch (err) {
      console.error("Error guardando", err);
      alert("No se pudo guardar");
    }
  };

  // Eliminar producto
  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;

    try {
      await axios.delete('http://localhost:8080/api/productos/${id}');

      const res = await axios.get("http://localhost:8080/api/productos");
      setProductos(res.data);

    } catch (err) {
      console.error("Error eliminando", err);
      alert("No se pudo eliminar");
    }
  };

  // Pasa los datos al form
  const editar = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio
    });
  };

  // Cancelar edición
  const cancelar = () => {
    setEditId(null);
    setForm({ nombre: "", descripcion: "", precio: "" });
  };

  // ===================================================
  //                RENDER DE LA PÁGINA
  // ===================================================

  return (
    <main className="container py-4" style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "Lato, sans-serif" }}>
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#8B4513" }}>
          🛠️ Panel Admin
        </h1>
        <p className="lead">Crear, editar y eliminar productos</p>
      </header>

      {/* Formulario */}
      <form onSubmit={onSubmit} className="border rounded p-3 mb-4 bg-white">
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label fw-bold">Nombre</label>
            <input
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-5">
            <label className="form-label fw-bold">Descripción</label>
            <input
              className="form-control"
              name="descripcion"
              value={form.descripcion}
              onChange={onChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">Precio</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="precio"
              value={form.precio}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <button
          className="btn mt-3"
          style={{ backgroundColor: "#8B4513", color: "#fff", borderRadius: 8 }}
          type="submit"
        >
          {editId ? "Guardar cambios" : "Agregar producto"}
        </button>

        {editId && (
          <button
            className="btn btn-outline-secondary mt-3 ms-2"
            type="button"
            onClick={cancelar}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla */}
      <section className="table-responsive">
        <table className="table align-middle bg-white shadow-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td><strong>{p.nombre}</strong></td>
                <td>{p.descripcion}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editar(p)}>
                    Editar
                  </button>

                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-muted">
                  No hay productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}