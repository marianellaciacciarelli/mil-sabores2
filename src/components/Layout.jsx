import React from 'react';
import Navbar from './Navbar';     // ✅ Navbar viene de Navbar.jsx
import Footer from './Footer';     // ✅ Footer viene de Footer.jsx
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />   {/* Aquí se mostrarán las páginas (Home, Contacto, Registro...) */}
      <Footer />
    </div>
  );
};
