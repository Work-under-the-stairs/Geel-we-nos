import api from './api'

export const adminService = {
  // ============ لوحة التحكم (الرئيسية) ============
  getDashboardSummary: () => api.get('/users/dashboard'),

  // ============ إدارة المقالات (CRUD) ============
  getArticles: (page = 1, limit = 10, search = '', status = '') => 
    api.get(`/admin/articles?page=${page}&limit=${limit}&search=${search}&status=${status}`),
    
  getArticleById: (id) => api.get(`/admin/articles/${id}`),
  createArticle: (data) => api.post('/admin/articles', data),
  updateArticle: (id, data) => api.put(`/admin/articles/${id}`, data),
  deleteArticle: (id) => api.delete(`/admin/articles/${id}`),

  // ============ إدارة المستخدمين ============
  // عدلنا دي عشان تاخد الفلاتر وتكلم راوت الـ /users صح
  getUsers: (page = 1, limit = 10, search = '', role = '') => 
    api.get(`/users?page=${page}&limit=${limit}&search=${search}&role=${role}`),
  
  deleteUser: (id) => api.delete(`/users/${id}`),
}