import React from 'react';
import { 
  FaChild, 
  FaHeartBroken, 
  FaHandHoldingHeart, 
  FaSmileWink,
  FaLightbulb,
  FaCode,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import CrossmediaFooter from '../../components/crossmedia1/Footer';

const DoaaStory = () => {
  const timelineData = [
    {
      id: 1,
      tag: "البراءة والشغف",
      title: "ضحكات طفولية في ساحات غزة",
      description: "عاشت الطفلة دعاء في غزة قبل الحرب أياماً ملؤها الفرح، تجري وتلعب وتمرح حول بيتها وفي ساحات الشوارع كباقي الأطفال. وصفها جدها بحب شديد بأن 'شخصيتها حلوة واكتير بتحب اللعب'، حيث كانت تنشر البهجة أينما حلت ببراءتها العفوية.",
      icon: <FaChild className="text-blue-400" />,
      image: "/assets/images/doaa_2.jpeg"
    },
    {
      id: 2,
      tag: "الفقد والألم",
      title: "استهداف غادر وسرقة الساق الحلوة",
      description: "لم تفرق آلة الحرب بين بريء ومذنب، حيث استهدفت طائرات الاحتلال الطفلة دعاء، لتفقد على إثر ذلك عضواً ليس ببسيط من جسدها الصغير وهي ساقها. تبدلت حياتها فجأة، وباتت تواجه واقعاً قادراً على إثقال كاهل الكبار.",
      icon: <FaHeartBroken className="text-rose-400" />,
      image: "/assets/images/doaa_sad.png"
    },
    {
      id: 3,
      tag: "المعركة النفسية",
      title: "صراع الأمل وصعوبة التأهيل",
      description: "تعيش دعاء حالة نفسية سيئة منذ بتر ساقها، وتتحسر مراراً عندما ترى الأطفال في عمرها يركضون بشكل طبيعي. ورغم أن الطرف الصناعي يمثل لها فرصة للعودة للعب، إلا أنها تواجه صعوبات مادية ونفسية جمة in رحلة العلاج، فضلاً عن رعبها المتواصل من صوت الطائرات الذي يلاحقها ككابوس يضاعف أعباء سفرها لتغيير الطرف دورياً مع نمو جسدها.",
      icon: <FaHandHoldingHeart className="text-purple-400" />,
      image: "/assets/images/doaa_foot.png"
    },
    {
      id: 4,
      tag: "رؤية الغد",
      title: "حلم الشفاء والتمسك بحق الطفولة",
      description: "تحلم دعاء بأن تصبح طبيبة مستقبلاً لتداوي الآلام التي ذاقتها. ورغم كل شيء، لم تخل عن براءتها، فما زالت متمسكة بحقها في الحياة، تستخدم السبورة الصغيرة للرسم والتلوين وتعد نفسها بشغف للعودة إلى مقاعد الدراسة فور انتهاء الحرب، واصفة أمنيتها ببراءة: 'بدي رجلي الحلوة ترجعلي'.",
      icon: <FaSmileWink className="text-emerald-400" />, 
      image: "/assets/images/doaa_hope.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0e1e2c] font-sans antialiased text-slate-200" dir="rtl">

      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="torn-paper-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.03,0.04 
              C 0.15,0.01 0.22,0.06 0.35,0.02 
              C 0.45,-0.01 0.52,0.05 0.62,0.01 
              C 0.75,0.04 0.88,-0.01 0.97,0.03 
              C 0.99,0.15 0.96,0.25 0.98,0.38 
              C 1.01,0.48 0.95,0.58 0.97,0.72 
              C 0.96,0.82 1.00,0.92 0.96,0.97 
              C 0.85,0.95 0.72,0.99 0.60,0.96 
              C 0.48,0.98 0.38,0.94 0.25,0.97 
              C 0.15,0.99 0.08,0.94 0.02,0.96 
              C 0.04,0.85 0.01,0.72 0.03,0.60 
              C -0.01,0.48 0.04,0.35 0.01,0.22 
              C 0.04,0.12 0.01,0.06 0.03,0.04 Z
            " />
          </clipPath>
        </defs>
      </svg>

      <header className="relative h-screen bg-gradient-to-b from-[#1a3147] via-[#0e1e2c] to-[#0e1e2c] flex flex-col items-center justify-center overflow-hidden px-4">
        <div style={{backgroundAttachment: "fixed", backgroundRepeat: "no-repeat"}} className="absolute inset-0 opacity-10 bg-[url('https://media.cnn.com/api/v1/images/stellar/prod/231126125943-gaza-city-damage-1126.jpg?c=16x9&q=w_800,c_fill')] bg-cover bg-center"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <span className="bg-rose-500/10 text-rose-300 px-5 py-2 rounded-full text-xs font-semibold border border-rose-500/20 uppercase tracking-wider">
            غزة العزة • براءة مبتورة • أمل طبيبة الغد
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 mb-6 tracking-tight leading-tight">
            خطوات صغيرة.. <br className="hidden md:block" /> وابتسامة لا تغيب
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            حكاية الطفلة الغزية دعاء، التي واجهت غدر القصف بقلبٍ صابر؛ فقدت ساقها الحلوة واستبدلتها بعزيمة ترسم ملامح الغد بريشة الأمل.
          </p>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30">
          <svg className="block w-full h-[90px] md:h-[130px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44C58.3,10.25,0,0,0,0V120H1200V0c0,0-93.34,58.09-256.88,58.09-110.78,0-203.88-39.79-321.73-39.79C487.2,18.3,432.49,75.24,321.39,56.44Z" fill="#0e1e2c" />
          </svg>
        </div>
      </header>

      <main className="pt-20 pb-10 overflow-hidden">
        
        <div className="max-w-5xl mx-auto px-6 mb-20 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl text-xl border border-blue-500/20">
            <FaChild />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">دعاء الصابرة</h2>
            <p className="text-blue-300/60 text-sm mt-1">محطات شكلت حكاية البطلة الصغيرة دعاء</p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto pr-10 pl-6 md:px-6 space-y-32">
          <div className="absolute right-4 md:right-1/2 top-4 bottom-4 w-[2px] bg-none border-r-2 border-dashed border-blue-500/30 transform md:translate-x-1/2"></div>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <section key={item.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                <div className="absolute right-[-31px] md:right-1/2 top-4 bg-[#0e1e2c] p-1 rounded-full border border-blue-900/60 transform md:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-[#0e1e2c] rounded-full border-2 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]"></div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full aspect-[4/3] group transition-transform duration-500 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-black/50 blur-[4px] translate-x-2 translate-y-2 pointer-events-none" style={{ clipPath: "url(#torn-paper-clip)" }}></div>
                    <div className="w-full h-full relative overflow-hidden" style={{ clipPath: "url(#torn-paper-clip)" }}>
                      <div className="absolute inset-0 z-20 pointer-events-none opacity-25 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/rough-paper.png')]"></div>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top relative z-10 contrast-[101%] brightness-[98%] group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-30 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 text-right">
                  <div className="flex items-center gap-3 mb-4 justify-start">
                    <span className="text-blue-400 text-lg">{item.icon}</span>
                    <span className="text-[11px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-md">{item.tag}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-6">{item.description}</p>
                </div>
              </section>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-32 border-t border-blue-950/40 pt-12 flex justify-center">

          <a 
            href="/cross-media/ghazal" 
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 group shadow-lg shadow-blue-600/10"
          >
            <div className="text-left">
              <span className="block text-[10px] text-blue-200/70 font-medium uppercase tracking-wider">القصة التالية</span>
              <span className="text-sm font-semibold">المحطة القادمة</span>
            </div>
            <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
          </a>

        </div>
      </main>

      <CrossmediaFooter/>

    </div>
  );
};

export default DoaaStory;