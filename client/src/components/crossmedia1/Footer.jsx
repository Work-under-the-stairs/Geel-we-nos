import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Lightbulb, Code } from 'lucide-react'; // تم إضافة أيقونة الكود لتناسب قسم المطورين

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

const CrossmediaFooter = () => {
  const executionNames = ["فوزي محمد", "ملك محمود"];
  
  const designers = [
    { name: "إيمان أشرف", url: "https://www.linkedin.com/in/eman-ashraf-fullstack/" },
    { name: "رحيق أيمن", url: "https://www.linkedin.com/in/raheeq-ayman-8b12a3281/" },
    { name: "تسنيم علاء", url: "https://www.linkedin.com/in/tasneem-alaa" }
  ];

  const badgeBaseStyle = "px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 select-none";
  
  // طابع دافئ ومضيء للأفكار والتنفيذ
  const executionBadgeStyle = `${badgeBaseStyle} bg-amber-500/10 border-amber-500/20 text-amber-400`;
  
  // طابع متناسق تماماً مع ألوان الهوية الزرقاء للموقع الخاص بكنّ
  const designBadgeStyle = `${badgeBaseStyle} bg-blue-500/10 border-blue-500/20 text-blue-300 cursor-pointer hover:bg-blue-600/20 hover:border-blue-400/50 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10`;

  return (
    <footer className="relative w-full bg-[#091520] font-sans text-slate-300 z-40 border-t border-blue-950/60" dir="rtl">
      
      {/* الخط التوهجي العلوي الممتد بلون الهوية السماوي */}
      <div className="absolute left-0 right-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          
          {/* قسم فكرة وتنفيذ */}
          <FadeUpScroll>
            <div className="flex items-start gap-4 h-full bg-[#0e1e2c]/40 p-6 rounded-2xl border border-blue-950/40">
              <div className="flex-shrink-0 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <Lightbulb className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
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

          {/* قسم تصميم وتطوير المنسجم مع ألوانك */}
          <FadeUpScroll delay={0.15}>
            <div className="flex items-start gap-4 h-full bg-[#0e1e2c]/40 p-6 rounded-2xl border border-blue-950/40">
              <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Code className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
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

export default CrossmediaFooter;