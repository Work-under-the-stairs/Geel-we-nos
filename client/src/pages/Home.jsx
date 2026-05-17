import FeaturedStories from '../components/ui/FeaturedStories'
import SectionHeader from '../components/ui/SectionHeader'
import ArticleCard from '../components/ui/ArticleCard'
import {
  FEATURED_NEWS,
  LATEST_NEWS,
  CULTURE_NEWS,
  HEALTH_NEWS,
} from '../data/dummyData'
import HeroSection from '../components/ui/HeroSection'

export default function Home() {
  return (
    <main>
      
      {/* <div className="max-w-7xl mx-auto px-6 md:px-10 py-8"></div> */}
      {/* Featured / Cross Media */}
      {/* <FeaturedStories stories={FEATURED_NEWS} /> */}

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <HeroSection articles={FEATURED_NEWS} />

        {/* Latest News */}
        <SectionHeader title="آخر الأخبار" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ">
          {LATEST_NEWS.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        {/* Culture Section — big card + side list */}
        <SectionHeader title="تعليم وثقافة" categorySlug="تعليم وثقافة" />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-10">
          <ArticleCard article={CULTURE_NEWS[0]} />
          <div className="flex flex-col gap-3">
            {CULTURE_NEWS.slice(1).map(article => (
              <ArticleCard key={article._id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Health Section */}
        <SectionHeader title="صحة وعافية" categorySlug="صحة" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {HEALTH_NEWS.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

      </div>
    </main>
  )
}