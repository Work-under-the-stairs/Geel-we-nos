// src/components/sections/TrendingRibbon.jsx
import { Link } from 'react-router-dom'

export default function TrendingRibbon({ trendingArticles = [] }) {
  if (trendingArticles.length === 0) return null

  return (
    <div className="w-full bg-slate-50 border-y border-gray-200 py-4 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center gap-6 overflow-x-auto scrollbar-none touch-pan-x">
        
        {/* ======= Badge Label ======= */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-secondary text-white text-[12px] font-black px-3 py-1 rounded-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          الأكثر قراءة
        </div>

        {/* ======= Trending Items Loop ======= */}
        <div className="flex items-center gap-8 min-w-max">
          {trendingArticles.slice(0, 5).map((art, idx) => (
            <Link
              key={art._id}
              to={`/article/${art._id}`}
              className="flex items-center gap-3 group cursor-pointer"
            >
              {/* Massive Trend Number */}
              <span className="text-2xl sm:text-3xl font-black text-secondary/30 group-hover:text-secondary transition-colors duration-300">
                0{idx + 1}
              </span>
              
              {/* Trend Title */}
              <p className="text-primary font-bold text-[14px] sm:text-[15px] group-hover:text-secondary max-w-sm transition-colors duration-200 line-clamp-1">
                {art.title}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}