import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const AdminRoute = ({ children }) => {
  const user = authAPI.getCurrentUser();
  const isAuthenticated = authAPI.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene rol de ADMIN o VENDEDOR
  if (!user || (user.role !== 'ADMIN' && user.role !== 'VENDEDOR')) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos para acceder a esta página.</p>
          <p>Solo administradores y vendedores pueden acceder al panel de administración.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;