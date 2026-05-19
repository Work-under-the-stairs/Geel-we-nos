import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { articleService } from '../services/articleService'

// ============================================================
// QUERY KEYS — مركزية وثابتة
// ============================================================
export const KEYS = {
  featured:          (limit)             => ['featured', limit],
  trending:          (limit)             => ['trending', limit],
  latest:            (limit)             => ['latest', limit],
  groupedByCategory: (limit)             => ['groupedByCategory', limit],
  categoryFeatured:  (cat)                => ['categoryFeatured', cat],
  categoryNews:      (cat, page, limit)   => ['categoryNews', cat, page, limit],
  categoryTrending:  (cat, limit)         => ['categoryTrending', cat, limit],
  article:           (id)                 => ['article', id],
  comments:          (articleId)          => ['comments', articleId],
}

// ============================================================
// الصفحة الرئيسية
// ============================================================
export const useFeatured = (limit = 3) =>
  useQuery({
    queryKey: KEYS.featured(limit),
    queryFn:  () => articleService.getFeatured(limit).then(r => r.data),
    staleTime: 1000 * 60 * 5, 
  })

export const useTrending = (limit = 5) =>
  useQuery({
    queryKey: KEYS.trending(limit),
    queryFn:  () => articleService.getTrending(limit).then(r => r.data),
    staleTime: 1000 * 60 * 10, 
  })

export const useLatest = (limit = 8) =>
  useQuery({
    queryKey: KEYS.latest(limit),
    queryFn:  () => articleService.getLatest(limit).then(r => r.data),
    staleTime: 1000 * 60 * 2, 
  })

export const useGroupedByCategory = (limit = 4) =>
  useQuery({
    queryKey: KEYS.groupedByCategory(limit),
    queryFn:  () => articleService.getGroupedByCategory(limit).then(r => r.data),
    staleTime: 1000 * 60 * 3,
  })

// ============================================================
// صفحة القسم
// ============================================================
export const useCategoryFeatured = (category) =>
  useQuery({
    queryKey: KEYS.categoryFeatured(category),
    queryFn:  () => articleService.getCategoryFeatured(category).then(r => r.data),
    enabled:  !!category,
    staleTime: 1000 * 60 * 5,
  })

export const useCategoryNews = (category, page = 1, limit = 9) =>
  useQuery({
    queryKey: KEYS.categoryNews(category, page, limit),
    queryFn:  () => articleService.getCategoryNews(category, page, limit).then(r => r.data),
    enabled:  !!category,
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev, 
  })

export const useCategoryTrending = (category, limit = 5) =>
  useQuery({
    queryKey: KEYS.categoryTrending(category, limit),
    queryFn:  () => articleService.getCategoryTrending(category, limit).then(r => r.data),
    enabled:  !!category,
    staleTime: 1000 * 60 * 10,
  })

// ============================================================
// صفحة الخبر
// ============================================================
export const useArticle = (id) =>
  useQuery({
    queryKey: KEYS.article(id),
    queryFn:  () => articleService.getById(id).then(r => r.data),
    enabled:  !!id,
    staleTime: 1000 * 60 * 5,
  })

export const useComments = (articleId) =>
  useQuery({
    queryKey: KEYS.comments(articleId),
    queryFn:  () => articleService.getComments(articleId).then(r => r.data),
    enabled:  !!articleId,
    staleTime: 1000 * 30, 
  })

// ============================================================
// Track View — تعديل ذكي ومضمون باستخدام useEffect
// ============================================================
export const useTrackView = (articleId) => {
  useEffect(() => {
    if (!articleId) return;

    const timer = setTimeout(() => {
      articleService.trackView(articleId).catch(err => console.error("Track view failed", err))
    }, 10000)

    // الـ Cleanup الاحترافي: لو قفل الصفحة أو اتنقل لخبر تاني قبل الـ 10 ثواني، التايمر بيموت فوراً
    return () => clearTimeout(timer)
  }, [articleId])
}

// ============================================================
// التعليقات — Mutations مع تحديث دقيق للكاش
// ============================================================
export const useAddComment = (articleId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => articleService.addComment(articleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: KEYS.comments(articleId),
        exact: true // تحديث كاش الكومنتات بتاعة الخبر ده بالظبط
      })
    },
  })
}

export const useAddReply = (articleId, commentId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => articleService.addReply(articleId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: KEYS.comments(articleId),
        exact: true 
      })
    },
  })
}