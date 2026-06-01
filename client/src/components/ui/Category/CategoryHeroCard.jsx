import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/dateFormatter'
import { stripHtml } from '../../../utils/textUtils'
import { FALLBACK_IMAGE } from '../../../constants/Fall_Back_Image';
export default function CategoryHeroCard({ article }) {
  if (!article) return null;

  const artImg = article.images?.[0] || FALLBACK_IMAGE;
  const artImgUrl = typeof artImg === 'object' ? artImg?.url : artImg;

  return (
    <Link
      to={`/news/${article._id}`}
      className="relative block w-full rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] cursor-pointer group shadow-sm bg-slate-100"
    >
      <img
        src={artImgUrl || FALLBACK_IMAGE}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
        onError={(e) => { 
          e.target.onerror = null;
          e.target.src = FALLBACK_IMAGE; 
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 right-0 left-0 p-5 md:p-8 flex flex-col items-start gap-2 md:gap-2.5">
        <h3 className="text-white font-black text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug max-w-3xl drop-shadow-sm group-hover:text-secondary transition-colors duration-200 line-clamp-2 md:line-clamp-3">
          {article.title}
        </h3>
        
        <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 font-light max-w-2xl">
          {stripHtml(article.content)}
        </p>

        <div className="flex items-center gap-2 text-white/75 text-[11px] sm:text-[12px] font-medium mt-1">
          <span>{article.writer?.name || "جيل ونص"}</span>
          <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
          <span>{formatDate(article.createdAt || article.date)}</span>
        </div>
      </div>
    </Link>
  )
}