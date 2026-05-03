import api from './axios';

export const loginRequest = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const signupRequest = async (payload) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};
