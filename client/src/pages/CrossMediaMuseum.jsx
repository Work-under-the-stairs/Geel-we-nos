import React, { useEffect, useState } from 'react';
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
import Crossmedia3Footer from '../components/crossmedia3/CrossmediaFooter';

const CrossMediaMuseum = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <div className="bg-[#0f1423] min-h-screen text-white select-none antialiased selection:bg-[#d4b483] selection:text-black">
      
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#d4b483] via-[#48392a] to-[#d4b483] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(212,180,131,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="fixed bottom-4 left-4 z-40 bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-gray-400 font-mono tracking-wide hidden sm:flex items-center gap-1.5 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4b483] animate-ping"></span>
        <span>رحلة الوعي والتراث التفاعلية</span>
      </div>

      <main className="w-full flex flex-col">
        <HeroSection />
        <NationalIdentity />
        <CurriculumAndHeritage />
        <HistoricalIcons />
        <TechnologyIntegration />
        <HeritageAwareness />
        <DevelopmentAndBalance />
        <ModernDisplayTechniques />
        <DigitalTriumph />
        <DigitalDocumentation />
        <FutureEngagement />
        <FinalLegacy />
      </main>

      <Crossmedia3Footer />

    </div>
  );
};

export default CrossMediaMuseum;