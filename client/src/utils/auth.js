import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const logout = async () => {
  try {
    await signOut(auth);
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    window.location.replace("/"); 
    
  } catch (error) {
    console.error("حدث خطأ أثناء تسجيل الخروج:", error);
  }
};


export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return !!user;
};


export const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};


export const getUsername = () => {
  const user = getUserData();
  return user ? user.name : null;
};


export const isAdmin = () => {
  const user = getUserData();
  return user ? user.role === 'admin' : false;
};