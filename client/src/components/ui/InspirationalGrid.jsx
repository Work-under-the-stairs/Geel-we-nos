// src/components/sections/InspirationalGrid.jsx
import { Link } from 'react-router-dom'

export default function InspirationalGrid({ articles = [] }) {
  const inspireArticles = articles.filter(a => a.category === 'ألهمني').slice(0, 2)

  if (inspireArticles.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto  py-10">
      
      {/* ======= Section Header ======= */}
      <div className="mb-8 border-r-4 border-secondary pr-3">
        <h2 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">
          قصص نجاح وأفكار تُلهِمك
        </h2>
      </div>

      {/* ======= Cinema Aspect Grid ======= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {inspireArticles.map((art) => (
          <Link
            key={art._id}
            to={`/news/${art._id}`}
            className="relative block aspect-[16/9.5] w-full rounded-3xl overflow-hidden group shadow-sm cursor-pointer"
          >
            {/* Smooth Zoom Image Background */}
            <img
              src={art.images?.[0]}
              alt={art.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            
            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Content Floating on Top of Image */}
            <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 flex flex-col items-start gap-2">
              <span className="bg-white text-primary text-[10px] font-black px-3 py-1 rounded-md tracking-wider uppercase">
                {art.category}
              </span>
              
              <h3 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl leading-snug max-w-xl group-hover:text-secondary transition-colors duration-200 drop-shadow-sm">
                {art.title}
              </h3>
              
              <span className="text-white/60 text-xs font-medium mt-1">
                بقلم {art.writer}
              </span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}