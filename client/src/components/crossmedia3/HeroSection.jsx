import React, { useState } from 'react';

const HeroSection = () => {
  const [currentEra, setCurrentEra] = useState('past');

  const eraData = {
    past: {
      tag: "الماضي والجذور 📜",
      title: "رحلة استكشاف حية للتاريخ",
      text: "لم تعد زيارة الأطفال للمتاحف مجرد نزهة ترفيهية أو بند روتيني على الأجندة المدرسية؛ بل تحولت إلى رحلة استكشاف حية للتاريخ، تهدف إلى تعميق وعي الطفل بالمسار الحضاري لبلاده عبر العصور المختلفة، وتنشئته ليكون أكثر تفاعلاً وارتباطاً بقضايا مجتمعه ووطنه."
    },
    present: {
      tag: "الحاضر والهوية 🏺",
      title: "تعاقب حضاري فريد يثري الروح",
      text: "تسهم المتاحف -على تنوعها بين أثرية، تاريخية، عسكرية ودينية- في تشكيل هوية الطفل وإذكاء روح الانتماء داخله؛ فمصر التي تميزت بتعاقب حضاري فريد (فرعوني، يوناني، روماني، قبطي، وإسلامي) تمنح الطفل زاداً معرفياً ينمي لديه الفخر ويصون تراثه."
    },
    future: {
      tag: "المستقبل والتحول ⏳",
      title: "مدارس حية وحوار لا ينتهي",
      text: "لا يُنظر إلى المتاحف الآن بوصفها مجرد ساحات لعرض المقتنيات القديمة، بل بصفتها مدارس تثري الروح وتخلق حواراً ممتداً بين الماضي والحاضر والمستقبل. واليوم، تكثف الجهات الحكومية جهودها لتحديث هذه المنظومة عبر أدوات تفاعلية وخرائط عرض رقمية ومحتوى صوتي مجسم مواكبةً للثورة التكنولوجية."
    }
  };

  return (
    <section className="relative min-h-screen bg-[#f2e7d5] text-[#393e46] py-12 px-4 md:px-12 font-serif dir-rtl flex flex-col justify-between overflow-hidden border-b-4 border-[#d4b483]/3xl">
      
      {/* ملمس ورق البردي والخلفية المعتّقة */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#d4b483] opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#c16657] opacity-10 blur-3xl"></div>

      {/* الرأس: عنوان الجدارية التاريخية */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] w-12 bg-[#c16657]"></span>
          <span className="text-[#c16657] font-bold text-xs md:text-sm tracking-widest uppercase bg-[#c16657]/10 px-3 py-1 rounded-full border border-[#c16657]/20">
            وثيقة استكشافية تفاعلية
          </span>
          <span className="h-[1px] w-12 bg-[#c16657]"></span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b2b2b] leading-tight font-sans tracking-tight">
          زيارة المتاحف: <span className="text-[#c16657]">رحلة في بناء وعي الطفل</span> وتأصيل هويته
        </h1>
        
        <div className="mt-4 w-24 h-[3px] bg-[#d4b483] mx-auto rounded-full"></div>
      </div>

      {/* اللوحة المركزية: المخطوطة المفتوحة */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-8 bg-[#faf5ed] border-2 border-[#e6d5b8] p-6 md:p-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(212,180,131,0.3)]">
        
        {/* زخرفة زوايا المخطوطة القديمة */}
        <div className="absolute top-2 right-2 text-xl text-[#d4b483]/60 font-sans">♦</div>
        <div className="absolute top-2 left-2 text-xl text-[#d4b483]/60 font-sans">♦</div>
        <div className="absolute bottom-2 right-2 text-xl text-[#d4b483]/60 font-sans">♦</div>
        <div className="absolute bottom-2 left-2 text-xl text-[#d4b483]/60 font-sans">♦</div>

        {/* عرض المحتوى الأثري المتبدل بسلاسة الحبر */}
        <div className="min-h-[220px] flex flex-col justify-between transition-all duration-500">
          <div>
            <span className="text-xs font-bold text-[#c16657] bg-[#c16657]/5 px-2.5 py-1 rounded-md border border-[#c16657]/10 inline-block mb-3">
              {eraData[currentEra].tag}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4">
              {eraData[currentEra].title}
            </h3>
            <p className="text-[#4a4a4a] text-base md:text-lg leading-loose text-justify font-normal font-serif">
              {eraData[currentEra].text}
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#e6d5b8] text-[11px] text-[#8a8a8a] italic flex justify-between items-center">
            <span>* اقرأ سطور الوثيقة عبر التنقل في الشريط أدناه</span>
            <span className="font-sans font-bold text-[#d4b483]">قصر الزعفران</span>
          </div>
        </div>
      </div>

      {/* الـ Scrollytelling / الخط الزمني المصمم كشريط بردي تقليدي */}
      <div className="relative z-10 max-w-xl mx-auto w-full pb-6">
        <div className="flex items-center justify-between relative before:absolute before:h-[2px] before:w-full before:bg-[#e6d5b8] before:top-1/2 before:transform before:-translate-y-1/2 before:z-0">
          
          <button 
            onClick={() => setCurrentEra('past')}
            className={`relative z-10 px-4 py-2 text-xs md:text-sm font-bold rounded-md transition-all duration-350 border ${
              currentEra === 'past' 
                ? 'bg-[#c16657] text-white border-[#c16657] shadow-md scale-105' 
                : 'bg-[#faf5ed] text-[#6a6a6a] border-[#e6d5b8] hover:bg-[#f5ebd5]'
            }`}
          >
            📜 بوابات الماضي
          </button>

          <button 
            onClick={() => setCurrentEra('present')}
            className={`relative z-10 px-4 py-2 text-xs md:text-sm font-bold rounded-md transition-all duration-350 border ${
              currentEra === 'present' 
                ? 'bg-[#c16657] text-white border-[#c16657] shadow-md scale-105' 
                : 'bg-[#faf5ed] text-[#6a6a6a] border-[#e6d5b8] hover:bg-[#f5ebd5]'
            }`}
          >
            🏺 حوار الهوية
          </button>

          <button 
            onClick={() => setCurrentEra('future')}
            className={`relative z-10 px-4 py-2 text-xs md:text-sm font-bold rounded-md transition-all duration-350 border ${
              currentEra === 'future' 
                ? 'bg-[#c16657] text-white border-[#c16657] shadow-md scale-105' 
                : 'bg-[#faf5ed] text-[#6a6a6a] border-[#e6d5b8] hover:bg-[#f5ebd5]'
            }`}
          >
            ⏳ أفق المستقبل
          </button>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;