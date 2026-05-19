import api from './api'

export const articleService = {

  // ============ الصفحة الرئيسية ============

  // أجدد الأخبار الأعلى important_rate (العاجلة)
  getFeatured: (limit = 3) =>
    api.get(`/news/featured?limit=${limit}`),

  // الأكثر قراءة (views الأعلى)
  getTrending: (limit = 5) =>
    api.get(`/news/trending?limit=${limit}`),

  // أحدث الأخبار من كل الموقع
  getLatest: (limit = 8) =>
    api.get(`/news/latest?limit=${limit}`),

  // أحدث X أخبار من كل قسم في call واحد
  // الـ response: { "اقتصاد": [...], "صحة": [...], ... }
  getGroupedByCategory: (limit = 4) =>
    api.get(`/news/grouped-by-category?limit=${limit}`),


  // ============ صفحة القسم ============

  // أهم خبر في القسم (الأعلى important_rate)
  getCategoryFeatured: (category) =>
    api.get(`/news/category/${encodeURIComponent(category)}/featured`),

  // أخبار القسم مع pagination
  getCategoryNews: (category, page = 1, limit = 9) =>
    api.get(`/news/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`),

  // الأكثر قراءة في القسم (للسايدبار)
  getCategoryTrending: (category, limit = 5) =>
    api.get(`/news/category/${encodeURIComponent(category)}/trending?limit=${limit}`),


  // ============ صفحة الخبر ============

  // الخبر نفسه بدون comments
  getById: (id) =>
    api.get(`/news/${id}`),

  // comments الخبر — منفصلة!
  getComments: (articleId) =>
    api.get(`/news/${articleId}/comments`),

  // تسجيل view (بيتبعت بعد 10 ثواني من الصفحة)
  trackView: (articleId) =>
    api.post(`/news/${articleId}/view`),


  // ============ التعليقات ============

  addComment: (articleId, data) =>
    api.post(`/news/${articleId}/comments`, data),

  addReply: (articleId, commentId, data) =>
    api.post(`/news/${articleId}/comments/${commentId}/replies`, data),

}