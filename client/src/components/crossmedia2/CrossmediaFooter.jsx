import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Lightbulb, Code } from 'lucide-react';

const FadeUpScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const CrossmediaFooter = () => {
    const executionNames = ["عمر طارق", "ملك محمود", "ميسرة سعيد"];
    
    const designers = [
        { name: "تسنيم علاء", url: "https://www.linkedin.com/in/tasneem-alaa" },
        { name: "ايمان اشرف", url: "https://www.linkedin.com/in/eman-ashraf-fullstack/" },
        { name: "رحيق ايمن", url: "https://www.linkedin.com/in/raheeq-ayman-8b12a3281/" },
    ];

    const badgeBaseStyle = "px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300";
    
    const executionBadgeStyle = `${badgeBaseStyle} bg-amber-500/10 border-amber-500/20 text-amber-400`;
    
    const designBadgeStyle = `${badgeBaseStyle} bg-pink-500/10 border-pink-500/20 text-pink-400 cursor-pointer hover:bg-pink-500/20 hover:border-pink-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/10`;

  return (
    <footer className="relative w-full bg-[#18181b] font-sans text-slate-300 z-40 border-t border-white/5" dir="rtl">
      
      <div className="absolute left-0 right-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <FadeUpScroll>
            <div className="flex items-start gap-4 h-full">
              <div className="flex-shrink-0 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Lightbulb className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight mb-4">
                  فكرة وتنفيذ
                </h4>
                <div className="flex flex-wrap gap-3">
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
            <div className="flex items-start gap-4 h-full md:border-r md:border-white/5 md:pr-12">
              <div className="flex-shrink-0 p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                <Code className="w-5 h-5 text-pink-400" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight mb-4">
                  تصميم وتطوير
                </h4>
                <div className="flex flex-wrap gap-3">
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

export default CrossmediaFooter;