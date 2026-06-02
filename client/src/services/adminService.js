import api from './api'

export const adminService = {
  getDashboardSummary: () => api.get('/users/dashboard'),


  getArticles: (page = 1, limit = 10, search = '', status = '', category = '', sort = '-createdAt') => 
    api.get(`/news?page=${page}&limit=${limit}&search=${search}&status=${status}&category=${category}&sort=${sort}`),
    
  getArticleById: (id) => api.get(`/news/${id}`),
  
  createArticle: (data) => api.post('/news/add', data),
  
  updateArticle: (id, data) => api.patch(`/news/${id}`, data),
  
  deleteArticle: (id) => api.delete(`/news/${id}`),

  getUsers: (page = 1, limit = 10, search = '', role = '') => 
    api.get(`/users?page=${page}&limit=${limit}&search=${search}&role=${role}`),

  updateUser: (id, data) => api.patch(`/users/${id}`, data),
  
  deleteUser: (id) => api.delete(`/users/${id}`),

  
  getCategories: () => api.get('/categories'), 
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.patch(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),

  
}