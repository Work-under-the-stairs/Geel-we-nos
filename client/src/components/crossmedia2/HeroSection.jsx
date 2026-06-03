import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-900" dir="rtl">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
      >
        <source src="/assets/crossmedia2/youth-tech-future.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-b from-gray-900/40 via-gray-900/80 to-gray-900"></div>

      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
        

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          style={{ lineHeight: '1.3' }}
        >
          <span className="text-5xl md:text-7xl lg:text-8xl block text-transparent bg-clip-text bg-gradient-to-l from-orange-300 to-orange4 pb-7">
            بناء الإنسان:
          </span>
          رؤية الدولة لرعاية وتأهيل النشء
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mt-4 font-light drop-shadow-md"
        >
          رحلة بصرية عبر المبادرات الوطنية لصناعة جيل يواكب المستقبل
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs mb-3 font-light text-emerald-200 uppercase tracking-[0.2em]">
          اكتشف المزيد
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg 
            className="w-6 h-6 text-emerald-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;