// src/pages/Admin.jsx
import { useState } from "react";
import DashboardTab from "../components/DashboardTab";
import CategoriesTab from "../components/CategoriesTab";
import ProductsTab from "../components/ProductsTab";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <main
      className="container-fluid py-4"
      style={{ backgroundColor: "#FFF5E1", color: "#5D4037", fontFamily: "Lato, sans-serif" }}
    >
      <header className="mb-4 text-center">
        <h1 style={{ color: "#8B4513", fontFamily: "Pacifico, cursive" }}>
          Panel de Administración
        </h1>
        <p className="text-muted">Sistema de gestión para administradores</p>
      </header>

      {/* Tabs de navegación */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "categorias" ? "active" : ""}`}
                onClick={() => setActiveTab("categorias")}
              >
                Categorías
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "productos" ? "active" : ""}`}
                onClick={() => setActiveTab("productos")}
              >
                Productos
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenido según tab activo */}
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "categorias" && <CategoriesTab />}
      {activeTab === "productos" && <ProductsTab />}
    </main>
  );
}
