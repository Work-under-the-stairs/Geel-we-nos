// src/components/ui/Category/NewsGridList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/dateFormatter';
import { FALLBACK_IMAGE } from '../../../constants/Fall_Back_Image';
export default function NewsGridList({ extraArticles = [] }) {
  if (extraArticles.length === 0) return null;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" dir="rtl">
      {extraArticles.map((art) => {
        const artImg = art.images?.[0] || FALLBACK_IMAGE;
        const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

        return (
          <Link 
            key={art._id}
            to={`/news/${art._id}`}
            className="group flex flex-col bg-gray-900/10 hover:bg-gray-900/20 rounded-2xl overflow-hidden border border-white/5 p-3 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-800 mb-3">
              <img
                src={artImgUrl || FALLBACK_IMAGE}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                  e.target.classList.remove('object-cover');
                  e.target.classList.add('object-contain', 'p-4');
                }}
              />
            </div>

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
        );
      })}
    </div>
  );
}