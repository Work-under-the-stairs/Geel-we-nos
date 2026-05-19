// src/components/sections/BreakingNewsBar.jsx
import { Link } from 'react-router-dom'
import { Flame } from 'lucide-react'

export default function BreakingNewsBar({ breakingArticles = [] }) {
  if (breakingArticles.length === 0) return null

  const latestArticles = breakingArticles.slice(0, 5)

  return (
    <div className="w-full bg-gradient-to-r from-orange1 via-orange3 to-orange5 text-white shadow-md relative overflow-hidden select-none py-3" dir="rtl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center relative">
        
        {/* ======= شارة عاجل الثابتة البروز والتأثير ======= */}
        <div className="flex items-center gap-1.5 flex-shrink-0 bg-white text-orange4 text-[13px] font-black px-4 py-1.5 rounded-lg shadow-lg z-10 border border-orange-100">
          <Flame size={16} className="fill-orange-600 text-orange3 animate-pulse" />
          <span>عاجل</span>
          <span className="relative flex h-2 w-2 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange1 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange3"></span>
          </span>
        </div>

        {/* ======= شريط الأخبار المتحرك ======= */}
        <div className="flex flex-1 overflow-hidden relative mr-4 md:mr-6 group">
          
          {/* الحاوية اللانهائية - تقف عند الـ Hover */}
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] cursor-pointer">
            
            {/* التكرار الأول */}
            {latestArticles.map((art) => (
              <Link
                key={`first-${art._id}`}
                to={`/news/${art._id}`}
                className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              >
                <span className="text-yellow-400 font-extrabold text-[15px]">✦</span>
                <p className="text-[14px] sm:text-[15px] font-bold tracking-wide">
                  {art.title}
                </p>
              </Link>
            ))}

            {/* التكرار الثاني للحفاظ على سلاسة الحركة المتصلة */}
            {latestArticles.map((art) => (
              <Link
                key={`second-${art._id}`}
                to={`/news/${art._id}`}
                className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200"
              >
                <span className="text-yellow-400 font-extrabold text-[15px]">✦</span>
                <p className="text-[14px] sm:text-[15px] font-bold tracking-wide">
                  {art.title}
                </p>
              </Link>
            ))}

          </div>

          {/* تأثير حواف ناعمة متلاشية */}
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-orange4 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-orange2 to-transparent pointer-events-none" />

        </div>

      </div>
    </div>
  )
}