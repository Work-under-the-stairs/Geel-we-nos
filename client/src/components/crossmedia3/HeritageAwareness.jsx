import React, { useState } from 'react';

const HeritageAwareness = () => {
  const [activeFeature, setActiveFeature] = useState('vr');

  const techFeatures = {
    vr: {
      image: "assets/crossmedia3/img1_sec6.png"
    },
    apps: {
      image: "assets/crossmedia3/tot.png"
    },
    games: {
      image: "assets/crossmedia3/final_sec6.png"
    },
    zaafarana: {
      image: "assets/crossmedia3/tech.png"
    }
  };

  return (
    <section className="relative min-h-screen text-stone-100 pt-20 pb-20 md:pt-28 md:pb-28 px-4 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden bg-[#2d2219]">
      
      {/* دمج حركات الدوران المداري العكسي للحفاظ على اعتدال الصور أثناء الدوران */}
      <style>{`
        @keyframes museumOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes museumCounterOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-museum-orbit {
          animation: museumOrbit 40s linear infinite;
        }
        .animate-museum-counter {
          animation: museumCounterOrbit 40s linear infinite;
        }
        .orbit-group:hover .animate-museum-orbit,
        .orbit-group:hover .animate-museum-counter {
          animation-play-state: paused;
        }
      `}</style>

      {/* الخلفية التراثية المتدرجة */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#201812] via-[#2d2219] to-[#1a140f] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#c5a88004_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: المحتوى المعرفي (غرس الوعي التراثي) */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-right">
          <div className="flex items-center gap-3 justify-start">
            <span className="w-12 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-xs uppercase tracking-wider">الهوية والوعي المعرفي</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#dfc5a3] leading-tight">
            غرس الوعي التراثي
          </h2>

          {/* الفقرة الأولى */}
          <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
            فحين يتعرف الطفل على إنجازات الحضارات السابقة، يدرك أن التقدم الذي يعيشه اليوم ما هو إلا امتداد 
            <strong className="text-[#dfc5a3] font-medium"> لتراكم معرفي وثقافي طويل</strong>؛ وهو ما يعزز لديه احترام التاريخ، واستيعاب قيمة الحضارة الإنسانية.
          </p>

          {/* الفقرة الثانية */}
          <div className="bg-[#1a130e]/80 border-r-4 border-[#c5a880] p-5 rounded-l-xl backdrop-blur-md shadow-xl">
            <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
              ولأن الأجيال الجديدة هي المسؤولة عن الحفاظ على هذا التراث، فإن عدم ارتباط الطفل بجذوره منذ الصغر قد يفقده وعيه بقيمتها مع مرور الزمن. ومن هذا المنطلق، يرى <strong className="text-[#dfc5a3] font-medium">حميدة</strong> أن غرس الوعي التراثي مبكراً يمثل استثماراً حقيقياً في حماية الهوية الثقافية، باعتبار أن التاريخ ليس مجرد سرد للأحداث، بل وسيلة لفهم التجارب الإنسانية وتحليلها.
            </p>
          </div>

          {/* الفقرة الثالثة */}
          <div className="p-5 rounded-2xl bg-gradient-to-l from-[#1e1610]/50 to-transparent border border-[#c5a880]/10">
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-justify font-light">
              كما أن التراث، بما يحتويه من قصص وفنون وعمارة وأساطير، يفتح آفاق الخيال والإبداع لدى الطفل، الذي بات يتعرض لكم هائل من المحتوى عبر منصات التواصل الاجتماعي، يعكس في أغلبه أنماطاً ثقافية بعيدة كلياً عن بيئته ومجتمعه.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: المنظومة المدارية الصافية (صور فقط بدون أي نصوص توضيحية) */}
        <div className="lg:col-span-6 w-full flex justify-center items-center group orbit-group">
          
          <div className="relative w-80 h-80 md:w-[460px] md:h-[460px] flex items-center justify-center">
            
            {/* المسار الدائري الوهمي */}
            <div className="absolute w-[80%] h-[80%] rounded-full border-2 border-dashed border-[#c5a880]/20 pointer-events-none"></div>
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* الدائرة المركزية الكبرى (تعرض الصورة النشطة) */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-[#1a130e] border-4 border-[#c5a880] shadow-[0_0_50px_rgba(0,0,0,0.85)] z-30 overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src={techFeatures[activeFeature].image} 
                  alt="" 
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
              </div>
            </div>

            {/* النطاق المداري الخارجي الحاضن لدوائر الصور المتحركة */}
            <div className="absolute w-full h-full rounded-full animate-museum-orbit pointer-events-none z-20">
              
              {/* دائرة الصورة الأولى (أعلى) */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('vr')}
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-1 bg-[#1a130e] transition-all duration-500 border-2 animate-museum-counter ${
                    activeFeature === 'vr' 
                      ? 'border-[#c5a880] scale-110 shadow-[0_0_25px_#c5a880]' 
                      : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                >
                  <img src={techFeatures.vr.image} alt="" className="w-full h-full object-cover rounded-full" />
                </button>
              </div>

              {/* دائرة الصورة الثانية (يمين) */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('apps')}
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-1 bg-[#1a130e] transition-all duration-500 border-2 animate-museum-counter ${
                    activeFeature === 'apps' 
                      ? 'border-[#c5a880] scale-110 shadow-[0_0_25px_#c5a880]' 
                      : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                >
                  <img src={techFeatures.apps.image} alt="" className="w-full h-full object-cover rounded-full" />
                </button>
              </div>

              {/* دائرة الصورة الثالثة (أسفل) */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('games')}
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-1 bg-[#1a130e] transition-all duration-500 border-2 animate-museum-counter ${
                    activeFeature === 'games' 
                      ? 'border-[#c5a880] scale-110 shadow-[0_0_25px_#c5a880]' 
                      : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                >
                  <img src={techFeatures.games.image} alt="" className="w-full h-full object-cover rounded-full" />
                </button>
              </div>

              {/* دائرة الصورة الرابعة (يسار) */}
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('zaafarana')}
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-1 bg-[#1a130e] transition-all duration-500 border-2 animate-museum-counter ${
                    activeFeature === 'zaafarana' 
                      ? 'border-[#c5a880] scale-110 shadow-[0_0_25px_#c5a880]' 
                      : 'border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                >
                  <img src={techFeatures.zaafarana.image} alt="" className="w-full h-full object-cover rounded-full" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeritageAwareness;