// src/pages/ArticleDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Clock, MessageSquare, Send, Play, FolderOpen } from 'lucide-react';
import PopularArticles from '../components/ui/PopularArticles';

// داتا وهمية (Dummy Data) للتجربة بناءً على الـ Schema الخاصة بكِ
import { FEATURED_NEWS } from '../data/dummyData';

export default function ArticleDetail() {
  const { id } = useParams();

  // === 1. جلب بيانات الخبر ===
  // ملاحظة: هنا نقوم بالتجربة بداتا وهمية، لاحقاً ستكون عبر الـ API (axios/fetch)
  const article = FEATURED_NEWS[0]
  // === 2. حالات التحكم (States) لمعرض الميديا والتعليقات ===
  // نحدد الميديا النشطة الافتراضية كأول صورة في مصفوفة الصور
  const [activeMedia, setActiveMedia] = useState({ type: 'image', url: article.images?.[0] });
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState(article.comments || []);
  // console.log("Article Data:", article.comments); // للتأكد من جلب البيانات بشكل صحيح

  // داتا وهمية للـ Sidebar (الأكثر قراءة)
  const popularArticlesData = FEATURED_NEWS.slice(1, 7);

  // === 3. معالجة التاريخ والوقت ===
  const articleDate = new Date(article.createdAt);
  const formattedDate = articleDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = articleDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

  // === 4. إرسال تعليق جديد ===
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      _id: Date.now().toString(),
      userName: "مستخدم زائر",
      commentText: newComment,
      createdAt: new Date().toISOString()
    };

    setCommentsList([newCommentObj, ...commentsList]);
    setNewComment("");
  };

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
                <span>{article.category}</span>
              </div>
              <h1 style={{ fontFamily: "'Cairo', sans-serif" }} className="text-2xl sm:text-4xl font-black text-primary leading-tight">
                {article.title}
              </h1>

              {/* الميتا داتا (الكاتب، التاريخ، الوقت) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 border-y border-gray-100 py-3">
                <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                  <User size={16} className="text-[var(--color-secondary)]" />
                  {article.writer?.name || article.writer || "المحرر"}
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
            </div>

            {/* 2. معرض الميديا (الأساسية والفرعية) */}
            <div className="space-y-4">
              {/* شاشة العرض الأساسية الكبيرة */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-950 shadow-md">
                {activeMedia.type === 'image' ? (
                  <img 
                    src={activeMedia.url} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                ) : (
                  <video 
                    src={activeMedia.url} 
                    controls 
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* شريط الصور والفيديوهات المصغرة (Thumbnails) */}
              <div className="flex flex-wrap gap-3 overflow-x-auto py-1">
                {/* عرض الصور المصغرة */}
                {article.images?.map((imgUrl, idx) => (
                  <button
                    key={`img-${idx}`}
                    onClick={() => setActiveMedia({ type: 'image', url: imgUrl })}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                      activeMedia.type === 'image' && activeMedia.url === imgUrl 
                        ? 'border-[var(--color-secondary)] scale-95 shadow-sm' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}

                {/* عرض الفيديوهات المصغرة إن وجدت */}
                {article.videos?.map((videoUrl, idx) => (
                  <button
                    key={`vid-${idx}`}
                    onClick={() => setActiveMedia({ type: 'video', url: videoUrl })}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-900 border-2 transition-all shrink-0 flex items-center justify-center ${
                      activeMedia.type === 'video' && activeMedia.url === videoUrl 
                        ? 'border-[var(--color-secondary)] scale-95 shadow-sm' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                      <Play size={18} className="text-white fill-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. متن الخبر نفسه */}
            <div 
              style={{ fontFamily: "'Cairo', sans-serif" }}
              className="text-lg text-gray-800 leading-relaxed font-normal whitespace-pre-line space-y-4"
            >
              {article.content}
            </div>

            {/* خط فاصل قبل التعليقات */}
            <hr className="border-gray-100" />

            {/* 4. قسم التعليقات */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold flex items-center gap-2 text-gray-900">
                <MessageSquare size={22} className="text-[var(--color-primary)]" />
                <span>التعليقات ({commentsList.length})</span>
              </h3>

              {/* فورم إضافة تعليق */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <label className="block text-sm font-bold text-gray-700">اترك تعليقاً:</label>
                <div className="relative">
                  <textarea
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="اكتب رأيك هنا بكل احترام..."
                    className="w-full text-sm rounded-xl border border-gray-200 p-4 pl-12 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute bottom-4 left-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white p-2 rounded-xl transition-all shadow-sm flex items-center justify-center"
                  >
                    <Send size={16} className="transform -rotate-45" />
                  </button>
                </div>
              </form>

              {/* قائمة التعليقات المكتوبة */}
              <div className="space-y-4">
                {commentsList.length > 0 ? (
                  commentsList.map((comment) => (
                    <div key={comment._id} className="bg-white border border-gray-100 p-4 rounded-2xl space-y-1.5 transition-all hover:border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-800">{comment.userName}</span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed font-light">
                        {comment.commentText}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-400 py-6">لا توجد تعليقات بعد، كن أول المعلقين!</p>
                )}
              </div>

            </div>

          </div>

          {/* ================= الثلث الأخير (30%): الأكثر قراءة الـ Sidebar ================= */}
          <div className="lg:col-span-1">
            <PopularArticles articles={popularArticlesData} />
          </div>

        </div>
      </main>
    </div>
  );
}