import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import  Home from '../pages/Home'
import { Error404 } from '../pages/Error404'
import Contacto from '../pages/Contacto'
import { Login } from '../pages/Login'
import { Catalogo } from '../pages/Catalogo'
import { Nosotros } from '../pages/Nosotros'

import { Carrito } from '../pages/Carrito'
import Checkout from '../pages/Checkout'

import RegistroUsuario from "../pages/RegistroUsuario.jsx";


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
                        <Route path='/login' element={<Login />} />
                        <Route path='/catalogo' element={<Catalogo />} />
                        <Route path='/nosotros' element={<Nosotros />} />
                       <Route path="/registro-usuario" element={<RegistroUsuario />} />
                        <Route path='/carrito' element={<Carrito />} />

                        <Route path="/checkout" element={<Checkout />} />
                    </Route>

                </Routes>
            </BrowserRouter >
        </>
    )
}
// CUALQUIER OTRA RUTA QUE NO ESTÉ DECLAARADA ENTRA ALLÍ DICIENDO KE NO EXISTE