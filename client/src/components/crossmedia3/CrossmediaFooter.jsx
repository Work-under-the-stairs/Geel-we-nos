import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Lightbulb, Code } from 'lucide-react';

const FadeUpScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Crossmedia3Footer = () => {
  const executionNames = ["عمر طارق", "ملك محمود","ميسره سعيد"];
  
  const designers = [
    { name: "تسنيم علاء", url: "https://www.linkedin.com/in/tasneem-alaa" },
    { name: "إيمان أشرف", url: "https://www.linkedin.com/in/eman-ashraf-fullstack/" },
    { name: "رحيق أيمن", url: "https://www.linkedin.com/in/raheeq-ayman-8b12a3281/" },
  ];

  const badgeBaseStyle = "px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 select-none font-sans";
  
  const executionBadgeStyle = `${badgeBaseStyle} bg-[#d4b483]/10 border-[#d4b483]/20 text-[#d4b483]`;
  
  const designBadgeStyle = `${badgeBaseStyle} bg-[#d4b483]/10 border-[#d4b483]/20 text-[#d4b483] cursor-pointer hover:bg-[#d4b483]/20 hover:border-[#d4b483]/50 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4b483]/20`;

  return (
    <footer className="relative w-full bg-[#0a0806] font-serif text-[#e5e5e5] z-40 border-t border-[#d4b483]/10 overflow-hidden" dir="rtl">
      
      <div className="absolute left-0 right-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4b483]/30 to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#d4b483_1px,transparent_1px)] [background-size:30px_30px]"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          <FadeUpScroll>
            <div className="flex items-start gap-4 h-full bg-[#14100c]/80 backdrop-blur-md p-6 rounded-2xl border border-[#d4b483]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#1a1510]/90">
              <div className="flex-shrink-0 p-3 bg-[#d4b483]/10 rounded-xl border border-[#d4b483]/20">
                <Lightbulb className="w-5 h-5 text-[#d4b483]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 font-sans">
                  فكرة وتنفيذ
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {executionNames.map((name, index) => (
                    <span key={index} className={executionBadgeStyle}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUpScroll>

          <FadeUpScroll delay={0.15}>
            <div className="flex items-start gap-4 h-full bg-[#14100c]/80 backdrop-blur-md p-6 rounded-2xl border border-[#d4b483]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#1a1510]/90">
              <div className="flex-shrink-0 p-3 bg-[#d4b483]/10 rounded-xl border border-[#d4b483]/20">
                <Code className="w-5 h-5 text-[#d4b483]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 font-sans">
                  تصميم وتطوير
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {designers.map((designer, index) => (
                    <a 
                      key={index} 
                      href={designer.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={designBadgeStyle}
                      title={`زيارة حساب لينكد إن لـ ${designer.name}`}
                    >
                      {designer.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeUpScroll>
          
        </div>
      </div>
    </footer>
  );
};

export default Crossmedia3Footer;