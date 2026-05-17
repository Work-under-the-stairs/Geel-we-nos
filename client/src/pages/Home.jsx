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
import TrendingRibbon from '../components/ui/TrendingRibbon'
import MultimediaHub from '../components/ui/MultimediaHub'
import InspirationalGrid from '../components/ui/InspirationalGrid'
import Footer from '../components/layout/Footer'
import CategoriesGrid from '../components/ui/CategoriesGrid'

export default function Home() {
  return (
    <main>
      
      {/* <div className="max-w-7xl mx-auto px-6 md:px-10 py-8"></div> */}
      {/* Featured / Cross Media */}
      {/* <FeaturedStories stories={FEATURED_NEWS} /> */}

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <HeroSection articles={FEATURED_NEWS} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <TrendingRibbon trendingArticles={FEATURED_NEWS} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <CategoriesGrid articles={FEATURED_NEWS} />
      </div>

      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 ">
          <MultimediaHub multimediaArticles={FEATURED_NEWS} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 ">
        <InspirationalGrid articles={FEATURED_NEWS}/>
      </div>

      <Footer />


    </main>
  )
}