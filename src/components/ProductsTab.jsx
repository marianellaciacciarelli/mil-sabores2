import { useEffect, useState } from "react";
import axios from "axios";
import { categoriesAPI } from "../api/categories";


const API_BASE_URL = "http://44.213.57.93:8080";

export default function ProductsTab() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    rutaImagen: "",
    destacado: false,
    categoriaId: "",
    stock: "",
    stockCritico: "",
  });

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/productos`);
      setProductos(res.data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precio" || name === "stock" || name === "stockCritico"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      rutaImagen: "",
      destacado: false,
      categoriaId: "",
      stock: "",
      stockCritico: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || form.precio === "" || form.stock === "") return;

    try {
      const productData = {
        ...form,
        categoria: form.categoriaId ? { id: parseInt(form.categoriaId, 10) } : null,
      };

      if (editId) {
        await axios.put(
          `${API_BASE_URL}/api/v1/productos/${editId}`,
          productData
        );
      } else {
        await axios.post(`${API_BASE_URL}/api/v1/productos`, productData);
      }

      await loadProducts();
      resetForm();
    } catch (err) {
      console.error("Error guardando", err);
      alert("No se pudo guardar");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/v1/productos/${id}`);
      await loadProducts();
    } catch (err) {
      console.error("Error eliminando", err);
      alert("No se pudo eliminar");
    }
  };

  const editar = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      rutaImagen: p.rutaImagen || "",
      destacado: p.destacado || false,
      categoriaId: p.categoria?.id || "",
      stock: p.stock ?? "",
      stockCritico: p.stockCritico ?? "",
    });
  };

  return (
    <div>
      {/* Header de gestión de productos */}
      <header className="text-center mb-4">
        <h1 style={{ fontFamily: "'Pacifico', cursive", color: "#8B4513" }}>
          Gestión de Productos
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

          <div className="col-md-4">
            <label className="form-label fw-bold">Ruta Imagen</label>
            <input
              className="form-control"
              name="rutaImagen"
              value={form.rutaImagen}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Categoría</label>
            <select
              className="form-control"
              name="categoriaId"
              value={form.categoriaId}
              onChange={onChange}
            >
              <option value="">Seleccione una categoría</option>
              {categorias
                .filter((categoria) => categoria.activa)
                .map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
            </select>
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

          <div className="col-md-3">
            <label className="form-label fw-bold">Stock</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="stock"
              value={form.stock}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">Stock Crítico</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="stockCritico"
              value={form.stockCritico}
              onChange={onChange}
              placeholder="Ej: 10"
            />
          </div>

          <div className="col-md-4 mt-4">
            <label className="form-check-label fw-bold">
              <input
                type="checkbox"
                className="form-check-input me-2"
                name="destacado"
                checked={form.destacado}
                onChange={onChange}
              />
              Destacado
            </label>
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
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de productos */}
      <section className="table-responsive">
        <table className="table align-middle bg-white shadow-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Crítico</th>
              <th>Categoría</th>
              <th>Destacado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.nombre}</strong>
                </td>
                <td>{p.descripcion}</td>
                <td>${p.precio?.toLocaleString("es-CL")}</td>
                <td>
                  <span
                    className={`badge ${
                      p.stock <= (p.stockCritico || 5) ? "bg-danger" : "bg-success"
                    }`}
                  >
                    {p.stock ?? 0}
                  </span>
                </td>
                <td>{p.stockCritico ?? 5}</td>
                <td>{p.categoria?.nombre || "Sin categoría"}</td>
                <td>{p.destacado ? "Destacado" : ""}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editar(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan="8" className="text-muted text-center">
                  No hay productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
