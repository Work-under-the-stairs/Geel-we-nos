// src/pages/ArticleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Users, Calendar, Clock, MessageSquare, SendHorizonal, Play, FolderOpen, Reply, Loader2 } from 'lucide-react';
import PopularArticles from '../components/ui/PopularArticles';
import Loading from '../components/layout/Loading';
import { toast } from 'react-hot-toast';
import { isAuthenticated } from "../utils/auth";
import CommentItem from '../components/ui/Article/CommentItem';

// استيراد مكتبة Plyr والـ CSS الخاص بها
import { Plyr } from "plyr-react";
import "plyr/dist/plyr.css";

import { 
  useArticle, 
  useComments, 
  useAddComment, 
  useTrackView,
  useTrending 
} from '../hooks/useArticles';

// =========================================================================
// 📰 الصفحة الأساسية (Article Detail)
// =========================================================================
export default function ArticleDetail() {
  const { id } = useParams();

  // === 1. تفعيل الهوكس الخاصة بالباك إند ===
  useTrackView(id); 
  
  const { data: article, isLoading: loadArticle } = useArticle(id);
  const { data: commentsData, isLoading: loadComments } = useComments(id);
  const { data: popularArticlesData } = useTrending(5);

  const { mutate: submitComment, isPending: isCommenting } = useAddComment(id);

  // === 2. حالات التحكم في الصفحة ===
  const [activeMedia, setActiveMedia] = useState(null);
  const [newComment, setNewComment] = useState("");

  // لضبط الميديا الافتراضية (الأولوية للصور أولاً كما طلبت، ثم الفيديوهات)
  useEffect(() => {
    if (article?.images && article.images.length > 0) {
      setActiveMedia({ type: 'image', url: article.images[0] });
    } else if (article?.image) {
      setActiveMedia({ type: 'image', url: article.image });
    } else if (article?.videos && article.videos.length > 0) {
      setActiveMedia({ type: 'youtube', url: article.videos[0] });
    }
  }, [article]);

  // إعدادات Plyr لإخفاء كل ما يخص يوتيوب قدر الإمكان وتشغيل الفيديو تلقائياً
  const plyrOptions = {
    autoplay: true, // تشغيل تلقائي بمجرد اختيار الفيديو
    youtube: { 
      noCookie: true,    // أمان أفضل ويمنع تتبع الإعلانات
      rel: 0,            // منع الفيديوهات المقترحة من قنوات أخرى
      modestbranding: 1, // إخفاء لوجو يوتيوب قدر الإمكان
      iv_load_policy: 3, // إخفاء البطاقات التفاعلية
      controls: 0,       // إخفاء تحكم يوتيوب الأصلي لترك التحكم لـ Plyr فقط
      disablekb: 1,      // تعطيل اختصارات كيبورد يوتيوب
      playsinline: 1     // تشغيل داخل الإطار في الموبايل
    },
    controls: [
      'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'
    ],
  };

  // === 3. إضافة تعليق جديد رئيسي ===
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      toast.error("يجب تسجيل الدخول أولاً!");
      return;
    }

    if (!newComment.trim()) return;

    submitComment({ content: newComment }, {
      onSuccess: () => setNewComment("")
    });
  };

  if (loadArticle) return <Loading />;
  if (!article) return <div className="text-center py-20 text-xl font-bold">عذراً، هذا الخبر غير موجود.</div>;

  const articleDate = new Date(article.createdAt || Date.now());
  const formattedDate = articleDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = articleDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  
  const commentsList = commentsData || [];

  return (
    <div className="min-h-screen bg-white antialiased text-gray-900" dir="rtl">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ================= الثلثين (70%): تفاصيل الخبر والتعليقات ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. رأس الخبر: العنوان والبيانات */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold px-3 py-1.5 rounded-md">
                <FolderOpen size={14} />
                <span>{article.category?.name || "عام"}</span>
              </div>
              <h1 style={{ fontFamily: "'Cairo', sans-serif" }} className="text-2xl sm:text-4xl font-black text-primary leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 border-y border-gray-100 py-3">
                <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                  <User size={16} className="text-[var(--color-secondary)]" />
                  {article.writer?.name || "جيل ونص"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 border-r pr-4 border-gray-200">
                  <Clock size={16} />
                  الساعة {formattedTime}
                </span>
              </div>

              {/* فريق العمل */}
              {article.contributors && article.contributors.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                    <Users size={14} className="text-[var(--color-primary)]" />
                    فريق العمل:
                  </span>
                  {article.contributors.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-[var(--color-primary)]/8 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full border border-[var(--color-primary)]/20"
                    >
                      {c.name}
                      <span className="text-[10px] font-normal opacity-60 uppercase">{c.role}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 2. معرض الميديا */}
            {activeMedia && (
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-950 shadow-md">
                  {activeMedia.type === 'image' ? (
                    <img 
                      src={activeMedia.url} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  ) : (
                    <div className="w-full h-full text-left" dir="ltr">
                      <Plyr 
                        source={{
                          type: 'video',
                          sources: [{ src: activeMedia.url, provider: 'youtube' }]
                        }} 
                        options={plyrOptions} 
                      />
                    </div>
                  )}
                </div>

                {/* شريط الصور والفيديوهات المصغرة */}
                {((article.images?.length > 1) || (article.videos?.length > 1) || (article.images?.length > 0 && article.videos?.length > 0)) && (
                  <div className="flex flex-wrap gap-3 overflow-x-auto py-1 custom-scrollbar">
                    
                    {/* عرض الصور أولاً كما طلبت */}
                    {article.images?.map((imgUrl, idx) => (
                      <button
                        key={`img-${idx}`}
                        onClick={() => setActiveMedia({ type: 'image', url: imgUrl })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                          activeMedia?.url === imgUrl && activeMedia?.type === 'image' ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}

                    {/* ثم عرض الفيديوهات ثانياً */}
                    {article.videos?.map((vidId, idx) => (
                      <button
                        key={`vid-${idx}`}
                        onClick={() => setActiveMedia({ type: 'youtube', url: vidId })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-900 border-2 transition-all shrink-0 flex items-center justify-center ${
                          activeMedia?.url === vidId && activeMedia?.type === 'youtube' ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${vidId}/0.jpg`} 
                          alt="تشغيل الفيديو" 
                          className="absolute inset-0 w-full h-full object-cover opacity-50" 
                        />
                        <div className="relative z-10 bg-red-600 text-white p-1.5 rounded-full shadow-md">
                          <Play size={16} fill="currentColor" />
                        </div>
                      </button>
                    ))}

                  </div>
                )}
              </div>
            )}

            <div 
              style={{ fontFamily: "'Cairo', sans-serif" }}
              className="article-content text-lg text-gray-800 leading-relaxed font-normal space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.hashtags && article.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
                {article.hashtags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-[16px] font-bold text-slate-500 bg-slate-50 hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300 px-3 py-1 rounded-full border border-slate-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <hr className="border-gray-100 my-8" />

            {/* 4. قسم التعليقات والردود الديناميكي */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold flex items-center gap-2 text-gray-900">
                <MessageSquare size={22} className="text-[var(--color-primary)]" />
                <span>التعليقات ({commentsList.length})</span>
              </h3>

              <form onSubmit={handleCommentSubmit} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <label className="block text-sm font-bold text-gray-700">اترك تعليقاً:</label>
                <div className="relative">
                  <textarea
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="اكتب رأيك هنا بكل احترام..."
                    className="w-full text-sm rounded-xl border border-gray-200 p-4 pl-12 focus:border-[var(--color-primary)] outline-none resize-none bg-white"
                  />
                  <button 
                    type="submit"
                    disabled={isCommenting}
                    className="absolute bottom-4 left-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white p-2 rounded-xl transition-all shadow-sm disabled:opacity-50"
                  >
                    {isCommenting ? <Loader2 size={16} className="animate-spin" /> : <SendHorizonal size={16} className=" cursor-pointer" />}
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {loadComments ? (
                  <div className="flex justify-center py-4"><Loader2 className="animate-spin text-gray-400" /></div>
                ) : commentsList.length > 0 ? (
                  commentsList.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} articleId={id} />
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-400 py-6">لا توجد تعليقات بعد، كن أول المعلقين!</p>
                )}
              </div>

            </div>
          </div>

          {/* ================= الثلث الأخير (30%): الأكثر قراءة ================= */}
          <div className="lg:col-span-1">
            <PopularArticles articles={popularArticlesData || []} />
          </div>

        </div>
      </main>
    </div>
  );
}