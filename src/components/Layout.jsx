import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}