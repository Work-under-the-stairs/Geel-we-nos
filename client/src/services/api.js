import axios from 'axios'

const api = axios.create({
  // هنا نقوم بضبط الـ baseURL ليستخدم المتغير الذي وضعناه في ملف .env
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api