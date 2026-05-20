// src/components/ui/Category/ArticleGridCard.jsx
import React from 'react';
import { User } from 'lucide-react';
import { stripHtml } from '../../../utils/textUtils';

export default function ArticleGridCard({ article }) {
  if (!article) return null;

  return (
    <a 
      href={`/news/${article._id}`} 
      className="group flex flex-col space-y-3 bg-white rounded-xl overflow-hidden border border-gray-100 p-2 hover:shadow-md transition-all duration-300 select-none"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
        <img 
          src={article.images?.[0] || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E"} 
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
          onError={(e) => {
            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
            e.target.classList.remove('object-cover');
            e.target.classList.add('object-contain', 'p-4');
          }}
        />
      </div>
      <div className="flex flex-col flex-1 p-2 text-right">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2 font-light flex-1">
          {stripHtml(article.content)}
        </p>
        
        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-gray-50 pt-3">
          <span className="flex items-center gap-1 text-gray-600 font-bold">
            <User size={11} className="text-gray-400" />
            {article.writer?.name || 'جيل ونص'}
          </span>
          <span>{new Date(article.createdAt || article.date).toLocaleDateString('ar-EG')}</span>
        </div>
      </div>
    </a>
  );
}