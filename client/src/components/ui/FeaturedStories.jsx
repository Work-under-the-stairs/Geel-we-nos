import { Link } from 'react-router-dom'

export default function FeaturedStories({ stories }) {
  if (!stories?.length) return null
  const [main, ...rest] = stories

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-[3px]
                    bg-gray-200 mb-8">

      {/* Main Story */}
      <Link
        to={`/article/${main._id}`}
        className="relative overflow-hidden aspect-[16/10] md:row-span-2 group"
      >
        {main.images?.[0]
          ? <img src={main.images[0]} alt={main.title}
                 className="w-full h-full object-cover brightness-75
                            group-hover:scale-105 transition-transform duration-700" />
          : <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-5 md:p-6">
          <span className="inline-block bg-secondary text-white text-[11px]
                           font-bold px-2.5 py-1 rounded-sm mb-3">
            {main.category}
          </span>
          <h2 className="text-white text-xl md:text-2xl font-extrabold
                         leading-snug">{main.title}</h2>
          <p className="text-white/60 text-xs mt-2">
            {main.writer} · {new Date(main.date).toLocaleDateString('ar-EG')}
          </p>
        </div>
      </Link>

      {/* Secondary Stories */}
      {rest.slice(0, 2).map(story => (
        <Link
          key={story._id}
          to={`/article/${story._id}`}
          className="relative overflow-hidden aspect-video group"
        >
          {story.images?.[0]
            ? <img src={story.images[0]} alt={story.title}
                   className="w-full h-full object-cover brightness-70
                              group-hover:scale-105 transition-transform duration-700" />
            : <div className="w-full h-full bg-gradient-to-br from-secondary/80 to-primary/60" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-4">
            <span className="inline-block bg-secondary text-white text-[10px]
                             font-bold px-2 py-0.5 rounded-sm mb-2">
              {story.category}
            </span>
            <h3 className="text-white text-[13px] font-bold leading-snug">
              {story.title}
            </h3>
            <p className="text-white/55 text-[10.5px] mt-1.5">
              {story.writer} · {new Date(story.date).toLocaleDateString('ar-EG')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}