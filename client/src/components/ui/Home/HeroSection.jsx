// src/components/sections/HeroSection.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/dateFormatter'
import { stripHtml } from '../../../utils/textUtils';

// ======= SUB-COMPONENT: Sidebar Vertical Sliding Carousel =======
function SidebarCarousel({ sidebarArticles }) {
  // Duplicate array to achieve a seamless, infinite vertical loop
  const doubledArticles = [...sidebarArticles, ...sidebarArticles];
  
  const [translateY, setTranslateY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // ✅ توحيد الحسبة هنا وفي الدالة السفلية لضمان سلاسة الأنميشن (120px height + 16px margin = 136px)
  const cardHeightWithMargin = 136; 

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      // Slide up by exactly one card height
      setTranslateY((prev) => prev - cardHeightWithMargin);
    }, 4000);

    return () => clearInterval(interval);
  }, [cardHeightWithMargin]);

  // Reset positioning silently when reaching the end of the original list
  const handleTransitionEnd = () => {
    const maxScroll = sidebarArticles.length * cardHeightWithMargin;
    
    if (Math.abs(translateY) >= maxScroll) {
      setIsTransitioning(false); // Temporarily disable transition for instant reset
      setTranslateY(0); // Jump back to the start
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      
      {/* ======= Sidebar Title ======= */}
      <div className="flex items-center justify-between px-1 flex-shrink-0">
        <h3 className="text-[15px] font-black text-primary border-r-4 border-secondary pr-2 ">
          أحدث المستجدات
        </h3>
      </div>

      {/* ======= Vertical Sliding Carousel Container ======= */}
      <div className="overflow-hidden relative h-[420px] w-full pt-5">
        <div 
          className={`flex flex-col ${isTransitioning ? 'transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)' : ''}`}
          style={{ transform: `translateY(${translateY}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {doubledArticles.map((art, idx) => {
            // ✅ استخراج آمن لرابط الصورة بالكاروسيل الجانبي
            const artImg = art.images?.[0];
            const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

            return (
              <Link
                key={`${art._id}-${idx}`}
                to={`/news/${art._id}`}
                className="h-[120px] mb-4 flex items-center gap-4 bg-transparent border-b border-slate-100 pb-4 last:border-0 last:mb-0 group cursor-pointer flex-shrink-0"
              >
                {/* Enlarged Image Container */}
                <div className="w-34 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 shadow-sm">
                  <img
                    src={artImgUrl || "/default-news.png"}
                    alt={art.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.onerror = null;
                      e.target.src = "/default-news.png"; 
                    }}
                  />
                </div>

                {/* Enhanced Content area with comfortable line heights */}
                <div className="flex flex-col gap-1 flex-1 min-w-0 py-0.5">
                  <span className="text-secondary font-black text-[11px] uppercase tracking-wider">
                    {art.category?.name || 'عام'}
                  </span>
                  <h4 className="text-primary font-extrabold text-[14px] sm:text-[15px] leading-snug 
                                 line-clamp-2 group-hover:text-secondary transition-colors duration-200">
                    {art.title}
                  </h4>
                  <span className="text-slate-400 text-[12px] font-medium">
                    {formatDate(art.createdAt)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
export default function HeroSection({ articles = [] }) {
  const mainArticle = articles[0]
  const sidebarArticles = articles;

  if (!mainArticle) return null

  const mainImg = mainArticle.images?.[0];
  const mainImgUrl = typeof mainImg === 'object' ? mainImg?.url : mainImg;

  return (
    <section className="max-w-7xl mx-auto py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 flex">
          <Link
            to={`/news/${mainArticle._id}`}
            // 🌟 التعديل هنا: aspect-[4/3] للموبايل بيخلي الكارد أكبر وأوضح
            className="relative block w-full rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] cursor-pointer group shadow-sm bg-slate-100"
          >
            {mainImgUrl ? (
              <img
                src={mainImgUrl}
                alt={mainArticle.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                onError={(e) => { 
                  e.target.onerror = null;
                  e.target.src = "/default-news.png"; 
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-0 right-0 left-0 p-5 md:p-9 flex flex-col items-start gap-2 md:gap-3">
              <span className="bg-secondary text-white text-[11px] sm:text-[12px] font-black px-4 py-1.5 rounded-full tracking-wide shadow-sm">
                {mainArticle.category?.name || 'عام'}
              </span>

              {/* 🌟 التعديل هنا: استخدام line-clamp للتحكم في طول العنوان */}
              <h1 className="text-white font-extrabold leading-snug text-xl sm:text-2xl md:text-[30px] max-w-3xl drop-shadow-md line-clamp-2 md:line-clamp-3">
                {mainArticle.title}
              </h1>
              
              <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2 font-light max-w-2xl">
                {stripHtml(mainArticle.content)}
              </p>
              
              <div className="flex items-center gap-2 text-white/75 text-[11px] sm:text-[13px] font-medium mt-1">
                <span>{mainArticle.writer?.name || "جيل ونص"}</span>
                <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
                <span>{formatDate(mainArticle.createdAt)}</span>
              </div>
            </div>
          </Link>
        </div>

        {sidebarArticles.length > 0 && (
          <div className="w-full lg:sticky lg:top-24">
            <SidebarCarousel sidebarArticles={sidebarArticles} />
          </div>
        )}

      </div>
    </section>
  )
}