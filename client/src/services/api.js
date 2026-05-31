import axios from 'axios';
import { auth } from '../firebase'; // تأكدي من مسار ملف الـ firebase
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
    // 🌟 التعديل الجوهري: ننتظر حتى ينتهي فايربيز من تهيئة حالة تسجيل الدخول
    if (typeof auth.authStateReady === 'function') {
      await auth.authStateReady();
    }

    const user = auth.currentUser;
    
    if (user) {
      // فايربيز هنا بيجيب التوكن، ولو لقى التوكن قرب ينتهي بيجدده تلقائياً قبل ما يبعته
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
      
      // بنحدث التوكن في اللوكال ستوريدج كـ Fallback احتياطي
      localStorage.setItem('token', token);
    } else {
      // لو المستخدم فعلاً مش مسجل دخول في فايربيز، بنجرب اللوكال ستوريدج
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
    // لو الباك إند رجع 401 بعد ما بعتنا التوكن الطازة، ده معناه إن اليوزر فعلاً ملوش صلاحية أو تم حظره
    if (error.response && error.response.status === 401) {
      logout(); 
    }
    return Promise.reject(error);
  }
);

export default api;