// src/components/ui/Category/NewsGridList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateFormatter';

export default function NewsGridList({ extraArticles = [] }) {
  if (extraArticles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" dir="rtl">
      {extraArticles.map((art) => (
        <Link 
          key={art._id}
          to={`/news/${art._id}`}
          className="group flex flex-col bg-gray-900/10 hover:bg-gray-900/20 rounded-2xl overflow-hidden border border-white/5 p-3 transition-all duration-300 cursor-pointer"
        >
          {/* الصورة */}
          <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-800 mb-3">
            <img
              src={art.images?.[0] || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='9' cy='9' r='2'%3E%3C/circle%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'%3E%3C/path%3E%3C/svg%3E"}
              alt={art.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                e.target.classList.remove('object-cover');
                e.target.classList.add('object-contain', 'p-4');
              }}
            />
          </div>

          {/* نصوص الكارت */}
          <div className="flex flex-col gap-2 flex-1 justify-between p-1">
            <h4 className="text-primary font-bold text-sm sm:text-base leading-snug group-hover:text-[var(--color-secondary)] transition-colors line-clamp-2">
              {art.title}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-50 mt-2">
              <span>{art.writer?.name || "جيل ونص"}</span>
              <span>{formatDate(art.createdAt || art.date)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}