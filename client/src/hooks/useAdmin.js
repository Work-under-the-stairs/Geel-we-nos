import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../services/adminService'

// ============================================================
// QUERY KEYS
// ============================================================
export const ADMIN_KEYS = {
  dashboard:       ['admin', 'dashboard'],
  articles:        (filters) => ['admin', 'articles', filters],
  article:         (id)      => ['admin', 'article', id],
  users:           (page)    => ['admin', 'users', page],
}

// ============================================================
// الـ response shapes (بافتراض إن الباك اند بيرجع { data: ... })
// لو الباك اند بيرجع الداتا مباشرة في res.data، غيري res.data.data لـ res.data
// ============================================================


// ============ لوحة التحكم (الرئيسية) ============

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ADMIN_KEYS.dashboard,
    queryFn:  () => adminService.getDashboardSummary()
                    .then(res => res.data.data), // ← object مجمع فيه كل إحصائيات الداشبورد
    staleTime: 1000 * 60 * 5, // 5 دقايق عشان الإحصائيات مش بتتغير كل ثانية
  })


// ============ إدارة المقالات (Queries) ============

export const useAdminArticles = (filters = { page: 1, limit: 10, search: '', status: '' }) =>
  useQuery({
    queryKey: ADMIN_KEYS.articles(filters),
    queryFn:  () => adminService.getArticles(filters.page, filters.limit, filters.search, filters.status)
                    .then(res => res.data), // ← بنرجع data كاملة عشان بيكون فيها page و totalPages للجدول
    keepPreviousData: true, // مهم جداً عشان الجدول ميعملش فلاش (Loading) لما تقلبي بين الصفحات
    staleTime: 1000 * 60 * 2,
  })

export const useAdminArticle = (id) =>
  useQuery({
    queryKey: ADMIN_KEYS.article(id),
    queryFn:  () => adminService.getArticleById(id)
                    .then(res => res.data.data),
    enabled:  !!id, // مش هيعمل ريكويست إلا لو فيه ID
    staleTime: 1000 * 60 * 5,
  })


// ============ إدارة المقالات (Mutations) ============

export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => adminService.createArticle(data),
    onSuccess: () => {
      // بنعمل invalidate لقائمة المقالات والداشبورد عشان الأرقام تتحدث فوراً
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articles._def }) // بيمسح أي كاش يخص المقالات
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}

export const useUpdateArticle = (id) => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => adminService.updateArticle(id, data),
    onSuccess: () => {
      // تحديث المقال نفسه والقائمة
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.article(id) })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articles._def })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}

export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id) => adminService.deleteArticle(id),
    onSuccess: () => {
      // تحديث القائمة والداشبورد بعد الحذف
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articles._def })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}