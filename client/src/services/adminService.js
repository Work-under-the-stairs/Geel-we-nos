import api from './api'

export const adminService = {
  // ============ لوحة التحكم (الرئيسية) ============
  getDashboardSummary: () => api.get('/users/dashboard'),

  // ============ إدارة المقالات (CRUD) ============
  // 👇 اتعدلت لـ /news
  getArticles: (page = 1, limit = 10, search = '', status = '') => 
    api.get(`/news?page=${page}&limit=${limit}&search=${search}&status=${status}`),
    
  getArticleById: (id) => api.get(`/news/${id}`),
  
  // 👇 اتعدلت لـ /news/add عشان تطابق الباك اند
  createArticle: (data) => api.post('/news/add', data),
  
  // 👇 اتعدلت لـ api.patch بدل api.put عشان تطابق الباك اند
  updateArticle: (id, data) => api.patch(`/news/${id}`, data),
  
  // 👇 اتعدلت لـ /news
  deleteArticle: (id) => api.delete(`/news/${id}`),

  // ============ إدارة المستخدمين ============
  getUsers: (page = 1, limit = 10, search = '', role = '') => 
    api.get(`/users?page=${page}&limit=${limit}&search=${search}&role=${role}`),

  updateUser: (id, data) => api.patch(`/users/${id}`, data),
  
  deleteUser: (id) => api.delete(`/users/${id}`),

  
  getCategories: () => api.get('/categories'), 
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.patch(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
}