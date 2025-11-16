import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const authService = {
  async register(userData) {
    const response = await api.post('/users/register', userData);

    // Сохраняем пользователя в localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/users/login', credentials);

    // Сохраняем пользователя в localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  },
};