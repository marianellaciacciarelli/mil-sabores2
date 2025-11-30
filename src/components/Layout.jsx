import React from 'react'
import Footer  from './Footer'
import Navbar  from './Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="app">             
 
      <header>
        <Navbar />
      </header>
      <main className="page-content">  
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
