import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Home } from '../pages/Home'
import { Error404 } from '../pages/Error404'
import Contacto from '../pages/Contacto'

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


                    </Route>

                </Routes>
            </BrowserRouter >
        </>
    )
}
// CUALQUIER OTRA RUTA QUE NO ESTÉ DECLAARADA ENTRA ALLÍ DICIENDO KE NO EXISTE