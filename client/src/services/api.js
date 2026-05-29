import axios from 'axios';
// تأكدي من تعديل المسار هنا ليتطابق مع مكان ملف auth.js في مشروعك
import { logout } from '../utils/auth';

const api = axios.create({
  // هنا نقوم بضبط الـ baseURL ليستخدم المتغير الذي وضعناه في ملف .env
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 1. Request Interceptor: لإضافة التوكن في أي طلب خارج من الفرونت إند
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Response Interceptor: لاصطياد الأخطاء الراجعة من الباك إند
api.interceptors.response.use(
  (response) => {
    // الطلب نجح، نرجع البيانات كما هي
    return response;
  },
  (error) => {
    // لو الباك إند رجع خطأ 401 (غير مصرح أو التوكن منتهي)
    if (error.response && error.response.status === 401) {
      logout(); // استدعاء دالة تسجيل الخروج لمسح البيانات وإعادة تحميل الصفحة
    }
    // إرجاع الخطأ لباقي الكود في حال أردتِ التعامل معه في المكونات (Components)
    return Promise.reject(error);
  }
);

export default api;