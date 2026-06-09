import React, { useState } from 'react';

const TechnologyIntegration = () => {
  // حالة لمتابعة المحور التفاعلي النشط
  const [activeFeature, setActiveFeature] = useState('vr');

  // أيقونات هندسية رسمية مطورة خالية تماماً من الإيموجيز
  const icons = {
    vr: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    apps: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    games: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
      </svg>
    ),
    zaafarana: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V1.5m0 18a3 3 0 100-6 3 3 0 000 6zM12 1.5a9.004 9.004 0 018.716 6.747M12 1.5a9.004 9.004 0 00-8.716 6.747M12 1.5V13.5" />
      </svg>
    )
  };

  const techFeatures = {
    vr: {
      title: "تقنيات الواقع الافتراضي",
      desc: "توظيف بيئات افتراضية متكاملة تجعل التاريخ أشد جذباً للأطفال، مما يتيح لهم معايشة الأحداث التاريخية بشكل تفاعلي يعزز استيعاب القيمة الإنسانية للحضارة.",
      image: "assets/crossmedia3/img1_sec6.png"
    },
    apps: {
      title: "التطبيقات الرقمية التفاعلية",
      desc: "تطوير واجهات ذكية ومنصات عرض متقدمة تعمل على ربط المقتنيات الأثرية بالبيانات التاريخية الموثقة، لتحقيق قنوات اتصال حديثة ومباشرة مع الشباب والأطفال.",
      image: "assets/crossmedia3/tot.png"
    },
    games: {
      title: "الألعاب التعليمية الرقمية",
      desc: "أدوات تفاعلية موجهة لفتح آفاق الخيال والإبداع لدى الطفل، وتقديم بديل معرفي رصين يحميه من المحتوى الرقمي المغترب السائد عبر منصات التواصل الاجتماعي.",
      image: "assets/crossmedia3/final_sec6.png"
    },
    zaafarana: {
      title: "نموذج متحف قصر الزعفران",
      desc: "تطبيق عملي ناجح للمتاحف الجامعية الحديثة بجامعة عين شمس؛ حقق التوازن الدقيق بين الحفاظ على الأصالة المعمارية الفريدة للقصر وتوظيف تقنيات العرض والرقمنة العصرية.",
      image: "assets/crossmedia3/zafranPalace.jpg"
    }
  };

  return (
    <section className="relative min-h-screen text-stone-100 pt-20 pb-52 md:pt-28 md:pb-64 px-4 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden bg-[#2d2219]">
      
      {/* حقن كود الحركة المدارية المخصصة لتعمل في أي بيئة React بسلاسة */}
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
          animation: museumOrbit 35s linear infinite;
        }
        .animate-museum-counter {
          animation: museumCounterOrbit 35s linear infinite;
        }
        .orbit-group:hover .animate-museum-orbit,
        .orbit-group:hover .animate-museum-counter {
          animation-play-state: paused;
        }
      `}</style>

      {/* التظليل الاحترافي لعمق اللون البني التراثي */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#201812] via-[#2d2219] to-[#1a140f] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#c5a88004_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: المحتوى المعرفي والفلسفي لغرس الوعي */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-right">
          <div className="flex items-center gap-3 justify-start">
            <span className="w-12 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-xs uppercase tracking-wider">الرقمنة وصون الهوية الوطنية</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#dfc5a3] leading-tight">
            غرس الوعي التراثي: <span className="text-stone-100 font-light">استثمار استراتيجي في حماية الهوية الثقافية</span>
          </h2>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
            حين يتعرف الطفل على إنجازات الحضارات السابقة، يدرك أن التقدم المعاصر ما هو إلا امتداد 
            <strong className="text-[#dfc5a3] font-medium"> لتراكم معرفي وثقافي طويل</strong>؛ وهو ما يعزز لديه احترام التاريخ، واستيعاب قيمة الحضارة الإنسانية. 
            ولكون الأجيال الجديدة هي المسؤولة عن صون هذا الموروث، فإن غرس الوعي التراثي مبكراً يمثل الركيزة الأساسية لحماية الهوية الوطنية، باعتبار التاريخ أداة لتحليل التجارب الإنسانية وفهمها، وليس مجرد سرد للأحداث.
          </p>

          {/* اقتباس تحليلي رسمي */}
          <div className="bg-[#1a130e]/80 border-r-4 border-[#c5a880] p-5 rounded-l-xl backdrop-blur-md shadow-xl">
            <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
              يدعو <strong className="text-[#dfc5a3] font-medium">الأستاذ الدكتور أحمد محمد حميدة</strong> إلى عدم الفصل بين التكنولوجيا والتراث؛ حيث تساهم التقنيات في فتح آفاق الخيال والإبداع لدى الطفل الذي يواجه تدفقاً هائلاً عبر منصات التواصل الاجتماعي يعكس أنماطاً ثقافية مغتربة عن بيئته ومجتمعه، مما يجعل الرقمنة الوطنية ضرورة ملحة.
            </p>
          </div>

          {/* متحف قصر الزعفران */}
          <div className="p-5 rounded-2xl bg-gradient-to-l from-[#1e1610]/50 to-transparent border border-[#c5a880]/10">
            <h4 className="text-[#dfc5a3] font-bold text-sm mb-2 flex items-center gap-2 justify-start">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] inline-block"></span>
              القيمة التاريخية والأصالة المعمارية:
            </h4>
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-justify font-light">
              يمثل <strong className="text-[#dfc5a3] font-medium">متحف قصر الزعفران</strong> بجامعة عين شمس نموذجاً بارزاً للمتاحف الجامعية الحديثة، حيث استطاع صون الهوية التاريخية والمعمارية الفريدة للقصر والمقتنيات الأثرية، بالتوازي مع ربطها بالتقنيات الرقمية المتطورة لتعزيز آليات العرض والتواصل المجتمعي الفعال مع الأطفال والشباب.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: منظومة الدوران المداري المستمر للأقمار المتحفية التفاعلية */}
        <div className="lg:col-span-6 w-full flex flex-col justify-center items-center gap-8 group orbit-group">
          
          <div className="relative w-80 h-80 md:w-[440px] md:h-[440px] flex items-center justify-center">
            
            {/* خطوط فنية تدور بالخلفية لتعزيز الإحساس بالحركة المعرفية */}
            <div className="absolute w-[78%] h-[78%] rounded-full border border-dashed border-[#c5a880]/20 pointer-events-none"></div>
            <div className="absolute w-56 h-56 md:w-72 md:h-72 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* المركز البصري الثابت (العين المتحفية الكبرى): تعرض الصورة بدون أي نصوص */}
            <div className="absolute w-44 h-44 md:w-60 md:h-60 rounded-full p-2 bg-[#1a130e] border-2 border-[#c5a880]/40 shadow-[0_0_60px_rgba(0,0,0,0.7)] z-30 overflow-hidden group/center">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src={techFeatures[activeFeature].image} 
                  alt="" 
                  className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover/center:scale-110"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_35px_rgba(0,0,0,0.85)]"></div>
              </div>
            </div>

            {/* الحاوية المدارية الدوارة (تجمع الأقمار الصناعية الأربعة وتدور بهم بزاوية 360 درجة) */}
            <div className="absolute w-full h-full rounded-full animate-museum-orbit pointer-events-none z-20">
              
              {/* القمر 1: الواقع الافتراضي (شمال المدار) */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('vr')}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border animate-museum-counter ${
                    activeFeature === 'vr' 
                      ? 'bg-[#c5a880] text-[#120d0a] border-[#c5a880] shadow-[0_0_25px_#c5a880] scale-110' 
                      : 'bg-[#1a130e] text-[#c5a880] border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                  title={techFeatures.vr.title}
                >
                  {icons.vr}
                </button>
              </div>

              {/* القمر 2: المنصات التفاعلية (شرق المدار) */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/3 -translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('apps')}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border animate-museum-counter ${
                    activeFeature === 'apps' 
                      ? 'bg-[#c5a880] text-[#120d0a] border-[#c5a880] shadow-[0_0_25px_#c5a880] scale-110' 
                      : 'bg-[#1a130e] text-[#c5a880] border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                  title={techFeatures.apps.title}
                >
                  {icons.apps}
                </button>
              </div>

              {/* القمر 3: الألعاب الرقمية (جنوب المدار) */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('games')}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border animate-museum-counter ${
                    activeFeature === 'games' 
                      ? 'bg-[#c5a880] text-[#120d0a] border-[#c5a880] shadow-[0_0_25px_#c5a880] scale-110' 
                      : 'bg-[#1a130e] text-[#c5a880] border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                  title={techFeatures.games.title}
                >
                  {icons.games}
                </button>
              </div>

              {/* القمر 4: متحف قصر الزعفران (غرب المدار) */}
              <div className="absolute left-0 top-1/2 transform -translate-x-1/3 -translate-y-1/2 pointer-events-auto">
                <button 
                  onClick={() => setActiveFeature('zaafarana')}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border animate-museum-counter ${
                    activeFeature === 'zaafarana' 
                      ? 'bg-[#c5a880] text-[#120d0a] border-[#c5a880] shadow-[0_0_25px_#c5a880] scale-110' 
                      : 'bg-[#1a130e] text-[#c5a880] border-[#c5a880]/30 hover:border-[#c5a880] hover:scale-105'
                  }`}
                  title={techFeatures.zaafarana.title}
                >
                  {icons.zaafarana}
                </button>
              </div>

            </div>

          </div>

          {/* بطاقة التعريف الديناميكية السفلية */}
          <div className="w-full max-w-[460px] bg-[#1a130e]/95 border border-[#c5a880]/25 p-5 rounded-2xl shadow-2xl text-center backdrop-blur-md transition-all duration-500 z-10 relative">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880]/70 block mb-1">المحور الرقمي المختار</span>
            <h3 className="text-[#dfc5a3] font-black text-base mb-2 transition-colors duration-300">
              {techFeatures[activeFeature].title}
            </h3>
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-center font-light">
              {techFeatures[activeFeature].desc}
            </p>
          </div>

        </div>

      </div>

      {/* الموجة الزخرفية المعمارية السفلية لمنع التداخل وحماية الهيكل */}
      <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
        <svg className="block w-full h-[80px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44C58.3,10.25,0,0,0,0V120H1200V0c0,0-93.34,58.09-256.88,58.09-110.78,0-203.88-39.79-321.73-39.79C487.2,18.3,432.49,75.24,321.39,56.44Z" fill="#1a130e" />
        </svg>
      </div>
    </section>
  );
};

export default TechnologyIntegration;