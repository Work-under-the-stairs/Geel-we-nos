// src/components/ui/Category/ArticleGridCard.jsx
import React from 'react';
import { User } from 'lucide-react';

export default function ArticleGridCard({ article }) {
  if (!article) return null;

  return (
    <a 
      href={`/news/${article._id}`} 
      className="group flex flex-col space-y-3 bg-white rounded-xl overflow-hidden border border-gray-100 p-2 hover:shadow-md transition-all duration-300 select-none"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
        <img 
          src={article.images?.[0] || "/default-news.png"} 
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
          onError={(e) => { e.target.src = "/default-news.png"; }}
        />
      </div>
      <div className="flex flex-col flex-1 p-2 text-right">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 font-light flex-1">
          {article.summary || article.content}
        </p>
        
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-gray-50 pt-3">
          <span className="flex items-center gap-1 text-gray-600 font-bold">
            <User size={11} className="text-gray-400" />
            {article.writer?.name || 'المحرر'}
          </span>
          <span>{new Date(article.createdAt || article.date).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </a>
  );
}