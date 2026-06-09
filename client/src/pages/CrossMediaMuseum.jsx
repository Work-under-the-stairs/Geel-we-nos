import React, { useEffect, useState } from 'react';

// استيراد الـ 12 مكوناً التفاعلياً بترتيبهم الصحيح في المقال

import { Cross } from 'lucide-react';
import HeroSection from '../components/crossmedia3/HeroSection';
import NationalIdentity from '../components/crossmedia3/NationalIdentity';
import CurriculumAndHeritage from '../components/crossmedia3/CurriculumAndHeritage';
import HistoricalIcons from '../components/crossmedia3/HistoricalIcons';
import TechnologyIntegration from '../components/crossmedia3/TechnologyIntegration';
import HeritageAwareness from '../components/crossmedia3/HeritageAwareness';
import DevelopmentAndBalance from '../components/crossmedia3/DevelopmentAndBalance';
import ModernDisplayTechniques from '../components/crossmedia3/ModernDisplayTechniques';
import DigitalTriumph from '../components/crossmedia3/DigitalTriumph';
import DigitalDocumentation from '../components/crossmedia3/DigitalDocumentation';
import FutureEngagement from '../components/crossmedia3/FutureEngagement';
import FinalLegacy from '../components/crossmedia3/FinalLegacy';

const CrossMediaMuseum = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // حساب نسبة التمرير في الصفحة لتحديث مؤشر التقدم العلوي
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0f1423] min-h-screen text-white select-none antialiased selection:bg-amber-500 selection:text-black">
      
      {/* 🧭 مؤشر التقدم العلوي الذكي (Progress Bar) - رسبونسف وثابت في الأعلى */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 🎨 زر عائم للموسيقى أو تلميح تفاعلي خفيف يظهر على الشاشات */}
      <div className="fixed bottom-4 left-4 z-40 bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-gray-400 font-mono tracking-wide hidden sm:flex items-center gap-1.5 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>رحلة الوعي والتراث التفاعلية</span>
      </div>

      {/* 🏛️ تدفق الـ 12 سيكشن وراء بعضهم البعض كممر متحفي متكامل */}
      <main className="w-full flex flex-col">
        
        <HeroSection />                 {/* السكشن 1 */}
        
        <NationalIdentity />           {/* السكشن 2 */}
        
        <CurriculumAndHeritage />      {/* السكشن 3 */}
        
        <HistoricalIcons />            {/* السكشن 4 */}
        
        <TechnologyIntegration />      {/* السكشن 5 */}
        
        <HeritageAwareness />          {/* السكشن 6 */}
        
        <DevelopmentAndBalance />      {/* السكشن 7 */}
        
        <ModernDisplayTechniques />    {/* السكشن 8 */}
        
        <DigitalTriumph />             {/* السكشن 9 */}
        
        <DigitalDocumentation />       {/* السكشن 10 */}
        
        <FutureEngagement />           {/* السكشن 11 */}
        
        <FinalLegacy />                {/* السكشن 12 */}

      </main>

      {/* 📜 تذييل الصفحة البسيط والمميز */}
      <footer className="bg-black/80 border-t border-white/5 py-6 text-center text-xs text-gray-500 font-light backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 dir-rtl">
          <p>© جميع الحقوق محفوظة لصفحة الكروس ميديا التفاعلية - المتاحف وبناء وعي الطفل</p>
          <p className="font-mono text-[10px] text-gray-600">CROSS_MEDIA_MUSEUM_PROJECT.2026</p>
        </div>
      </footer>

    </div>
  );
};

export default CrossMediaMuseum;