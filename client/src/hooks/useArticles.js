import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { articleService } from '../services/articleService'

// ============================================================
// QUERY KEYS
// ============================================================
export const KEYS = {
  categories:          ()              => ['categories'], // ← مفتاح الأقسام العامة
  featured:            (limit)         => ['featured', limit],
  trending:            (limit)         => ['trending', limit],
  latest:              (limit)         => ['latest', limit],
  groupedByCategory:   (limit)         => ['groupedByCategory', limit],
  categoryFeatured:    (cat)           => ['categoryFeatured', cat],
  categoryNews:        (cat, limit)    => ['categoryNews', cat, limit],
  categoryTrending:    (cat, limit)    => ['categoryTrending', cat, limit],
  article:             (id)            => ['article', id],
  comments:            (id)            => ['comments', id],
}

// ============================================================
// الـ response shapes الثابتة بعد ما شفنا الـ network:
//
// categories   → res.data.data         = array من الأقسام
// featured     → res.data.data         = object واحد
// trending     → res.data.data         = array
// categoryNews → res.data.data         = array
//               res.data.page         = number
//               res.data.totalPages = number
// ============================================================

// ============ الأقسام العامة ============

export const useCategories = () =>
  useQuery({
    queryKey: KEYS.categories(),
    queryFn:  () => articleService.getAllCategories()
                    .then(res => res.data.data), // ← مصفوفة تحتوي على كل الأقسام
    staleTime: 1000 * 60 * 30, // 30 دقيقة لأن الأقسام نادراً ما تتغير
  })

// ============ الصفحة الرئيسية ============

export const useFeatured = (limit = 3) =>
  useQuery({
    queryKey: KEYS.featured(limit),
    queryFn:  () => articleService.getFeatured(limit)
                    .then(res => res.data.data), // ← object واحد
    staleTime: 1000 * 60 * 5,
  })

export const useTrending = (limit = 5) =>
  useQuery({
    queryKey: KEYS.trending(limit),
    queryFn:  () => articleService.getTrending(limit)
                    .then(res => res.data.data), // ← array
    staleTime: 1000 * 60 * 10,
  })

export const useLatest = (limit = 8) =>
  useQuery({
    queryKey: KEYS.latest(limit),
    queryFn:  () => articleService.getLatest(limit)
                    .then(res => res.data.data), // ← array
    staleTime: 1000 * 60 * 2,
  })

export const useGroupedByCategory = (limit = 4) =>
  useQuery({
    queryKey: KEYS.groupedByCategory(limit),
    queryFn:  () => articleService.getGroupedByCategory(limit)
                    .then(res => res.data.data),
    staleTime: 1000 * 60 * 3,
  })

// ============ صفحة القسم ============

export const useCategoryFeatured = (category) =>
  useQuery({
    queryKey: KEYS.categoryFeatured(category),
    queryFn:  () => articleService.getCategoryFeatured(category)
                    .then(res => res.data.data), // ← object واحد
    enabled:  !!category,
    staleTime: 1000 * 60 * 5,
  })

export const useCategoryTrending = (category, limit = 5) =>
  useQuery({
    queryKey: KEYS.categoryTrending(category, limit),
    queryFn:  () => articleService.getCategoryTrending(category, limit)
                    .then(res => res.data.data), // ← array
    enabled:  !!category,
    staleTime: 1000 * 60 * 10,
  })

export const useCategoryNewsInfinite = (category, limit = 6) =>
  useInfiniteQuery({
    queryKey:  KEYS.categoryNews(category, limit),
    queryFn:   ({ pageParam = 1 }) =>
                 articleService.getCategoryNews(category, pageParam, limit)
                   .then(res => res.data),
                 // ↑ هنا بنرجع res.data كاملة عشان محتاجين page وtotalPages
                 // النتيجة: { data: [...], page: 1, totalPages: 2, totalArticles: 11 }
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled:   !!category,
    staleTime: 1000 * 60 * 2,
  })

// ============ صفحة الخبر ============

export const useArticle = (id) =>
  useQuery({
    queryKey: KEYS.article(id),
    queryFn:  () => articleService.getById(id)
                    .then(res => res.data.data), // ← object واحد
    enabled:  !!id,
    staleTime: 1000 * 60 * 5,
  })

export const useComments = (articleId) =>
  useQuery({
    queryKey: KEYS.comments(articleId),
    queryFn:  () => articleService.getComments(articleId)
                    .then(res => res.data.data), // ← array
    enabled:  !!articleId,
    staleTime: 1000 * 30,
  })

// ============ Track View ============

export const useTrackView = (articleId) => {
  useEffect(() => {
    if (!articleId) return
    const timer = setTimeout(() => {
      articleService.trackView(articleId)
        .catch(err => console.error('Track view failed:', err))
    }, 10000)
    return () => clearTimeout(timer)
  }, [articleId])
}

// ============ Mutations ============

export const useAddComment = (articleId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => articleService.addComment(articleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.comments(articleId), exact: true })
    },
  })
}

export const useAddReply = (articleId, commentId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => articleService.addReply(articleId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.comments(articleId), exact: true })
    },
  })
}