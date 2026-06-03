// src/components/ui/Category/ArticleGridCard.jsx
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/dateFormatter'
import { FALLBACK_IMAGE } from '../../../constants/Fall_Back_Image';
export default function ArticleGridCard({ article }) {
  if (!article) return null;

  const artImg = article.images?.[0] || FALLBACK_IMAGE;
  const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

  return (
    <Link 
      to={`/news/${article._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      {/* Image Wrapper */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 relative">
        <img
          src={artImgUrl || FALLBACK_IMAGE}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          onError={(e) => { 
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE; 
          }}
        />
      </div>

      {/* Card Info Content */}
      <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
        <div className="space-y-1.5">
          <span className="text-secondary font-black text-[10px] uppercase tracking-wider block">
            {article.category?.name || "مقالة"}
          </span>
          <h4 className="text-primary font-extrabold text-[15px] leading-snug line-clamp-2 group-hover:text-secondary transition-colors duration-200">
            {article.title}
          </h4>
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1 text-slate-400 text-[11px] font-medium">
          <span>بقلم: {article.writer?.name || "جيل ونص"}</span>
          <span>{formatDate(article.createdAt || article.date)}</span>
        </div>
      </div>
    </Link>
  )
}