import { API_ENDPOINTS } from '../utils/constants';

// Mock API service for future integration
export const api = {
  get: async (url) => {
    console.log(`GET ${url}`);
    return { data: [] };
  },
  post: async (url, data) => {
    console.log(`POST ${url}`, data);
    return { success: true };
  }
};
