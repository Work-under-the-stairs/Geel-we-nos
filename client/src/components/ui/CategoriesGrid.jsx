// src/components/sections/CategoriesGrid.jsx
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dateFormatter'

export default function CategoriesGrid({ articles = [] }) {
  // Grouping articles by target categories for layout demonstration
  const techArticles = articles.filter(a => a.category === 'تكنولوجيا ومهارات')
  const economyArticles = articles.filter(a => a.category === 'اقتصاد')
  const healthArticles = articles.filter(a => a.category === 'صحة')

  const sectionsData = [
    { title: 'تكنولوجيا ومهارات', color: 'border-secondary', data: techArticles },
    { title: 'اقتصاد والمال', color: 'border-primary', data: economyArticles },
    { title: 'صحة وحياة', color: 'border-emerald-500', data: healthArticles },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {sectionsData.map((sec, idx) => {
          const mainPost = sec.data[0]
          const subPosts = sec.data.slice(1, 3)

          return (
            <div key={idx} className="flex flex-col gap-5">
              {/* Column Category Header */}
              <div className={`border-r-4 ${sec.color} pr-3`}>
                <h3 className="text-lg font-black text-primary uppercase tracking-wide">
                  {sec.title}
                </h3>
              </div>

              {/* Main Column Article Card */}
              {mainPost && (
                <Link to={`/news/${mainPost._id}`} className="group block flex-shrink-0 cursor-pointer">
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 shadow-sm mb-3">
                    <img
                      src={mainPost.images?.[0]}
                      alt={mainPost.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-primary font-extrabold text-[16px] leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                    {mainPost.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium mt-1.5">{formatDate(mainPost.date)}</p>
                </Link>
              )}

              {/* Sub Articles List (Titles Only Link) */}
              <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                {subPosts.map(sub => (
                  <Link key={sub._id} to={`/news/${sub._id}`} className="group block cursor-pointer">
                    <h5 className="text-primary font-bold text-[14px] leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                      ✦ {sub.title}
                    </h5>
                    <span className="text-slate-400 text-[11px] font-medium block mt-1">{formatDate(sub.date)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

      </div>
    </section>
  )
}