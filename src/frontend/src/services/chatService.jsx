import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const chatService = {
  async createChat(chatData) {
    const response = await api.post('/chats/', chatData);
    return response.data;
  },

  async getChat(chatId) {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
  },

  async deleteChat(chatId) {
    const response = await api.delete(`/chats/${chatId}`);
    return response.data;
  }
};