import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, FolderOpen } from 'lucide-react';
import { FALLBACK_IMAGE } from '../../constants/Fall_Back_Image';

export default function ArticleCard({ article }) {
  if (!article) return null;

  const imageObj = article.images?.[0];
  const imageUrl = typeof imageObj === 'object' ? imageObj?.url : imageObj;
  const thumbnail = imageUrl || FALLBACK_IMAGE;

  const articleDate = new Date(article.createdAt || Date.now());
  const formattedDate = articleDate.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/news/${article._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
        />
        {article.isUrgent && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md">
            عاجل
          </span>
        )}
        {article.category?.name && (
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[var(--color-primary)] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <FolderOpen size={10} />
            {article.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3" dir="rtl">
        <h2 className="text-sm sm:text-base font-black text-slate-800 leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
          {article.title}
        </h2>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mt-auto">
          <span className="flex items-center gap-1">
            <User size={12} />
            {article.writer?.name || 'جيل ونص'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
          {article.views > 0 && (
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {article.views.toLocaleString('ar-EG')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
