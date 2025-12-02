import axios from 'axios';

const API_URL = 'http://44.213.57.93:8084/api/v1/reports';

// Interceptor para agregar JWT automáticamente
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const reportsAPI = {
  // Obtener resumen de ventas
  getSalesSummary: async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/summary`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener resumen de ventas:', error);
      throw error;
    }
  },

  // Obtener productos más vendidos
  getTopProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/top`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos más vendidos:', error);
      throw error;
    }
  },

  // Obtener ventas por categoría
  getSalesByCategory: async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/by-category`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener ventas por categoría:', error);
      throw error;
    }
  },

  // Obtener mejores clientes
  getTopClients: async () => {
    try {
      const response = await axios.get(`${API_URL}/clients/top`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener mejores clientes:', error);
      throw error;
    }
  },

  // Obtener estado del stock
  getStockStatus: async () => {
    try {
      const response = await axios.get(`${API_URL}/stock/status`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener estado del stock:', error);
      throw error;
    }
  }
};

export default reportsAPI;