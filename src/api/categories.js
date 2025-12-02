import axios from 'axios';

const API_BASE_URL = '/api/v1/categorias';

export const categoriesAPI = {
  getAll: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  create: async (categoria) => {
    const response = await axios.post(API_BASE_URL, categoria);
    return response.data;
  },

  update: async (id, categoria) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, categoria);
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};
