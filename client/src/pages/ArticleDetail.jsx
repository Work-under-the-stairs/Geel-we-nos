import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Clock, MessageSquare, SendHorizonal, Play, FolderOpen, Reply, Loader2 } from 'lucide-react';
import PopularArticles from '../components/ui/PopularArticles';
import Loading from '../components/layout/Loading';
import { toast } from 'react-hot-toast';
import { isAuthenticated, getUsername, isAdmin } from "../utils/auth";
import CommentItem from '../components/ui/Article/CommentItem';
import StoryModal from '../components/StoryModal'; 
import { stories } from "../data/stories";
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
  useTrackView(id); // الهوك العبقري هيسجل المشاهدة بعد 10 ثواني في صمت
  
  const { data: article, isLoading: loadArticle } = useArticle(id);
  const { data: commentsData, isLoading: loadComments } = useComments(id);
  const { data: popularArticlesData } = useTrending(5); // جلب الأكثر قراءة للسايدبار

  const { mutate: submitComment, isPending: isCommenting } = useAddComment(id);

  // === 2. حالات التحكم في الصفحة ===
  const [activeMedia, setActiveMedia] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  // لضبط الميديا الافتراضية أول ما الخبر يجي من الباك إند
  useEffect(() => {
    if (article?.images?.length > 0) {
      setActiveMedia({ type: 'image', url: article.images[0] });
    } else if (article?.image) {
      setActiveMedia({ type: 'image', url: article.image });
    } else if (article?.videos?.length > 0) {
      setActiveMedia({ type: 'video', url: article.videos[0] });
    } else if (article?.youtube_videos?.length > 0) {
      setActiveMedia({ type: 'youtube', id: article.youtube_videos[0] });
    }
  }, [article]);

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

  // معالجة التاريخ
  const articleDate = new Date(article.createdAt || Date.now());
  const formattedDate = articleDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = articleDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  
  const commentsList = commentsData || [];

  // حساب إجمالي عناصر الميديا المتوفرة لعمل شريط التنقل
  const totalMediaCount = (article.images?.length || 0) + (article.videos?.length || 0) + (article.youtube_videos?.length || 0);

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
            </div>

            {/* 2. معرض الميديا ذو المظهر الأنيق */}
            {activeMedia && (
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-950 shadow-md">
                  {activeMedia.type === 'image' ? (
                    <img 
                      src={activeMedia.url} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  ) : activeMedia.type === 'video' ? (
                    <video 
                      src={activeMedia.url} 
                      controls autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    /* مشغل يوتيوب الأنيق مع إعدادات التشغيل الفوري النظيف وحظر المقترحات الخارجية واللوجو الخاص بها */
                    <iframe
                      src={`https://www.youtube.com/embed/${activeMedia.id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&controls=1`}
                      title={article.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* شريط الصور والفيديوهات المصغرة المجمع الذكي */}
                {totalMediaCount > 1 && (
                  <div className="flex flex-wrap gap-3 overflow-x-auto py-1 custom-scrollbar">
                    
                    {/* أ. عرض الصور أولاً */}
                    {article.images?.map((imgUrl, idx) => (
                      <button
                        key={`img-${idx}`}
                        onClick={() => setActiveMedia({ type: 'image', url: imgUrl })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                          activeMedia?.type === 'image' && activeMedia?.url === imgUrl ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}

                    {/* ب. عرض فيديوهات ImageKit تالياً */}
                    {article.videos?.map((vidUrl, idx) => (
                      <button
                        key={`vid-${idx}`}
                        onClick={() => setActiveMedia({ type: 'video', url: vidUrl })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-slate-900 border-2 transition-all shrink-0 flex items-center justify-center ${
                          activeMedia?.type === 'video' && activeMedia?.url === vidUrl ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play size={18} className="text-white fill-white" />
                        </div>
                        <span className="text-[10px] text-white/80 absolute bottom-1 text-center font-bold">فيديو</span>
                      </button>
                    ))}

                    {/* ج. عرض فيديوهات يوتيوب في نهاية الشريط مع الصور المصغرة المباشرة لها من يوتيوب */}
                    {article.youtube_videos?.map((videoId, idx) => (
                      <button
                        key={`yt-${idx}`}
                        onClick={() => setActiveMedia({ type: 'youtube', id: videoId })}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                          activeMedia?.type === 'youtube' && activeMedia?.id === videoId ? 'border-[var(--color-secondary)] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                          alt="youtube thumbnail" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center group-hover:bg-black/40">
                          <Play size={18} className="text-white fill-red-600 stroke-red-600" />
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

            {/* --- بداية كود الربط التفاعلي --- */}
{article.crossMediaId && (
  <div className="my-10 p-8 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl text-white shadow-xl flex flex-col items-center text-center transform transition hover:scale-[1.01]">
    <h3 className="text-2xl font-black mb-3">هل تريد معرفة المزيد؟</h3>
    <p className="text-red-100 mb-6 font-medium opacity-90">هذا الخبر مرتبط بقصة تفاعلية بصرية، اضغط هنا للمشاهدة.</p>
    <button 
      onClick={() => {
        const story = stories.find(s => s.id == article.crossMediaId);
        setSelectedStory(story);
      }}
      className="bg-white text-red-600 px-10 py-4 rounded-full font-black text-lg hover:bg-slate-50 transition-all shadow-md"
    >
      اضغط هنا لمعرفة المزيد
    </button>
  </div>
)}
{/* --- نهاية كود الربط التفاعلي --- */}

{/* إضافة المودال في نهاية الملف */}
<StoryModal 
  isOpen={!!selectedStory} 
  onClose={() => setSelectedStory(null)} 
  story={selectedStory} 
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
                    {isCommenting ? <Loader2 size={16} className="animate-spin" /> : <SendHorizonal size={16} className=" cursor-pointer" />}
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