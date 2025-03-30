// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
const token = globalThis.localStorage?.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loadQuestion = async (id) => {
  try {
    const response = await api.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error loading question:', error);
    throw error;
  }
};

export const validateAnswer = async (questionId, answer) => {
  try {
    const response = await api.post('/vali', { id: questionId, answer });
    return response.data;
  } catch (error) {
    console.error('Error validating answer:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};