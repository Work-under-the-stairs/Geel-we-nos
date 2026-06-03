import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Laptop } from 'lucide-react';

const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full pointer-events-none blur-[100px] z-50"
      animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  );
};

const SectionDivider = () => (
  <motion.div
    className="h-px w-full max-w-3xl mx-auto my-16 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  />
);

const FadeUpScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const TechBackgroundElements = () => {
  const techWords = ["AI", "Cybersecurity", "Robotics", "Coding", "Data", "Matrix"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <motion.path
          d="M10% 20% L30% 20% L40% 40% L70% 40% M80% 60% L60% 60% L50% 80% L20% 80%"
          stroke="#22d3ee"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="30%" cy="20%" r="4" fill="#22d3ee" animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="70%" cy="40%" r="4" fill="#22d3ee" animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        <motion.circle cx="60%" cy="60%" r="4" fill="#3b82f6" animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <motion.circle cx="20%" cy="80%" r="4" fill="#10b981" animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      </svg>

      {techWords.map((word, index) => (
        <motion.div
          key={index}
          className="absolute text-cyan-500/20 font-mono text-xl md:text-3xl font-bold blur-[1px]"
          style={{ top: `${15 + index * 12}%`, left: `${10 + (index % 3) * 30}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {word}
        </motion.div>
      ))}

      <motion.div animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[120px]" />
      <motion.div animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[40%] left-[5%] w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[150px]" />
    </div>
  );
};

const TechMinistrySection = () => {
  const yLabels = ["250,000", "200,000", "150,000", "100,000", "50,000", "0"];

  const comparisonData = [
    { title: "الفئة العمرية", icon: Users, baraem: "من الصف الرابع إلى السادس الابتدائي.", ashbal: "من أولى إعدادي حتى الثاني ثانوي." },
    { title: "مهارات مكتسبة", icon: Lightbulb, baraem: "التركيز على مهارات التواصل والذكاء العاطفي، والتعامل الذكي مع الشاشات.", ashbal: "التركيز على مهارات العمل الجماعي (Teamwork)، إدارة المشاريع، التفكير النقدي، والعرض والتقديم (Presentation Skills)." },
    { title: "المحتوى التعليمي", icon: Laptop, baraem: "يقتصر على التفكير المنطقي، حل المشكلات، ودراسة أساسيات البرمجة.", ashbal: "تركز على موضوعات أعمق وتشمل الأمن السيبراني، الذكاء الاصطناعي، وفنون الروبوتات." }
  ];

  return (
    <>
    {/* <div className="relative w-full font-sans" dir="rtl"> */}
      {/* <CursorGlow /> */}


      <div className="relative z-20 w-full bg-slate-950  pb-16">
      <div className="absolute left-0 right-0 top-[-18vw] md:top-[-16vw] w-full z-30 pointer-events-none drop-shadow-2xl translate-y-[2px]">
        <svg viewBox="0 0 1440 320" className="w-full h-auto fill-current text-slate-950 block" preserveAspectRatio="none">
          <path fillOpacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,96C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
        <TechBackgroundElements />

        <section className="min-h-screen relative flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto z-10 mt-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 relative">
            <div className="w-full lg:w-3/5">
              <FadeUpScroll>
                <div className="inline-block mb-6 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-medium text-sm md:text-base backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  وزارة الاتصالات وتكنولوجيا المعلومات
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
                  المدير التنفيذي لمبادرتي "براعم" و"أشبال مصر الرقمية": <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500 mt-2 block">
                    سوق العمل يستلزم تعلم التكنولوجيا والذكاء الاصطناعي
                  </span>
                </h2>
              </FadeUpScroll>

              <FadeUpScroll delay={0.2}>
                <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300">
                  المهندس وليد الأنجباوي، المدير التنفيذي لمبادرتي "براعم" و"أشبال مصر الرقمية"، يؤكد أن التطور الحاصل في سوق العمل يستلزم الاهتمام بالأعمار الأصغر سنًا، والإسراع في تعليمهم المهارات التقنية والذكاء الاصطناعي، وعدم الانتظار حتى تخرجهم؛ وهو الأمر الذي تعمل عليه وزارة الاتصالات وتكنولوجيا المعلومات من خلال بعض المبادرات.
                </p>
              </FadeUpScroll>
            </div>

            <div className="w-full lg:w-2/5 flex justify-center items-center gap-12 min-h-[300px]">
              <div className="relative flex justify-center items-center w-32 md:w-48 h-32 md:h-48">
                {[1, 2, 3].map((i) => (
                  <motion.div key={`b-${i}`} className="absolute inset-0 border border-cyan-500/30 rounded-full" animate={{ scale: [1, 1.3 + (i*0.15), 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }} />
                ))}
                <motion.img src="/assets/crossmedia2/baraem-logo.jpg" alt="لوجو براعم" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
              </div>

              <div className="relative flex justify-center items-center w-32 md:w-48 h-32 md:h-48">
                {[1, 2, 3].map((i) => (
                  <motion.div key={`a-${i}`} className="absolute inset-0 border border-blue-500/30 rounded-full" animate={{ scale: [1, 1.3 + (i*0.15), 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.5 }} />
                ))}
                <motion.img src="/assets/crossmedia2/ashbal-logo.jpg" alt="لوجو أشبال" animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="relative w-full py-24 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/assets/crossmedia2/social-media-bg.jpg')" }}>
          <div className="absolute inset-0 bg-slate-950/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <FadeUpScroll>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-slate-200 mb-10">
                ويضيف الأنجباوي أن وزارة الاتصالات لا تهتم بتنمية المهارات التقنية والتكنولوجية لدى الطلاب فحسب، وإنما تعمل كذلك على تنمية
                <motion.span 
                  className="text-cyan-400 font-bold mx-2 cursor-pointer inline-block"
                  whileHover={{ scale: 1.08, textShadow: "0 0 25px #22d3ee" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  "المهارات الناعمة"
                </motion.span>
                ، كما يُطلق عليها في سوق العمل.
              </p>
            </FadeUpScroll>

            <FadeUpScroll delay={0.2}>
              <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 mb-10 pl-4 border-r-2 border-cyan-500 relative">
                <span className="absolute -right-[3px] top-0 bottom-0 w-1 bg-cyan-400 blur-[2px]"></span>
                والمهارات الناعمة هي مجموعة من المهارات الشخصية والاجتماعية التي تحدد طريقة تعامل الشخص مع الآخرين؛ على غرار: التواصل الفعّال، والعمل الجماعي، وحل المشكلات، والمرونة، والتكيف، وإدارة الوقت، والذكاء العاطفي، والقيادة.
              </p>
            </FadeUpScroll>

            <FadeUpScroll delay={0.3}>
              <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 mb-16">
                ويُكمل الأنجباوي أن امتلاك الطالب لهذه المهارات في سنٍ مبكرةٍ يمنحه الثقة في نفسه، ويجعله يواكب تطورات العصر، مستطردًا أن الوزارة تستهدف الأطفال من سن تسعة أعوام فأكثر، عن طريق توفير المبادرات والبرامج المخصصة لهذه الشريحة العمرية؛ لأن التأهيل لم يعد يعني مهارات استخدام الهاتف أو وسائل التواصل الاجتماعي، وإنما بناء جيل رقمي قادر على المنافسة عالميًا.
              </p>
            </FadeUpScroll>

            <FadeUpScroll delay={0.4}>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-12 mb-20 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500"></div>
                
                <h4 className="text-center text-xl md:text-3xl font-bold text-white mb-16">
                  التحاق الأطفال في مبادرات <br className="md:hidden" /> وزارة التكنولوجيا والاتصالات
                </h4>
                
                <div className="flex w-full max-w-3xl mx-auto h-[300px] md:h-[400px] relative font-sans">
                  <div className="absolute -right-12 md:-right-16 top-0 bottom-0 flex items-center">
                    <span className="transform -rotate-90 text-slate-400 font-bold text-xs md:text-lg whitespace-nowrap">عدد الأطفال (طالب)</span>
                  </div>

                  <div className="flex flex-col justify-between items-end pr-4 text-slate-400 font-medium text-[10px] md:text-base h-[calc(100%-2rem)] md:h-[calc(100%-3rem)] w-16 md:w-24 z-10">
                    {yLabels.map((label, index) => (
                      <span key={index} className="translate-y-1/2">{label}</span>
                    ))}
                  </div>

                  <div className="relative flex-1 border-r-2 border-b-2 border-slate-600 flex justify-center gap-12 md:gap-32 items-end pb-0 px-4 md:px-10 h-[calc(100%-2rem)] md:h-[calc(100%-3rem)]">
                    
                    <div className="absolute inset-0 flex flex-col justify-between z-0">
                      {yLabels.map((_, index) => (
                        <div key={index} className="w-full border-t border-slate-700/50 border-dashed"></div>
                      ))}
                    </div>

                    <div className="relative z-10 flex flex-col justify-end items-center w-16 md:w-32 h-full cursor-pointer">
                      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-blue-400 font-bold mb-2 text-sm md:text-2xl text-center">
                        195,000 <span className="block text-[10px] md:text-base text-slate-400 font-normal">طالب</span>
                      </motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '78%' }} transition={{ duration: 1.2, ease: 'easeOut' }} className="w-full bg-gradient-to-t from-blue-900 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-t-md relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all">
                        <motion.div animate={{ y: ["100%", "-100%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent" />
                      </motion.div>
                      <span className="text-slate-200 mt-2 md:mt-4 font-bold text-xs md:text-xl absolute -bottom-8 md:-bottom-12 whitespace-nowrap">براعم مصر</span>
                    </div>

                    <div className="relative z-10 flex flex-col justify-end items-center w-16 md:w-32 h-full cursor-pointer">
                      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="text-emerald-400 font-bold mb-2 text-sm md:text-2xl text-center">
                        112,000 <span className="block text-[10px] md:text-base text-slate-400 font-normal">طالب</span>
                      </motion.div>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: '44.8%' }} transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }} className="w-full bg-gradient-to-t from-emerald-900 to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-t-md relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all">
                        <motion.div animate={{ y: ["100%", "-100%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent" />
                      </motion.div>
                      <span className="text-slate-200 mt-2 md:mt-4 font-bold text-xs md:text-xl absolute -bottom-8 md:-bottom-12 whitespace-nowrap">أشبال مصر</span>
                    </div>

                  </div>
                </div>
              </div>
            </FadeUpScroll>

            <FadeUpScroll>
              <div className="relative bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md">
                <svg className="absolute top-6 right-6 w-8 h-8 md:w-12 md:h-12 text-cyan-500/20 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="relative z-10 text-center">
                  <p className="text-lg md:text-3xl text-white font-medium leading-relaxed italic">
                    "يجب ألا ننتظر الطفل حتى يكبر ويتخرج لنبدأ في تعليمه، وإنما تأهيله لجميع المهارات من الجذور"
                  </p>
                </div>
              </div>
            </FadeUpScroll>
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 w-full pt-16 pb-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-30">
            <div className="mb-20">
              <FadeUpScroll>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-16 border-r-4 border-cyan-500 pr-4 drop-shadow-md">
                  الفرق بين المبادرتين
                </h3>
              </FadeUpScroll>

              <div className="w-full flex flex-col gap-6 md:gap-8 relative font-sans">
                <div className="flex justify-between items-center mb-4 md:mb-8 px-2 md:px-12">
                  <div className="w-[40%] flex justify-center">
                    <motion.img src="/assets/crossmedia2/baraem-logo.jpg" alt="براعم مصر" className="h-12 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                  </div>
                  <div className="w-[20%] flex justify-center">
                    <div className="w-10 h-10 md:w-20 md:h-20 bg-slate-900 border-2 border-slate-700 text-cyan-400 rounded-full flex items-center justify-center font-black text-sm md:text-4xl italic shadow-[0_0_20px_rgba(6,182,212,0.3)]">VS</div>
                  </div>
                  <div className="w-[40%] flex justify-center">
                    <motion.img src="/assets/crossmedia2/ashbal-logo.jpg" alt="أشبال مصر" className="h-12 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                  </div>
                </div>

                {comparisonData.map((row, idx) => (
                  <FadeUpScroll delay={idx * 0.2} key={idx}>
                    <div className="flex flex-row items-stretch justify-center relative group w-full gap-1 md:gap-4">
                      <div className="flex-1 w-[40%] bg-blue-900/10 backdrop-blur-sm border border-blue-800/30 p-3 md:p-8 rounded-r-2xl md:rounded-r-3xl text-slate-300 text-center flex items-center justify-center shadow-lg min-h-[100px] md:min-h-[120px] transition-all duration-300 group-hover:bg-blue-900/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <p className="font-light text-[11px] sm:text-xs md:text-lg leading-snug md:leading-relaxed">{row.baraem}</p>
                      </div>
                      
                      <div className="w-[15%] md:w-[10%] flex flex-col items-center justify-center shrink-0 z-10">
                        <div className="bg-slate-900 text-cyan-400 p-2 md:p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] border-2 border-cyan-900/50 mb-1 md:mb-2 transition-transform duration-300 group-hover:scale-110">
                          <row.icon className="w-5 h-5 md:w-8 md:h-8" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 text-[9px] md:text-sm font-medium py-1 px-2 md:px-4 rounded-full border border-slate-700 shadow-md whitespace-nowrap">
                          {row.title}
                        </div>
                      </div>
                      
                      <div className="flex-1 w-[40%] bg-emerald-900/10 backdrop-blur-sm border border-emerald-800/30 p-3 md:p-8 rounded-l-2xl md:rounded-l-3xl text-slate-300 text-center flex items-center justify-center shadow-lg min-h-[100px] md:min-h-[120px] transition-all duration-300 group-hover:bg-emerald-900/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <p className="font-light text-[11px] sm:text-xs md:text-lg leading-snug md:leading-relaxed">{row.ashbal}</p>
                      </div>
                    </div>
                  </FadeUpScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="sticky top-0 h-screen w-full bg-slate-950 z-10 flex flex-col justify-center overflow-hidden border-t border-slate-900/50">
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full relative z-30">
          <FadeUpScroll>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8 border-r-4 border-cyan-500 pr-4 drop-shadow-md">
              شروط الالتحاق
            </h3>
          </FadeUpScroll>
          
          <FadeUpScroll delay={0.2}>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-500"></div>
              <p className="text-base md:text-xl font-light leading-relaxed text-slate-300 relative z-10">
                ويكمل الأنجباوي أنه "لا توجدُ شروط تعجيزية للالتحاق بأي مبادرة سوى الالتزام والاستمرارية، وتوافر خدمات الإنترنت ووسيلة التعلم (الهاتف أو الحاسب الآلي)"، مضيفًا أن قياس نجاح المبادرة يتمثل في استمرار الطلاب، واجتيازهم الاختبارات بعد كل مستوى، وحصولهم على الشهادات المعتمدة.
              </p>
            </div>
          </FadeUpScroll>
        </div>
      </section>
    {/* </div> */}
    </>
  );
};

export default TechMinistrySection;