// src/pages/ArticleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Clock, MessageSquare, Send, Play, FolderOpen, Reply, Loader2 } from 'lucide-react';
import PopularArticles from '../components/ui/PopularArticles';
import Loading from '../components/layout/Loading';

// استدعاء الهوكس الحقيقية بتاعتك
import { 
  useArticle, 
  useComments, 
  useAddComment, 
  useAddReply, 
  useTrackView,
  useTrending 
} from '../hooks/useArticles';

// =========================================================================
// 🧩 كومبونانت التعليق الواحد (علشان كل تعليق يكون مستقل بحالة الردود بتاعته)
// =========================================================================
const CommentItem = ({ comment, articleId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  // استدعاء هوك إضافة الرد وتمرير الـ ID بتاع التعليق ده بالتحديد
  const { mutate: submitReply, isPending: isReplyingPending } = useAddReply(articleId, comment._id);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // افترضت إن الباك إند بيستقبل حقل اسمه text أو commentText (عدليها حسب الـ Schema بتاعتك)
    submitReply({ content: replyText }, {
      onSuccess: () => {
        setReplyText("");
        setIsReplying(false); // نقفل مربع الرد بعد النجاح
      }
    });
  };

  return (
    <div className="bg-white border border-gray-100 p-4 rounded-2xl transition-all hover:border-gray-200">
      {/* التعليق الأساسي */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-gray-800">{comment.writer?.name || "مستخدم"}</span>
          <span className="text-[11px] text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <p className="text-gray-600 text-md ">
          {comment.content}
        </p>
        
        {/* زرار الرد */}
        <button 
          onClick={() => setIsReplying(!isReplying)}
          className="text-[11px] font-bold text-gray-400 hover:text-[var(--color-primary)] flex items-center gap-1 transition-colors mt-2"
        >
          <Reply size={12} className="transform scale-x-[-1]" />
          <span>رد</span>
        </button>
      </div>

      {/* مربع كتابة الرد (يظهر فقط عند الضغط على زر رد) */}
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-3 relative">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="اكتب ردك..."
            autoFocus
            className="w-full text-xs rounded-lg border border-gray-200 py-2.5 pr-3 pl-10 focus:border-[var(--color-primary)] outline-none transition-all bg-gray-50"
          />
          <button 
            type="submit" 
            disabled={isReplyingPending}
            className="absolute left-1.5 top-1.5 bottom-1.5 bg-[var(--color-primary)] text-white px-2.5 rounded-md hover:bg-[var(--color-primary)]/90 transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isReplyingPending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} className="transform -rotate-45" />}
          </button>
        </form>
      )}

      {/* عرض الردود السابقة (Nested Replies) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 mr-4 pr-3 border-r-2 border-[var(--color-primary)]/20 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply._id} className="bg-gray-50/80 p-3 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-800">{reply.writer?.name || "مستخدم"}</span>
                <span className="text-[10px] text-gray-400">
                  {new Date(reply.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
              <p className="text-gray-600 text-md leading-relaxed font-light">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// =========================================================================
// 📰 الصفحة الأساسية (Article Detail)
// =========================================================================
export default function ArticleDetail() {
  const { id } = useParams();

  // === 1. تفعيل الهوكس الخاصة بالباك إند ===
  useTrackView(id); // الهوك العبقري بتاعك هيسجل المشاهدة بعد 10 ثواني في صمت
  
  const { data: article, isLoading: loadArticle } = useArticle(id);
  const { data: commentsData, isLoading: loadComments } = useComments(id);
  const { data: popularArticlesData } = useTrending(5); // جلب الأكثر قراءة للسايدبار

  console.log("Article Data:", article); // لوج للتأكد من جلب بيانات الخبر
  console.log("Comments Data:", commentsData); // لوج للتأكد من جلب تعليقات الخبر

  const { mutate: submitComment, isPending: isCommenting } = useAddComment(id);

  // === 2. حالات التحكم في الصفحة ===
  const [activeMedia, setActiveMedia] = useState(null);
  const [newComment, setNewComment] = useState("");

  // لضبط الميديا الافتراضية أول ما الخبر يجي من الباك إند
  useEffect(() => {
    if (article?.images?.length > 0) {
      setActiveMedia({ type: 'image', url: article.images[0] });
    } else if (article?.image) {
      setActiveMedia({ type: 'image', url: article.image });
    }
  }, [article]);

  // === 3. إضافة تعليق جديد رئيسي ===
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    submitComment({ text: newComment }, {
      onSuccess: () => setNewComment("")
    });
  };

  if (loadArticle) return <Loading />;
  if (!article) return <div className="text-center py-20 text-xl font-bold">عذراً، هذا الخبر غير موجود.</div>;

  // معالجة التاريخ
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

              {/* الميتا داتا */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 border-y border-gray-100 py-3">
                <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                  <User size={16} className="text-[var(--color-secondary)]" />
                  {article.writer?.name || article.author || "المحرر"}
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
                    <video 
                      src={activeMedia.url} 
                      controls autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* شريط الصور المصغرة */}
                {((article.images?.length > 1) || (article.videos?.length > 0)) && (
                  <div className="flex flex-wrap gap-3 overflow-x-auto py-1 custom-scrollbar">
                    {article.images?.map((imgUrl, idx) => (
                      <button
                        key={`img-${idx}`}
                        onClick={() => setActiveMedia({ type: 'image', url: imgUrl })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                          activeMedia?.url === imgUrl ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. متن الخبر */}
            <div 
              style={{ fontFamily: "'Cairo', sans-serif" }}
              className="text-lg text-gray-800 leading-relaxed font-normal whitespace-pre-line space-y-4"
            >
              {article.content}
            </div>

            <hr className="border-gray-100 my-8" />

            {/* 4. قسم التعليقات والردود الديناميكي */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold flex items-center gap-2 text-gray-900">
                <MessageSquare size={22} className="text-[var(--color-primary)]" />
                <span>التعليقات ({commentsList.length})</span>
              </h3>

              {/* فورم إضافة تعليق رئيسي */}
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
                    {isCommenting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="transform -rotate-45" />}
                  </button>
                </div>
              </form>

              {/* قائمة التعليقات بالردود بتاعتها */}
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