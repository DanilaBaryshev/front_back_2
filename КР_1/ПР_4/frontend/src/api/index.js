import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

// Работа API
export const api = {
  // POST /api/products
  createProduct: async (product) => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },

  // GET /api/products
  getProducts: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  // GET /api/products/:id
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // PATCH /api/products/:id
  updateProduct: async (id, product) => {
    const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  },

  // DELETE /api/products/:id
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
