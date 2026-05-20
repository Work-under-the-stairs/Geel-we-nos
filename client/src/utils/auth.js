// src/utils/auth.js

/**
 * دالة للتأكد هل المستخدم مسجل دخول (عن طريق التحقق من وجود التوكن)
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
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

/**
 * دالة لتسجيل الخروج (تنظيف الـ localStorage)
 */
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload(); // إعادة تحميل الصفحة عشان الـ Navbar يتحدث
};