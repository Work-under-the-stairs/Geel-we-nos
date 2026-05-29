import { jwtDecode } from "jwt-decode";

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload(); 
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  
  if (!token) return false;

  try {
    // فك تشفير التوكن لمعرفة بياناته
    const decodedToken = jwtDecode(token);
    // الوقت الحالي بالثواني
    const currentTime = Date.now() / 1000;

    // مقارنة الوقت الحالي بوقت انتهاء التوكن
    if (decodedToken.exp < currentTime) {
      // لو التوكن منتهي الصلاحية، نعمل تسجيل خروج فوراً
      logout();
      return false;
    }
    
    return true; // التوكن موجود وصالح
  } catch (error) {
    // لو التوكن مش سليم أو حصل خطأ في فك التشفير
    logout();
    return false;
  }
};

/**
 * دالة لجلب بيانات المستخدم المخزنة
 */
export const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * دالة لجلب اسم المستخدم (Username)
 */
export const getUsername = () => {
  const user = getUserData();
  return user ? user.name : null;
};

/**
 * دالة للتأكد هل المستخدم لديه صلاحية "مدير" (Admin)
 * نفترض أن الـ role مخزنة في بيانات المستخدم (userData.role)
 */
export const isAdmin = () => {
  const user = getUserData();
  return user ? user?.role === 'admin' : false;
};
