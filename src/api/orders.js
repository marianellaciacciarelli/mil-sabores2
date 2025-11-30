import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/ventas';

// Interceptor para agregar JWT automáticamente
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
          'Content-Type': 'application/json',
          ...getAuthHeaders()
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
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      throw error;
    }
  },

  // Obtener orden por ID
  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener orden ${id}:`, error);
      throw error;
    }
  },

  // Obtener órdenes de un usuario específico
  getOrdersByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener órdenes del usuario ${userId}:`, error);
      throw error;
    }
  },

  // Obtener órdenes del usuario actual (mis compras)
  getMyOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}/mis-ventas`, {
        headers: getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener mis órdenes:', error);
      throw error;
    }
  }
};

export default ordersAPI;
