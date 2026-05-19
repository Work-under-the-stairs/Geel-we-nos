// src/components/ui/Category/CategoryHeroCard.jsx
import React from 'react';
import { User } from 'lucide-react';

export default function CategoryHeroCard({ article }) {
  if (!article) return null;

  return (
    <a 
      href={`/news/${article._id}`} 
      className="group relative block overflow-hidden rounded-2xl bg-gray-950 aspect-[4/3] sm:aspect-[16/9] shadow-md select-none"
    >
      <img 
        src={article.images?.[0] || "/default-news.png"} 
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.target.src = "/default-news.png"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="absolute bottom-0 p-4 sm:p-8 w-full text-right">
        <span className="text-[10px] sm:text-xs font-bold bg-[var(--color-secondary)] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md mb-2 sm:mb-3 inline-block shadow-sm">
          أهم الأخبار
        </span>
        
        <h3 className="text-lg sm:text-3xl font-bold text-white mb-1.5 sm:mb-3 leading-tight group-hover:underline decoration-white/50 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-200 text-xs sm:text-base line-clamp-1 sm:line-clamp-2 max-w-2xl font-light">
          {article.summary || article.content}
        </p>
        
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-300 font-medium">
          <span className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-white">
            <User size={10} className="sm:w-3 sm:h-3" />
            {article.writer?.name || 'المحرر'}
          </span>
          <span>•</span>
          <span>{new Date(article.createdAt || article.date).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </a>
  );
}