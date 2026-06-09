// src/components/sections/CategoriesGrid.jsx
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/dateFormatter'
import { FALLBACK_IMAGE } from '../../../constants/Fall_Back_Image';
export default function CategoriesGrid({ articles = {} }) {
  
  const techArticles    = articles['تكنولوجيا ومهارات']?.articles || [];
  const economyArticles = articles['تعليم وثقافة']?.articles || [];
  const healthArticles  = articles['صحة وحياة']?.articles || [];

  const sectionsData = [
    { title: 'تكنولوجيا ومهارات', color: 'border-secondary', data: techArticles },
    { title: 'تعليم وثقافة', color: 'border-primary', data: economyArticles },
    { title: 'صحة وحياة', color: 'border-emerald-500', data: healthArticles },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {sectionsData.map((sec, idx) => {
          const mainPost = sec.data[0]
          const subPosts = sec.data.slice(1, 3)

          const mainPostImg = mainPost?.images?.[0] || FALLBACK_IMAGE;
          const mainPostImgUrl = typeof mainPostImg === 'object' ? mainPostImg?.url : mainPostImg;

          return (
            <div key={idx} className="flex flex-col gap-5">
              {/* Column Category Header */}
              <div className={`border-r-4 ${sec.color} pr-3`}>
                <h3 className="text-lg font-black text-primary uppercase tracking-wide">
                  {sec.title}
                </h3>
              </div>

              {/* Main Column Article Card */}
              {mainPost ? (
                <Link to={`/news/${mainPost._id}`} className="group block flex-shrink-0 cursor-pointer">
                  <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 shadow-sm mb-3">
                    <img
                      src={mainPostImgUrl || FALLBACK_IMAGE}
                      alt={mainPost.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      onError={(e) => { 
                        e.target.src = FALLBACK_IMAGE; 
                        e.target.onerror = null;
                      }} 
                    />
                  </div>
                  <h4 className="text-primary font-extrabold text-[16px] leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                    {mainPost.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium mt-1.5">
                    {formatDate(mainPost.createdAt || mainPost.date)}
                  </p>
                </Link>
              ) : (
                <p className="text-xs text-slate-400 font-light py-4 text-center bg-slate-50/50 rounded-xl border border-dashed">
                  لا توجد أخبار رئيسية في هذا القسم حالياً.
                </p>
              )}

              {/* Sub Articles List (Titles Only Link) */}
              <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                {subPosts.map(sub => (
                  <Link key={sub._id} to={`/news/${sub._id}`} className="group block cursor-pointer">
                    <h5 className="text-primary font-bold text-[14px] leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                      ✦ {sub.title}
                    </h5>
                    <span className="text-slate-400 text-[11px] font-medium block mt-1">
                      {formatDate(sub.createdAt || sub.date)}
                    </span>
                  </Link>
                ))}

                {sec.data.length <= 1 && (
                  <p className="text-[11px] text-slate-400 font-light text-center py-2">
                    لا توجد مقالات فرعية أخرى.
                  </p>
                )}
              </div>
            </div>
          )
        })}

      </div>
    </section>
  )
}