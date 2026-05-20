import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { adminService } from '../services/adminService'

// ============================================================
// QUERY KEYS
// ============================================================
export const ADMIN_KEYS = {
  dashboard:       ['admin', 'dashboard'],
  // عملنا Base Key للمقالات عشان نستخدمه في الـ Invalidate
  articlesBase:    ['admin', 'articles'], 
  articles:        (filters) => ['admin', 'articles', filters],
  article:         (id)      => ['admin', 'article', id],
  
  usersBase:       ['admin', 'users'],
  users:           (filters) => ['admin', 'users', filters],
}

// ============ لوحة التحكم (الرئيسية) ============

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ADMIN_KEYS.dashboard,
    queryFn:  () => adminService.getDashboardSummary()
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 5, 
  })

// ============ إدارة المقالات (Queries & Mutations) ============

export const useAdminArticles = (filters = { page: 1, limit: 10, search: '', status: '' }) =>
  useQuery({
    queryKey: ADMIN_KEYS.articles(filters),
    queryFn:  () => adminService.getArticles(filters.page, filters.limit, filters.search, filters.status)
                    .then(res => res.data),
    placeholderData: keepPreviousData, // 👈 التعديل ليتوافق مع V5
    staleTime: 1000 * 60 * 2,
  })

export const useAdminArticle = (id) =>
  useQuery({
    queryKey: ADMIN_KEYS.article(id),
    queryFn:  () => adminService.getArticleById(id)
                    .then(res => res.data.data),
    enabled:  !!id, 
    staleTime: 1000 * 60 * 5,
  })

export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => adminService.createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articlesBase }) // 👈 التعديل الصح للـ Invalidate
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => adminService.updateArticle(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.article(id) })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articlesBase })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}

export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => adminService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.articlesBase })
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard })
    },
  })
}

// ============ إدارة المستخدمين ============

export const useAdminUsers = (filters = { page: 1, limit: 10, search: '', role: '' }) => {
  return useQuery({
    queryKey: ADMIN_KEYS.users(filters),
    queryFn: () => adminService.getUsers(filters.page, filters.limit, filters.search, filters.role)
                    .then(res => res.data),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () => adminService.getCategories().then(res => res.data),
    staleTime: 1000 * 60 * 10,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // 👇 التعديل ده مهم عشان React Query V5 بياخد Object واحد
    mutationFn: ({ id, data }) => adminService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
};