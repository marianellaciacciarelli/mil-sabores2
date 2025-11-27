import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = authAPI.isAuthenticated();
  const currentUser = authAPI.getCurrentUser();
  const token = authAPI.getToken();

  // Si no hay token, redirigir a login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin y no es admin, redirigir a home
  if (requireAdmin && currentUser?.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;