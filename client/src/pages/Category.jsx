// src/pages/Category.jsx
import React from 'react'; 
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../constants/Categories';
import BreakingNewsBar from '../components/ui/BreakingNewsBar'; 
import { User } from 'lucide-react'; 
import PopularArticles from '../components/ui/PopularArticles';

import {
  FEATURED_NEWS,
} from '../data/dummyData';

export default function Category({ categoryData, latestArticles, popularArticles }) {
  const { category } = useParams(); 
  const decodedCategoryName = category ? decodeURIComponent(category) : "";

  const currentCategory = CATEGORIES.find(c => c.name === decodedCategoryName) || { 
    name: decodedCategoryName || "أخبار التكنولوجيا", 
    icon_name: "Cpu", 
    description: "تغطية حصرية ومستمرة لأحدث التقنيات، الهواتف الذكية، والذكاء الاصطناعي." 
  };

  const allNews = FEATURED_NEWS;

  const filteredLatest = allNews.filter(a => a.category === currentCategory.name);
  const filteredPopular = allNews.filter(a => a.category === currentCategory.name);

  const finalLatest = filteredLatest.length > 0 ? filteredLatest : allNews.slice(0, 6);
  const finalPopular = filteredPopular.length > 0 ? filteredPopular.slice(1) : allNews.slice(0, 5);

  const heroArticle = finalLatest[0];
  const gridArticles = finalLatest.slice(1);

  return (
    <div className="min-h-screen bg-white antialiased" dir="rtl">
      
      {/* ======= Header ======= */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary)]/10 via-[var(--color-primary)]/3 to-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute left-35 bottom-[5px] text-[var(--color-primary)]/5 transform rotate-12 pointer-events-none select-none hidden md:block">
          <DynamicIcon name={currentCategory.icon_name} className="w-40 h-40 stroke-[1.5]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
              <DynamicIcon name={currentCategory.icon_name} className="w-3.5 h-3.5" />
              <span>قسم الحصريات</span>
            </div>
            
            <h1 style={{ fontFamily: "'Cairo', sans-serif" }} className="text-4xl sm:text-4xl font-black font-extrabold text-[var(--color-primary)] tracking-tight">
              {currentCategory.name}
            </h1>
            
            <p className="text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed font-light">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </header>

      {/* شريط الأخبار العاجلة */}
      <BreakingNewsBar breakingArticles={FEATURED_NEWS} />

      {/* ======= محتوى الصفحة الرئيسي ======= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* الجانب الأيمن (70%): الأخبار الأحدث والـ Grid */}
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-xl font-extrabold border-r-4 border-[var(--color-secondary)] pr-3 mb-6 text-primary">
              أحدث المقالات
            </h2>

            {/* الخبر الرئيسي الضخم */}
            {heroArticle && (
              <a href={`/news/${heroArticle._id || heroArticle.id}`} className="group relative block overflow-hidden rounded-2xl bg-gray-950 aspect-[16/9] shadow-md">
                <img 
                  src={heroArticle.images?.[0] || heroArticle.image} 
                  alt={heroArticle.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 p-6 sm:p-8 w-full">
                  <span className="text-xs font-bold bg-[var(--color-secondary)] text-white px-3 py-1 rounded-md mb-3 inline-block shadow-sm">
                    أهم الأخبار
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight group-hover:underline decoration-white/50">
                    {heroArticle.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base line-clamp-2 max-w-2xl font-light">
                    {heroArticle.summary || heroArticle.content}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-300 font-medium">
                    <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white">
                      <User size={12} />
                      {heroArticle.writer || heroArticle.author || 'المحرر'}
                    </span>
                    <span>•</span>
                    <span>{heroArticle.date}</span>
                    <span>•</span>
                    <span>{heroArticle.readTime || '3 دقائق'} قراءة</span>
                  </div>
                </div>
              </a>
            )}

            {/* باقي الأخبار على شكل Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {gridArticles.map((article) => (
                <a href={`/news/${article._id || article.id}`} key={article._id || article.id} className="group flex flex-col space-y-3 bg-white rounded-xl overflow-hidden border border-gray-100 p-2 hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={article.images?.[0] || article.image} 
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-2">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2 font-light flex-1">
                      {article.summary || article.content}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-gray-50 pt-3">
                      <span className="flex items-center gap-1 text-gray-600 font-bold">
                        <User size={11} className="text-gray-400" />
                        {article.writer || article.author || 'المحرر'}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* الجانب الأيسر (30%): الأكثر قراءة باستخدام المكون الجديد */}
          <div className="lg:col-span-1">
            <PopularArticles articles={finalPopular} />
          </div>

        </div>
      </main>
    </div>
  );
}