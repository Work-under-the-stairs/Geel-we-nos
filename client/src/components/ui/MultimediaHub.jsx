// src/components/sections/MultimediaHub.jsx
import { Link } from 'react-router-dom'
import { Mic, Play } from 'lucide-react'

export default function MultimediaHub({ multimediaArticles = [] }) {
  const podcastArticles = multimediaArticles.filter(a => a.category === 'بودكاست')

  return (
    <section className="w-full bg-primary text-white py-10 md:py-12 my-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* ======= Section Header ======= */}
        <div className="flex items-center gap-3 mb-10 border-r-4 border-secondary pr-3">
          <Mic className="text-secondary" size={24} />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            بودكاست ووسائط جيل ونص
          </h2>
        </div>

        {/* ======= Content Grid ======= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {podcastArticles.slice(0, 3).map((art) => (
            <Link
              key={art._id}
              to={`/article/${art._id}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail Container with Play Overlay */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-white/5 mb-4">
                <img
                  src={art.images?.[0]}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                {/* Glowing Audio/Video Play Button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:bg-secondary/90 transition-all duration-300">
                    <Play size={20} fill="currentColor" className="mr-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-2 flex-1 justify-center">
                <span className="text-secondary text-[11px] font-black tracking-widest uppercase">
                  استمع الآن ✦
                </span>
                <h3 className="font-extrabold text-[15px] sm:text-[16px] leading-snug line-clamp-2 text-white group-hover:text-secondary transition-colors">
                  {art.title}
                </h3>
                <span className="text-white/50 text-xs font-medium">{art.writer}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}