import React, { useState, useRef } from 'react';

const CurriculumAndHeritage = () => {
  const [scenography, setScenography] = useState({
    lighting: false,
    sound: false,
    decor: false
  });

  const boxRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 150, y: 100 });
  const [activeWorkshop, setActiveWorkshop] = useState(0);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left,
      y: e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top
    });
  };

  const toggleScenography = (element) => {
    setScenography(prev => ({ ...prev, [element]: !prev[element] }));
  };

  const isStoryComplete = scenography.lighting && scenography.sound && scenography.decor;

  const workshops = [
    {
      id: 0,
      icon: "🏺",
      title: "صناعة النماذج الأثرية",
      desc: "تحويل المواد إلى نماذج أثرية مصغرة يخلق علاقة مباشرة بين الطفل والتراث وعبقرية أجداده.",
      rotation: "-rotate-3",
      align: "self-start"
    },
    {
      id: 1,
      icon: "🎨",
      title: "الرسم الأثري",
      desc: "إعادة رسم النقوش والزخارف، لتدريب عين الطفل على تذوق الفن القديم واستيعاب تفاصيله.",
      rotation: "rotate-2",
      align: "self-center"
    },
    {
      id: 2,
      icon: "🧵",
      title: "تعليم الحرف التراثية",
      desc: "تعلم مبادئ الحرف اليدوية ليُدرك الطفل أن التراث مهارة حية تنتقل عبر الأجيال.",
      rotation: "-rotate-2",
      align: "self-end"
    }
  ];

  return (
    <section className="relative w-full bg-[#211b14] text-[#e5e5e5] py-24 px-6 md:px-12 font-serif dir-rtl selection:bg-[#d4b483] selection:text-black overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHBhdGggZD0iTTAgMGg4MHY4MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00MCA0MGw0MC00ME0wIDgwbDQwLTQwIiBzdHJva2U9IiNkNGI0ODMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-24">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#d4b483]"></span>
              <span className="text-[#d4b483] font-bold text-sm tracking-widest uppercase font-sans drop-shadow-md">
                الربط بالمناهج الدراسية
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-sans drop-shadow-lg">
              من رص القطع إلى <span className="text-[#d4b483]">صناعة القصة</span>
            </h2>

            <p className="text-gray-200 text-base md:text-lg leading-relaxed text-justify font-light">
              ويلفت بدوي إلى أن فلسفة العرض المتحفي المعاصر قد تجاوزت فكرة "رص القطع الأثرية" داخل واجهات زجاجية، لتنتقل إلى صناعة "قصة متحفية" تشتبك مع وجدان الزائر، وبخاصة الطفل. فالإضاءة المتناغمة، والمؤثرات الصوتية، والديكور (السينوغرافيا)، كلها عناصر تتكامل لتمنح الطفل تجربة بصرية حية ترسخ في ذاكرته هويته الوطنية.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light border-r-2 border-[#d4b483]/50 pr-4 bg-gradient-to-l from-[#d4b483]/5 to-transparent py-2">
              وفي هذا الصدد، يشدد الخبير الأثري على ضرورة دمج الأنشطة المتحفية بالمناهج التعليمية؛ مؤكداً أنه كلما تحول المتحف إلى مختبر معرفي مكمل للمدرسة، تضاعف أثره في بناء وعي الصغار.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-[#14100c]/80 backdrop-blur-md border border-[#d4b483]/30 p-2 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="border border-[#d4b483]/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                
                <div className="text-center mb-6 relative z-20">
                  <h3 className="text-xl font-bold text-[#d4b483] font-sans drop-shadow-md">مختبر السينوغرافيا الحية</h3>
                  <p className="text-xs text-gray-400 mt-1">حرك الماوس لاستكشاف القطعة، أو فعل أدوات العرض</p>
                </div>

                <div 
                  ref={boxRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleMouseMove}
                  className={`relative h-56 rounded-xl mb-8 flex items-center justify-center overflow-hidden transition-all duration-1000 cursor-crosshair border-2 ${
                    scenography.decor ? 'border-[#d4b483] bg-[#2a2118]' : 'border-white/5 bg-[#050403]'
                  }`}
                >
                  
                  {scenography.decor && (
                    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMCAyMGwyMC0yME0wIDQwbDIwLTIwIiBzdHJva2U9IiNkNGI0ODMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] transition-opacity duration-1000"></div>
                  )}

                  {!scenography.lighting && (
                    <div 
                      className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(5, 4, 3, 0.98) 100%)`
                      }}
                    ></div>
                  )}

                  <div className={`relative z-20 transition-all duration-1000 ease-out transform ${
                    isStoryComplete ? 'scale-125 -translate-y-2' : 'scale-100'
                  }`}>
                    
                    <div className="text-7xl md:text-8xl transition-all duration-500" style={{ 
                      filter: scenography.lighting ? 'drop-shadow(0px 10px 25px rgba(212, 180, 131, 0.6))' : 'brightness(0.3) grayscale(1)',
                    }}>
                      🏺
                    </div>

                    {scenography.sound && (
                      <>
                        <span className="absolute -top-2 -right-8 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎵</span>
                        <span className="absolute top-8 -left-8 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎶</span>
                      </>
                    )}
                  </div>

                  {isStoryComplete && (
                    <div className="absolute bottom-4 z-20 bg-black/80 backdrop-blur-sm border border-[#d4b483] px-6 py-1.5 rounded-full text-[#d4b483] text-xs font-bold tracking-widest animate-pulse shadow-[0_0_15px_rgba(212,180,131,0.5)]">
                      ✨ التجربة تنبض بالحياة ✨
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 relative z-20">
                  <button onClick={() => toggleScenography('lighting')} className={`flex-1 py-3 text-xs md:text-sm rounded-xl font-sans font-bold transition-all duration-300 shadow-lg ${scenography.lighting ? 'bg-[#d4b483] text-[#14100c] scale-105' : 'bg-black/60 border border-white/10 text-gray-400 hover:border-[#d4b483]/50 hover:text-[#d4b483]'}`}>
                    💡 الإضاءة
                  </button>
                  <button onClick={() => toggleScenography('sound')} className={`flex-1 py-3 text-xs md:text-sm rounded-xl font-sans font-bold transition-all duration-300 shadow-lg ${scenography.sound ? 'bg-[#d4b483] text-[#14100c] scale-105' : 'bg-black/60 border border-white/10 text-gray-400 hover:border-[#d4b483]/50 hover:text-[#d4b483]'}`}>
                    🔊 الصوت
                  </button>
                  <button onClick={() => toggleScenography('decor')} className={`flex-1 py-3 text-xs md:text-sm rounded-xl font-sans font-bold transition-all duration-300 shadow-lg ${scenography.decor ? 'bg-[#d4b483] text-[#14100c] scale-105' : 'bg-black/60 border border-white/10 text-gray-400 hover:border-[#d4b483]/50 hover:text-[#d4b483]'}`}>
                    🏛️ الديكور
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center mt-10">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4 relative py-6">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#d4b483]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {workshops.map((workshop) => (
              <div 
                key={workshop.id}
                onClick={() => setActiveWorkshop(workshop.id)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 flex items-start gap-5 w-full md:w-11/12 backdrop-blur-md shadow-2xl ${workshop.align} ${
                  activeWorkshop === workshop.id 
                    ? 'bg-[#1a1510]/90 border-[#d4b483] rotate-0 scale-105 z-20' 
                    : `bg-black/40 border-white/5 hover:border-[#d4b483]/30 ${workshop.rotation} opacity-80 hover:opacity-100 z-10`
                }`}
              >
                <div className={`text-4xl md:text-5xl transition-all duration-500 ${activeWorkshop === workshop.id ? 'opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(212,180,131,0.6)]' : 'opacity-60 grayscale brightness-75'}`}>
                  {workshop.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-sans font-bold text-base md:text-lg mb-2 transition-colors duration-300 ${activeWorkshop === workshop.id ? 'text-[#d4b483]' : 'text-gray-400'}`}>
                    {workshop.title}
                  </h4>
                  <div className={`transition-all duration-500 overflow-hidden ${activeWorkshop === workshop.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm md:text-base leading-relaxed font-light text-gray-200">
                      {workshop.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-[-10px]">
              <span className="w-10 h-[1px] bg-[#d4b483]"></span>
              <span className="text-[#d4b483] font-bold text-sm tracking-widest uppercase font-sans drop-shadow-md">
                احترام التراث
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-sans drop-shadow-lg">
              غرس الانتماء عبر <span className="text-[#d4b483]">المشاركة</span>
            </h2>
            
            <p className="text-gray-200 text-base md:text-xl leading-relaxed text-justify font-light">
              تسهم المتاحف في غرس قيم احترام التراث والمحافظة عليه لدى الأطفال، باعتباره جزءاً لا يتجزأ من الذاكرة الوطنية؛ فعندما يتعلم الطفل أن حماية الآثار والتراث مسؤولية جماعية، ينمو لديه شعورٌ حقيقي بالمواطنة والانتماء.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed text-justify font-light">
              فكثير من الأثرييين يرى أن المشاركة العملية داخل المتاحف تجعل الطفل أكثر ارتباطاً بثقافته الوطنية؛ إذ تسهم الورش التعليمية، مثل تعليم الحرف التراثية والرسم وصناعة النماذج الأثرية، في خلق علاقة مباشرة بين الطفل والتراث.
            </p>

            <div className="inline-flex items-center gap-3 mt-4 bg-gradient-to-r from-[#d4b483]/20 to-transparent border-r-4 border-[#d4b483] px-5 py-3 rounded-l-lg w-fit shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4b483] animate-ping"></span>
              <span className="text-[#d4b483] text-sm md:text-base font-sans font-bold tracking-wide">
                علاقة وجدانية مباشرة
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CurriculumAndHeritage;