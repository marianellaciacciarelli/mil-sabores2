import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const AdminRoute = ({ children }) => {
  const isAuthenticated = authAPI.isAuthenticated();
  const currentUser = authAPI.getCurrentUser();
  const token = authAPI.getToken();

  // Si no hay token, redirigir a login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Si no es admin, redirigir a home
  if (currentUser?.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;

//VALIDA TOKEN Y ROL DE ADMINISTRADOR
