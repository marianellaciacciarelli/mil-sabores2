import { useEffect, useState } from "react";
import { categoriesAPI } from "../api/categories";

export default function CategoriesTab() {
  const [categorias, setCategorias] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    nombre: "",
    descripcion: "",
    color: "#8B4513",
    activa: true,
  });

  const loadCategories = async () => {
    try {
      setCategoryLoading(true);
      const data = await categoriesAPI.getAll();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateCategoryModal = () => {
    setCategoryEditId(null);
    setCategoryForm({
      nombre: "",
      descripcion: "",
      color: "#8B4513",
      activa: true,
    });
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setCategoryEditId(null);
  };

  const editarCategoria = (categoria) => {
    setCategoryEditId(categoria.id);
    setCategoryForm({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || "",
      color: categoria.color || "#8B4513",
      activa: categoria.activa ?? true,
    });
    setShowCategoryModal(true);
  };

  const onCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryEditId) {
        await categoriesAPI.update(categoryEditId, categoryForm);
      } else {
        await categoriesAPI.create(categoryForm);
      }
      await loadCategories();
      closeCategoryModal();
    } catch (error) {
      console.error("Error guardando categoría:", error);
      alert("Error al guardar la categoría");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="row mb-4 p-3 rounded" style={{ backgroundColor: "#FFF5E1" }}>
        <div className="col-12 text-center">
          <h2
            className="mb-2"
            style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}
          >
            Administrar Categorías
          </h2>
          <p className="text-muted">Gestiona las categorías de tus productos</p>
        </div>
      </div>

      {/* Lista */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-secondary">Lista de Categorías</h4>
          <button
            className="btn btn-primary"
            onClick={openCreateCategoryModal}
            style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }}
          >
            Nueva Categoría
          </button>
        </div>

        {categoryLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando categorías...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover bg-white">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Color</th>
                  <th>Estado</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>
                      <strong>{categoria.nombre}</strong>
                    </td>
                    <td>{categoria.descripcion || "Sin descripción"}</td>
                    <td>
                      <div
                        style={{
                          width: "30px",
                          height: "20px",
                          backgroundColor: categoria.color || "#8B4513",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                        title={categoria.color || "#8B4513"}
                      />
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          categoria.activa ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {categoria.activa ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => editarCategoria(categoria)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}

                {categorias.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-muted text-center">
                      No hay categorías registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal */}
      {showCategoryModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {categoryEditId ? "Editar Categoría" : "Nueva Categoría"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeCategoryModal}
                ></button>
              </div>

              <form onSubmit={onCategorySubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={categoryForm.nombre}
                      onChange={onCategoryChange}
                      required
                      placeholder="Ej: Postres, Bebidas, etc."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      name="descripcion"
                      value={categoryForm.descripcion}
                      onChange={onCategoryChange}
                      rows="3"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      name="color"
                      value={categoryForm.color}
                      onChange={onCategoryChange}
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="activa"
                      checked={categoryForm.activa}
                      onChange={onCategoryChange}
                      id="activaCheck"
                    />
                    <label className="form-check-label" htmlFor="activaCheck">
                      Categoría activa
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeCategoryModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }}
                  >
                    {categoryEditId ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
