import axios from 'axios';

const API_URL = 'http://44.213.57.93:8083/api/v1/ventas';

// El interceptor se encarga automáticamente del JWT

// Configurar interceptor de axios
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

export const ordersAPI = {
  // Crear nueva orden
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(API_URL, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw error;
    }
  },

  // Obtener todas las órdenes (solo admin)
  getOrders: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      throw error;
    }
  },

  // Obtener orden por ID
  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener orden ${id}:`, error);
      throw error;
    }
  },

  // Obtener órdenes de un usuario específico
  getOrdersByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener órdenes del usuario ${userId}:`, error);
      throw error;
    }
  },

  // Obtener órdenes del usuario actual (mis compras)
  getMyOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('=== DEBUG getMyOrders ===');
      console.log('Token en localStorage:', token ? 'EXISTS' : 'NOT FOUND');
      console.log('Token length:', token ? token.length : 'N/A');
      console.log('Token preview:', token ? token.substring(0, 50) + '...' : 'N/A');
      console.log('Token será agregado por interceptor');
      
      const response = await axios.get(`${API_URL}/mis-compras`);
      console.log('Response exitoso:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error al obtener mis órdenes:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers enviados:', error.config?.headers);
      throw error;
    }
  }
};

export default ordersAPI;
