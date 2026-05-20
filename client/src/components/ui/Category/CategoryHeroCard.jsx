// src/components/ui/Category/CategoryHeroCard.jsx
import React from 'react';
import { User } from 'lucide-react';
import { stripHtml } from '../../../utils/textUtils';

export default function CategoryHeroCard({ article }) {
  if (!article) return null;

  return (
    <a 
      href={`/news/${article._id}`} 
      className="group relative block overflow-hidden rounded-2xl bg-gray-950 aspect-[4/3] sm:aspect-[16/9] shadow-md select-none"
    >
      <img 
        src={article.images?.[0] || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E"} 
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          // 1. استخدام نفس الـ SVG كبديل آمن (Data URI) بدل ملف خارجي
          e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E";
          
          // 2. تعديل التنسيق لضمان ظهور الأيقونة بشكل صحيح (بدل المط)
          e.target.style.objectFit = "contain";
          e.target.style.padding = "25%";
          e.target.style.backgroundColor = "rgba(0,0,0,0.05)";
          
          // 3. إيقاف الـ onError لمنع أي تكرار
          e.target.onerror = null;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="absolute bottom-0 p-4 sm:p-8 w-full text-right">
        <span className="text-[10px] sm:text-xs font-bold bg-[var(--color-secondary)] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md mb-2 sm:mb-3 inline-block shadow-sm">
          أهم الأخبار
        </span>
        
        <h3 className="text-lg sm:text-3xl font-bold text-white mb-1.5 sm:mb-3 leading-tight group-hover:underline decoration-white/50 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 font-light flex-1">
          {stripHtml(article.content)}
        </p>
        
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-300 font-medium">
          <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-white">
            <User size={10} className="sm:w-3 sm:h-3" />
            {article.writer?.name || 'جيل ونص'}
          </span>
          <span>•</span>
          <span>{new Date(article.createdAt || article.date).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </a>
  );
}