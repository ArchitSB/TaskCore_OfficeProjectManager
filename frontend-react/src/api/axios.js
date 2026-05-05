import axios from 'axios';

const rawEnvUrl = import.meta.env.VITE_API_URL;
const envUrl = rawEnvUrl ? rawEnvUrl.replace(/^["']|["']$/g, '').replace(/\/$/, '') : null;
const API_BASE_URL = envUrl ? `${envUrl}/api` : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof unauthorizedHandler === 'function') {
      unauthorizedHandler();
    }

    return Promise.reject(error);
  }
);

export default api;
