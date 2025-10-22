import React from 'react'
import Footer  from './Footer'
import Navbar  from './Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="app">              {/* 👈 contenedor flex de toda la app */}
      <Navbar />
      <main className="page-content">  {/* 👈 ocupa el espacio disponible */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}