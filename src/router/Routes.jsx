import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import  Home from '../pages/Home'
import { Error404 } from '../pages/Error404'
import Contacto from '../pages/Contacto'
import  Login  from '../pages/Login'
import { Catalogo } from '../pages/Catalogo'
import { Nosotros } from '../pages/Nosotros'

import { Carrito } from '../pages/Carrito'
import Checkout from '../pages/Checkout'
import Productos from '../pages/Productos'
import Categoria from '../pages/Categoria'
import Blog from '../pages/Blog'
import CompraExitosa from '../pages/CompraExitosa'
import Ofertas from '../pages/Ofertas'
import InicioSesion from '../pages/InicioSesion'
import CompraFallida from '../pages/CompraFallida'
import Admin from "../pages/Admin"
import MisCompras from '../pages/MisCompras'

import RegistroUsuario from '../pages/RegistroUsuario.jsx';




export const RoutesComp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='*' element={<Error404/>}/>
                        <Route path='/' element={<Navigate to='/home' />} /> {/*Cada vez que se entra a la raíz redirige a Home*/}
                        <Route path='/home' element={<Home />} />
                        <Route path='/contacto' element={<Contacto />} />
                        <Route path='/login' element={<InicioSesion />} />
                        <Route path='/catalogo' element={<Productos />} />
                        <Route path='/nosotros' element={<Nosotros />} />
                       <Route path="/registroUsuario" element={<RegistroUsuario />} />

                        <Route path='/carrito' element={<Carrito />} />
                        <Route path='/productos' element={<Productos />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/categoria" element={<Categoria />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/compraExitosa" element={<CompraExitosa />} />
                        <Route path="/ofertas" element={<Ofertas />} />
                        <Route path="/inicioSesion" element={<InicioSesion />} />
                        <Route path="/compraFallida" element={<CompraFallida />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/mis-compras" element={<MisCompras />} />

                        
                    </Route>

                </Routes>
            </BrowserRouter >
        </>
    )
}
// CUALQUIER OTRA RUTA QUE NO ESTÉ DECLAARADA ENTRA ALLÍ DICIENDO KE NO EXISTE