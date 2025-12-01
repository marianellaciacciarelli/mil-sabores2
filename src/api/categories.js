import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/categorias';

// Configurar interceptor para agregar token a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const categoriesAPI = {
  // Obtener todas las categorías
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      throw error;
    }
  },

  // Crear nueva categoría
  create: async (categoryData) => {
    try {
      const response = await axios.post(API_URL, {
        nombre: categoryData.nombre,
        descripcion: categoryData.descripcion,
        color: categoryData.color || '#8B4513',
        activa: categoryData.activa !== undefined ? categoryData.activa : true
      });
      return response.data;
    } catch (error) {
      console.error('Error creando categoría:', error);
      throw error;
    }
  },

  // Actualizar categoría
  update: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        nombre: categoryData.nombre,
        descripcion: categoryData.descripcion,
        color: categoryData.color || '#8B4513',
        activa: categoryData.activa
      });
      return response.data;
    } catch (error) {
      console.error('Error actualizando categoría:', error);
      throw error;
    }
  },

  // Desactivar categoría (soft delete)
  deactivate: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error('Error desactivando categoría:', error);
      throw error;
    }
  },

  // Activar categoría
  activate: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error('Error activando categoría:', error);
      throw error;
    }
  },

  // Obtener categoría por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo categoría:', error);
      throw error;
    }
  }
};