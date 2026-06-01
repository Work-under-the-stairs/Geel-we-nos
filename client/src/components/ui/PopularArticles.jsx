// src/components/ui/PopularArticles.jsx
import React, { useState } from 'react';
import { FALLBACK_IMAGE } from '../../constants/Fall_Back_Image';

export default function PopularArticles({ articles }) {
  // نقل حالة التتبع (hover) لداخل المكون ليكون مستقل بذاته
  const [hoveredArticleId, setHoveredArticleId] = useState(null);

  // 🌟 خطوة الأمان السحرية: استخراج مصفوفة الأخبار الصافية مهما كان شكل تغليف الداتا من الباك إند
  const popularList = Array.isArray(articles) 
    ? articles 
    : (articles?.data || articles?.docs || []);

  // لو لسه مفيش داتا أو مصفوفة الأخبار فاضية، الكومبونانت بينسحب بهدوء بدون كراش
  if (popularList.length === 0) return null;

  // تعريف الـ SVG الافتراضي في متغير موحد منعا للتكرار في الكود
  const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E";

  return (
    <div className="sticky top-32 bg-gray-50/60 rounded-2xl p-6 border border-gray-100/80 text-right" dir="rtl">
      <h2 className="text-xl font-extrabold border-r-4 border-[var(--color-secondary)] pr-3 mb-6 text-primary">
        الأكثر قراءة
      </h2>
      
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
        {popularList.map((article, index) => {
          const isFirst = index === 0;
          const articleId = article._id || article.id;
          const isHovered = hoveredArticleId === articleId;

          const artImg = article.images?.[0] || FALLBACK_IMAGE;
          const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

          // 1. الخبر الأول يظهر دائماً بصورته مسبقاً كما هو
          if (isFirst) {
            return (
              <a href={`/news/${articleId}`} key={articleId} className="group block space-y-3 border-b border-gray-200/60 pb-5">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    // ✅ تم التعديل لقراءة الرابط المستخرج
                    src={artImgUrl || fallbackSvg} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null; // منع حدوث حلقة تكرار (Infinite Loop)
                      e.target.src = fallbackSvg; 
                      
                      // تعديل التنسيق لضبط مظهر الأيقونة بدلاً من الصورة المكسورة
                      e.target.style.objectFit = "contain";
                      e.target.style.padding = "25%";
                      e.target.style.backgroundColor = "#f1f5f9"; // لون bg-slate-100
                    }}
                  />
                  <span className="absolute top-2 right-2 bg-[var(--color-primary)] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg shadow-sm">
                    1
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 group-hover:text-secondary group-hover:underline leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                  <span className="font-semibold text-gray-600">
                    {article.writer?.name || 'جيل ونص'}
                  </span>
                  <span>•</span>
                  <span>{article.views || article.viewsCount || 0} مشاهدة</span>
                </div>
              </a>
            );
          }

          // 2. باقي الأخبار: عند الهوفر يفتح كرت الصورة بالداخل بشكل انسيابي ومضمون
          return (
            <div
              key={articleId}
              className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
              onMouseEnter={() => setHoveredArticleId(articleId)}
              onMouseLeave={() => setHoveredArticleId(null)}
            >
              <a 
                href={`/news/${articleId}`} 
                className="group flex items-start gap-4 py-2 relative"
              >
                <span className={`text-2xl font-black transition-colors w-8 text-center select-none ${isHovered ? 'text-[var(--color-secondary)]' : 'text-gray-200'}`}>
                  {index + 1}
                </span>
                <div className="space-y-1 flex-1">
                  <h4 className={`text-sm font-semibold leading-snug line-clamp-2 transition-colors text-right ${isHovered ? 'text-[var(--color-primary)]' : 'text-gray-800'}`}>
                    {article.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="font-medium text-gray-500">
                      {article.writer?.name || 'جيل ونص'}
                    </span>
                    <span>•</span>
                    <span>{article.views || article.viewsCount || 0} مشاهدة</span>
                  </div>
                </div>
              </a>

              {/* الحاوية المتحركة للصورة لتظهر داخل الكرت نفسه بسلاسة */}
              <div 
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isHovered ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden rounded-xl aspect-[16/9] w-full bg-gray-100 shadow-inner">
                  <img 
                    // ✅ تم التعديل لقراءة الرابط المستخرج هنا أيضاً
                    src={artImgUrl || fallbackSvg} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null; // منع تكرار الخطأ
                      e.target.src = fallbackSvg;
                      
                      // تعديل التنسيق لضمان أن الأيقونة تظهر في المنتصف ولا تظهر "ممطوطة"
                      e.target.style.objectFit = "contain";
                      e.target.style.padding = "25%";
                      e.target.style.backgroundColor = "rgba(241, 245, 249, 1)"; // لون bg-slate-100
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}