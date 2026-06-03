import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, PlayCircle, Star, Heart, Palette, Theater, Music, Search, TrendingUp, Microscope, Quote } from 'lucide-react';

const FadeUpScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const PlayfulBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#db277708_1px,transparent_1px),linear-gradient(to_bottom,#db277708_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[10%] text-pink-400/10"><Palette size={80} strokeWidth={1} /></motion.div>
    <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[45%] left-[8%] text-purple-400/10"><Theater size={100} strokeWidth={1} /></motion.div>
    <motion.div animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[15%] right-[15%] text-amber-400/10"><Music size={90} strokeWidth={1} /></motion.div>
    
    <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-pink-400/5 rounded-full"></div>
    <div className="absolute bottom-[30%] right-[25%] w-48 h-48 bg-purple-400/5 rounded-full"></div>
  </div>
);

const CultureMinistrySection = () => {
  const digitalPlatforms = [
    {
      title: 'تطبيق "توت"',
      desc: 'لنشر كتب ومجلات الطفل بطريقة عصرية وتفاعلية.',
      icon: BookOpen,
      theme: 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20'
    },
    {
      title: 'منصة "عيالنا"',
      desc: 'منصة خبرية مهتمة بكل شؤون الطفل الثقافية والفنية.',
      icon: Globe,
      theme: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20'
    },
    {
      title: 'قناة "نجوم صغيرة"',
      desc: 'تضم 1700 فيديو لتنمية القيم وتعديل السلوك الإيجابي.',
      icon: PlayCircle,
      theme: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
    }
  ];

  const talentStages = [
    { title: "اكتشاف الموهبة", icon: Search, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    { title: "رعايتها", icon: Heart, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    { title: "التسويق لها", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    { title: "الأبحاث والمتابعة", icon: Microscope, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" }
  ];

  return (
    <div className="relative z-20 w-full font-sans bg-[#1e1e24] text-slate-200 overflow-hidden" dir="rtl">
      <PlayfulBackground />

      <div className="absolute left-0 right-0 top-[-6vw] w-full z-30 pointer-events-none drop-shadow-sm translate-y-[2px]">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-current text-[#1e1e24] block" preserveAspectRatio="none">
          <path d="M0,120 C320,0 1120,0 1440,120 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      <section className="relative flex flex-col justify-center py-24 px-6 max-w-6xl mx-auto z-10 mt-10">
        <FadeUpScroll>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-pink-400 font-bold text-sm md:text-base tracking-widest uppercase bg-[#2b2b36] px-6 py-2 rounded-full border border-pink-500/20">
              وزارة الثقافة والمركز القومي
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight text-center">
            رئيس المركز القومي لثقافة الطفل: <br/>
            <span className="text-pink-400 mt-3 block">
              نسعى للتحول الرقمي لمواكبة الجيل الجديد
            </span>
          </h2>
        </FadeUpScroll>

        <FadeUpScroll delay={0.2}>
          <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 mb-20 text-center max-w-4xl mx-auto">
            يقول محمد حافظ ناصف، رئيس "المركز القومي لثقافة الطفل" التابع لوزارة الثقافة: "إن المركز يحرص على تقديم خدماته بشكل يتناسب مع تطورات العصر وثقافة الأجيال الجديدة، إذ لم يعد يقدم المحتوى بالشكل التقليدي، بل يسعى إلى التحول الرقمي".
          </p>
        </FadeUpScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {digitalPlatforms.map((platform, idx) => (
            <FadeUpScroll delay={idx * 0.2} key={idx}>
              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-8 rounded-[2rem] border transition-all duration-300 ${platform.theme} flex flex-col items-center text-center`}
              >
                <div className="w-16 h-16 rounded-full bg-[#1e1e24] flex items-center justify-center mb-6 shadow-sm">
                  <platform.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{platform.title}</h3>
                <p className="text-base text-slate-300 font-light leading-relaxed">{platform.desc}</p>
              </motion.div>
            </FadeUpScroll>
          ))}
        </div>
      </section>

      <section className="relative w-full py-32 mt-16 group overflow-hidden bg-[#18181b]">
        <img 
          src="/assets/crossmedia2/zewi-hemam.jpg" 
          alt="فريق ذوي الهمم" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e24] via-[#1e1e24]/80 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="w-full lg:w-3/5">
            <FadeUpScroll>
              <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-5 py-2 rounded-full mb-8">
                <Heart className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-bold tracking-wide">طاقات منتجة</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                الاهتمام <span className="text-amber-400">بذوي الهمم</span>
              </h3>
            </FadeUpScroll>

            <FadeUpScroll delay={0.2}>
              <p className="text-xl font-light leading-relaxed text-slate-200 mb-8">
                ويضيف حافظ أن وزارة الثقافة تهتم بشكل كبير بذوي القدرات الخاصة، وهو اتجاه عام في الدولة حاليًا، من أجل تحويلهم إلى طاقات منتجة وصاحبة تأثير كبير، ولذلك أنشأت إدارة لذوي الاحتياجات الخاصة تتبع الهيئة العامة لقصور الثقافة.
              </p>
            </FadeUpScroll>

            <FadeUpScroll delay={0.3}>
              <div className="bg-[#2b2b36]/80 backdrop-blur-sm border-r-4 border-amber-400 p-6 rounded-l-2xl mb-8 shadow-sm">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-white">
                  هناك العديد من العروض التي ينفذها <span className="text-amber-400 font-bold text-2xl mx-1">فريقُ ذوي الهمم الغنائي</span>، مثل عرض "محطة جمال عبد الناصر" الذي لقيَ إشادة كبيرة من الحاضرين.
                </p>
              </div>
            </FadeUpScroll>

            <FadeUpScroll delay={0.4}>
              <p className="text-lg text-slate-300 font-light leading-relaxed">
                وتسعى الوزارة للحفاظ على الهوية المصرية لدى الأجيال الجديدة عن طريق تنظيم المسرحيات والندوات التاريخية، لمواجهة أي تأثيرات خارجية عبر وسائل التواصل الاجتماعي.
              </p>
            </FadeUpScroll>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col justify-center py-32 px-6 max-w-6xl mx-auto z-10">
        
        <FadeUpScroll>
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              مبادرتانِ بالتعاون مع وزارتي <br className="md:hidden" /> الشباب والتعليم
            </h3>
            <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full"></div>
          </div>
        </FadeUpScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          <FadeUpScroll delay={0.2}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative h-full min-h-[400px] rounded-[2.5rem] overflow-hidden group border border-[#3f3f46]"
            >
              <img 
                src="/assets/crossmedia2/eyalna.jpg" 
                alt="مبادرة عيالنا" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e24] via-[#1e1e24]/60 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col justify-end h-full p-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h4 className="text-4xl font-bold text-white mb-4">مبادرة "عيالنا"</h4>
                <p className="text-slate-200 leading-relaxed font-light text-xl">
                  تُقدم بالتعاون مع وزارة الشباب والرياضة، لتنظيم رحلات الأطفال في المحافظات المختلفة لتعزيز الانتماء.
                </p>
              </div>
            </motion.div>
          </FadeUpScroll>

          <FadeUpScroll delay={0.4}>
            <div className="h-full bg-[#2b2b36] border border-[#3f3f46] rounded-[2.5rem] p-10 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <Star className="w-8 h-8 text-purple-400 fill-purple-400/20" />
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">مبادرة "اكتشاف الموهوبين"</h4>
                  <span className="text-purple-400 text-sm">بالتعاون مع وزارة التربية والتعليم</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {talentStages.map((stage, idx) => (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    key={idx} 
                    className={`${stage.bg} ${stage.border} border p-4 rounded-2xl flex flex-col items-center text-center`}
                  >
                    <stage.icon className={`w-8 h-8 ${stage.color} mb-3`} strokeWidth={1.5} />
                    <span className={`text-xs font-bold ${stage.color} mb-1`}>المرحلة {idx + 1}</span>
                    <h5 className="text-white font-medium text-sm">{stage.title}</h5>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed font-light text-base bg-[#1e1e24] p-5 rounded-2xl border border-[#3f3f46]">
                تنفذ المبادرة مسابقات عدة للاستعانة بالموهوبين في الفرق الفنية والأدبية، والمشاركة في العروض والمهرجانات لعرض مشاريعهم.
              </p>
            </div>
          </FadeUpScroll>

        </div>
      </section>

      <section className="relative w-full py-32 mt-10 bg-[#18181b] overflow-hidden">
        <div className="absolute left-0 right-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <FadeUpScroll>
            <div className="relative inline-block mb-10">
              <Quote className="w-16 h-16 text-pink-400/20 transform rotate-180 absolute -top-8 -right-8" />
              <div className="w-20 h-20 bg-[#2b2b36] border border-[#3f3f46] rounded-full flex items-center justify-center mx-auto">
                <PlayCircle className="w-10 h-10 text-pink-400" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-12 italic relative z-10">
              "إن مركز ثقافة الطفل يعمل على مشروع عبارة عن <span className="text-pink-400 font-bold">أول عمل درامي (مسلسل) ينتجه المركز بالتعاون مع المركز القومي للسينما</span>، إلى جانب أفلام قصيرة سيجري إنتاجها أيضًا؛ بهدف تقديم محتوى يليق بأجيال مصر الصغيرة ومستقبلها."
            </h3>
            
            <div className="inline-block bg-[#2b2b36] border border-[#3f3f46] px-8 py-4 rounded-full">
              <p className="text-pink-400 font-bold text-xl mb-1">محمد حافظ ناصف</p>
              <p className="text-slate-400 text-sm">رئيس المركز القومي لثقافة الطفل</p>
            </div>
          </FadeUpScroll>
        </div>
      </section>

    </div>
  );
};

export default CultureMinistrySection;