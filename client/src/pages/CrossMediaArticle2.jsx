import React from 'react'
import YouthMinistrySection from '../components/crossmedia2/YouthMinistrySection';
import TechMinistrySection from '../components/crossmedia2/TechMinistrySection';
import CultureMinistrySection from '../components/crossmedia2/CultureMinistrySection';
import HeroSection from '../components/crossmedia2/HeroSection';

const CrossMediaArticle2 = () => {
return (
    <div className="min-h-screen bg-[#1a241e] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <HeroSection />
      <YouthMinistrySection />
      <TechMinistrySection />
      <CultureMinistrySection />
    </div>
  );
}

export default CrossMediaArticle2