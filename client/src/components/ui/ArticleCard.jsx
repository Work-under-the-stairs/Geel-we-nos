import { Link } from 'react-router-dom'
import { User, Clock } from 'lucide-react'
import { formatDate } from '../../utils/dateFormatter'

// variant: 'vertical' | 'horizontal'
export default function ArticleCard({ article, variant = 'vertical' }) {
  const { _id, title, writer, date, images, category } = article
  const thumb = images?.[0] || null

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/article/${_id}`}
        className="flex gap-3 bg-white border border-gray-100 rounded-xl
                   p-3 hover:shadow-md transition-shadow"
      >
        <div className="w-24 h-[70px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          {thumb
            ? <img src={thumb} alt={title} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-secondary mb-1">{category}</p>
          <h3 className="text-[12.5px] font-bold leading-snug text-gray-800
                         line-clamp-2 mb-1.5">{title}</h3>
          <p className="text-[10.5px] text-gray-400">{writer} · {formatDate(date)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/article/${_id}`}
      className="flex flex-col bg-white border border-gray-100 rounded-xl
                 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="w-full aspect-video bg-gray-100 overflow-hidden">
        {thumb
          ? <img src={thumb} alt={title}
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10" />
        }
      </div>
      <div className="p-3.5">
        <p className="text-[10px] font-bold text-secondary uppercase tracking-wide mb-1.5">
          {category}
        </p>
        <h3 className="text-[13.5px] font-bold leading-snug text-gray-800
                       line-clamp-2 mb-2.5">{title}</h3>
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <User size={11} /> {writer}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {formatDate(date)}
          </span>
        </div>
      </div>
    </Link>
  )
}