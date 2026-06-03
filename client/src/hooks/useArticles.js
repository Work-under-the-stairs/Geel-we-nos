import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { articleService } from '../services/articleService'


export const KEYS = {
  categories:          ()              => ['categories'],
  featured:            (limit)         => ['featured', limit],
  trending:            (limit)         => ['trending', limit],
  latest:              (limit)         => ['latest', limit],
  groupedByCategory:   (limit)         => ['groupedByCategory', limit],
  categoryFeatured:    (cat)           => ['categoryFeatured', cat],
  categoryNews:        (cat, limit)    => ['categoryNews', cat, limit],
  categoryTrending:    (cat, limit)    => ['categoryTrending', cat, limit],
  urgent:              (limit)         => ['urgent', limit],
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


export const useCategories = () =>
  useQuery({
    queryKey: KEYS.categories(),
    queryFn:  () => articleService.getAllCategories()
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 30,
  })


export const useFeatured = (limit = 3) =>
  useQuery({
    queryKey: KEYS.featured(limit),
    queryFn:  () => articleService.getFeatured(limit)
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 5,
  })

export const useUrgent = (limit = 5) =>
  useQuery({
    queryKey: KEYS.urgent(limit),
    queryFn:  () => articleService.getUrgent(limit)
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 5,
  })

export const useTrending = (limit = 5) =>
  useQuery({
    queryKey: KEYS.trending(limit),
    queryFn:  () => articleService.getTrending(limit)
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 10,
  })

export const useLatest = (limit = 8) =>
  useQuery({
    queryKey: KEYS.latest(limit),
    queryFn:  () => articleService.getLatest(limit)
                    .then(res => res.data.data), 
    staleTime: 1000 * 60 * 2,
  })

export const useGroupedByCategory = (limit = 4) =>
  useQuery({
    queryKey: KEYS.groupedByCategory(limit),
    queryFn:  () => articleService.getGroupedByCategory(limit)
                    .then(res => res.data.data),
    staleTime: 1000 * 60 * 3,
  })


export const useCategoryFeatured = (category) =>
  useQuery({
    queryKey: KEYS.categoryFeatured(category),
    queryFn:  () => articleService.getCategoryFeatured(category)
                    .then(res => res.data.data), 
    enabled:  !!category,
    staleTime: 1000 * 60 * 5,
  })

export const useCategoryTrending = (category, limit = 5) =>
  useQuery({
    queryKey: KEYS.categoryTrending(category, limit),
    queryFn:  () => articleService.getCategoryTrending(category, limit)
                    .then(res => res.data.data), 
    enabled:  !!category,
    staleTime: 1000 * 60 * 10,
  })

export const useCategoryNewsInfinite = (category, limit = 6) =>
  useInfiniteQuery({
    queryKey:  KEYS.categoryNews(category, limit),
    queryFn:   ({ pageParam = 1 }) =>
                 articleService.getCategoryNews(category, pageParam, limit)
                   .then(res => res.data),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled:   !!category,
    staleTime: 1000 * 60 * 2,
  })


export const useArticle = (id) =>
  useQuery({
    queryKey: KEYS.article(id),
    queryFn:  () => articleService.getById(id)
                    .then(res => res.data.data),
    enabled:  !!id,
    staleTime: 1000 * 60 * 5,
  })

export const useComments = (articleId) =>
  useQuery({
    queryKey: KEYS.comments(articleId),
    queryFn:  () => articleService.getComments(articleId)
                    .then(res => res.data.data),
    enabled:  !!articleId,
    staleTime: 1000 * 30,
  })


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
// ... (تأكدي من إضافة export قبل الكلمة)
export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      // تأكدي من مسار الـ API الصحيح لقصصك
      const { data } = await axios.get('/api/stories'); 
      return data;
    },
  });
};