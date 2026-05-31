import api from './api'

export const articleService = {

  // ============ الأقسام العامة ============
  getAllCategories:     () => api.get('/categories'), // جلب كل الأقسام للجميع

  // ============ الصفحة الرئيسية ============
  getFeatured:          (limit = 3)  => api.get(`/news/featured?limit=${limit}`),
  getTrending:          (limit = 5)  => api.get(`/news/trending?limit=${limit}`),
  getLatest:            (limit = 8)  => api.get(`/news/latest?limit=${limit}`),
  getGroupedByCategory: (limit = 4)  => api.get(`/news/grouped-by-category?limit=${limit}`),
  getUrgent:            (limit = 5)  => api.get(`/news/urgent?limit=${limit}`),


  // ============ صفحة القسم ============
  getCategoryFeatured: (cat)            => api.get(`/news/category/${encodeURIComponent(cat)}/featured`),
  getCategoryNews:     (cat, page, limit) => api.get(`/news/category/${encodeURIComponent(cat)}?page=${page}&limit=${limit}`),
  getCategoryTrending: (cat, limit = 5) => api.get(`/news/category/${encodeURIComponent(cat)}/trending?limit=${limit}`),

  // ============ صفحة الخبر ============
  getById:     (id)           => api.get(`/news/${id}`),
  getComments: (id)           => api.get(`/news/${id}/comments`),
  trackView:   (id)           => api.post(`/news/${id}/view`),

  // ============ التعليقات ============
  addComment:  (id, data)              => api.post(`/news/${id}/comments`, data),
  addReply:    (id, commentId, data)   => api.post(`/news/${id}/comments/${commentId}/replies`, data),
}