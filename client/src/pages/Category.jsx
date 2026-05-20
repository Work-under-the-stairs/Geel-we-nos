import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import BreakingNewsBar from '../components/ui/BreakingNewsBar';
import PopularArticles from '../components/ui/PopularArticles';
import CategoryHeroCard from '../components/ui/Category/CategoryHeroCard';
import ArticleGridCard from '../components/ui/Category/ArticleGridCard';
import {
  useCategoryFeatured,
  useCategoryTrending,
  useCategoryNewsInfinite,
} from '../hooks/useArticles';
import { useCategories } from '../hooks/useAdmin';
import { useEffect } from 'react';

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();
  const catName = category ? decodeURIComponent(category) : '';

  // 1. جلب الأقسام من الداتابيز
  const { data: allCategories, isLoading: isCatLoading } = useCategories();
  const categoriesList = allCategories?.data || (Array.isArray(allCategories) ? allCategories : []);
  
  // 2. تحديد القسم الحالي (سيكون null في حالة التحميل أو عدم العثور عليه)
  const currentCategory = !isCatLoading 
    ? categoriesList.find(c => c.name === catName || c._id === catName) 
    : null;

  // 3. التحقق من وجود القسم والتحويل للهوم في حال عدم وجوده
  useEffect(() => {
    if (!isCatLoading && !currentCategory) {
      navigate('/', { replace: true });
    }
  }, [currentCategory, isCatLoading, navigate]);

  // 4. الـ Hooks للبيانات (يتم تفعيلها فقط عند التأكد من وجود القسم)
  const canFetch = !!currentCategory;

  const { data: heroArticle, isLoading: loadHero } = useCategoryFeatured(
    canFetch ? currentCategory.name : null
  );
  
  const { data: popularArticles, isLoading: loadTrending } = useCategoryTrending(
    canFetch ? currentCategory.name : null
  );
  
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadNews,
  } = useCategoryNewsInfinite(canFetch ? currentCategory.name : null);

  // 5. استخراج الداتا
  const allArticles = infiniteData?.pages?.flatMap(page => page.data) ?? [];
  const gridArticles = allArticles.filter(art => art._id !== heroArticle?._id);

  // 6. عرض الـ Loader أثناء التحميل أو قبل التحقق من وجود القسم
  if (isCatLoading || !currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[var(--color-primary)]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-main-bg)]" dir="rtl">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/3 to-transparent border-b border-gray-100 py-10">
        <div className="absolute left-35 bottom-[0px] text-primary/5 rotate-12 pointer-events-none select-none hidden md:block">
          <DynamicIcon name={currentCategory.icon_name} className="w-40 h-40 stroke-[1.5]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-secondary text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
              <DynamicIcon name={currentCategory.icon_name} className="w-3.5 h-3.5" />
              <span>قسم {currentCategory.name}</span>
            </div>

            <h1 className="text-4xl font-black text-primary tracking-tight">
              {currentCategory.name}
            </h1>
            
            {currentCategory.description && (
              <p className="text-gray-500 max-w-2xl text-base sm:text-lg leading-relaxed font-light">
                {currentCategory.description}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Breaking News Bar */}
      <BreakingNewsBar
        breakingArticles={
          gridArticles.length > 0 ? gridArticles.slice(0, 3)
          : heroArticle ? [heroArticle]
          : []
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-xl font-extrabold border-r-4 border-secondary pr-3 text-primary">
              أحدث المقالات
            </h2>

            {loadHero ? (
              <div className="aspect-[16/9] rounded-3xl bg-gray-100 animate-pulse" />
            ) : (
              heroArticle && <CategoryHeroCard article={heroArticle} />
            )}

            {loadNews ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-video rounded-2xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridArticles.map(article => (
                  <ArticleGridCard key={article._id} article={article} />
                ))}
              </div>
            )}

            {hasNextPage && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs hover:bg-primary/90 disabled:opacity-70 transition-all cursor-pointer"
                >
                  {isFetchingNextPage ? (
                    <><span>جاري التحميل...</span><Loader2 size={14} className="animate-spin" /></>
                  ) : (
                    <><span>عرض المزيد</span><ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" /></>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {loadTrending ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />)}
              </div>
            ) : (
              <PopularArticles articles={popularArticles ?? []} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}