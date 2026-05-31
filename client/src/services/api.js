import axios from 'axios';
import { auth } from '../firebase'; // Make sure the path to your firebase.js is correct
import { logout } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : undefined),
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

if (!import.meta.env.VITE_API_URL) {
  console.warn('[client] VITE_API_URL is not set — falling back to same-origin /api. If your backend is hosted elsewhere, set VITE_API_URL.');
}

// 1. Request Interceptor: Attach fresh Firebase token to every outgoing request
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    
    if (user) {
      // Automatically retrieves the token, and refreshes it if it is expired
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Fallback to localStorage if Firebase auth state is not initialized yet
      const localToken = localStorage.getItem('token');
      if (localToken) config.headers.Authorization = `Bearer ${localToken}`;
    }
  } catch (error) {
    console.error("Error fetching Firebase token:", error);
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Response Interceptor: Handle unauthorized errors from backend
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If backend returns 401 (Unauthorized / Token truly invalid)
    if (error.response && error.response.status === 401) {
      logout(); 
    }
    return Promise.reject(error);
  }
);

export default api;