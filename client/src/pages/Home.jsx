import {FEATURED_NEWS} from '../data/dummyData'
import HeroSection from '../components/ui/Home/HeroSection'
import TrendingRibbon from '../components/ui/Home/TrendingRibbon'
import MultimediaHub from '../components/ui/Home/MultimediaHub'
import InspirationalGrid from '../components/ui/Home/InspirationalGrid'
import CategoriesGrid from '../components/ui/Home/CategoriesGrid'
import BreakingNewsBar from '../components/ui/BreakingNewsBar'
import Loading from '../components/layout/Loading'
import { useFeatured, useGroupedByCategory, useLatest, useTrending } from '../hooks/useArticles'

export default function Home() {
  const { data: featuredData, isLoading: loadFeatured } = useFeatured(3);
  const { data: trendingData, isLoading: loadTrending } = useTrending(5);
  const { data: latestData, isLoading: loadLatest } = useLatest(8);
  const { data: groupedData, isLoading: loadGrouped } = useGroupedByCategory(4);

  // ✅ التعديل هنا: الداتا جاية متقشرة وجاهزة من الهوك، فبناخدها علطول مع حماية بسيطة
  const featured = featuredData || [];
  const trending = trendingData || [];
  const latest = latestData || [];
  const groupedCategories = groupedData || {};

  // console.log("Featured:", featured);
  // console.log("Trending:", trending);
  // console.log("Latest:", latest);
  // console.log("Grouped by Category:", groupedCategories);

  if (loadFeatured || loadTrending || loadLatest || loadGrouped) {
    return <Loading />;
  }

  return (
    <main>
      
      <BreakingNewsBar breakingArticles={featured} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <HeroSection articles={featured} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <TrendingRibbon trendingArticles={trending} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <CategoriesGrid articles={groupedCategories} />
      </div>

      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 ">
          {/* تأمين إضافي بعلامة الاستفهام عشان لو القسم لسه فاضي في الداتا بيز ميعملش كراش */}
          <MultimediaHub multimediaArticles={groupedCategories?.["بودكاست"] || []} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 ">
        <InspirationalGrid articles={groupedCategories?.["ألهمني"] || []} />
      </div>

    </main>
  )
}