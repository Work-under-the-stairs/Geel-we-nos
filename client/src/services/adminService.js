import api from './api'

export const adminService = {

  // ============ لوحة التحكم (الرئيسية) ============
  getDashboardSummary: () => api.get('/admin/dashboard'),

  // ============ إدارة المقالات (CRUD) ============
  // بنبعت page و limit وأي فلاتر تانية للبحث
  getArticles: (page = 1, limit = 10, search = '', status = '') => 
    api.get(`/admin/articles?page=${page}&limit=${limit}&search=${search}&status=${status}`),
    
  getArticleById: (id) => api.get(`/admin/articles/${id}`),
  
  createArticle: (data) => api.post('/admin/articles', data),
  
  updateArticle: (id, data) => api.put(`/admin/articles/${id}`, data),
  
  deleteArticle: (id) => api.delete(`/admin/articles/${id}`),

  // ============ إدارة المستخدمين (كمثال لباقي الأقسام) ============
  getUsers: (page = 1, limit = 10) => api.get(`/admin/users?page=${page}&limit=${limit}`),
  
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
}