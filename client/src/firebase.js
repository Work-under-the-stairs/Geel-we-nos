import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // استيراد موديل المصادقة بدلاً من الإحصائيات

// إعدادات تطبيقك التي حصلتِ عليها
const firebaseConfig = {
  apiKey: "AIzaSyBcJlpFyN49qzzbKn28gbUR0H_TKE7P1Zk",
  authDomain: "geelwnos.firebaseapp.com",
  projectId: "geelwnos",
  storageBucket: "geelwnos.firebasestorage.app",
  messagingSenderId: "648922560312",
  appId: "1:648922560312:web:5fe73a60fb02c1829973cd",
  measurementId: "G-KS5607478F"
};

// تهيئة وتشغيل Firebase
const app = initializeApp(firebaseConfig);

// تصدير متغير التوثيق (auth) حتى نتمكن من استدعائه في صفحات الـ Login والـ Register
export const auth = getAuth(app);