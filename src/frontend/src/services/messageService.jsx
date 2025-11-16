import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const messageService = {
  async sendMessage(messageData) {
    const response = await api.post('/messages/send', messageData);
    return response.data;
  }
};