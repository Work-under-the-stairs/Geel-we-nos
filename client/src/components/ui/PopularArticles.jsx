// src/components/ui/PopularArticles.jsx
import React, { useState } from 'react';
import { FALLBACK_IMAGE } from '../../constants/Fall_Back_Image.js';

export default function PopularArticles({ articles }) {
  const [hoveredArticleId, setHoveredArticleId] = useState(null);

  const popularList = Array.isArray(articles) 
    ? articles 
    : (articles?.data || articles?.docs || []);

  if (popularList.length === 0) return null;


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

          if (isFirst) {
            return (
              <a href={`/news/${articleId}`} key={articleId} className="group block space-y-3 border-b border-gray-200/60 pb-5">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={artImgUrl || [FALLBACK_IMAGE]} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = FALLBACK_IMAGE; 
                      e.target.style.objectFit = "contain";
                      e.target.style.padding = "25%";
                      e.target.style.backgroundColor = "#f1f5f9";
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

              <div 
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isHovered ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden rounded-xl aspect-[16/9] w-full bg-gray-100 shadow-inner">
                  <img 
                    src={artImgUrl || FALLBACK_IMAGE} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                      
                      e.target.style.objectFit = "contain";
                      e.target.style.padding = "25%";
                      e.target.style.backgroundColor = "rgba(241, 245, 249, 1)";
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