import React, { useState } from 'react';

const HeroSection = () => {
  // حالة لمتابعة المحطة النشطة التي يقرأها المستخدم
  const [activeTab, setActiveTab] = useState(0);

  // تقسيم النص الأصلي إلى قصة تفاعلية من 3 محطات
  const storySteps = [
    {
      title: "الرحلة الحية",
      subtitle: "أكثر من مجرد نزهة ترفيهية",
      content: "لم تعد زيارة الأطفال للمتاحف مجرد بند روتيني على الأجندة المدرسية السنوية؛ بل تحولت إلى رحلة استكشاف حية للتاريخ، تهدف إلى تعميق وعي الطفل بالمسار الحضاري لبلاده عبر العصور المختلفة، وتنشئته ليكون أكثر تفاعلاً وارتباطاً بقضايا مجتمعه ووطنه."
    },
    {
      title: "التعاقب الفريد",
      subtitle: "زاد معرفي ينمي الفخر",
      content: "تسهم المتاحف -على تنوعها واختلافها بين أثرية وتاريخية وعسكرية ودينية وعلمية وفنية وزراعية- في تشكيل هوية الطفل وإذكاء روح الانتماء داخله. فمصر التي تميزت بتعاقب حضاري فريد (فرعوني، يوناني، روماني، قبطي، إسلامي) تمنح الطفل زاداً يعزز وعيه بصون التراث."
    },
    {
      title: "حوار الأجيال",
      subtitle: "مدارس تثري الروح",
      content: "لا يُنظر إلى المتاحف الآن كساحات للمقتنيات القديمة، بل بصفتها مدارس تخلق حواراً ممتداً بين الماضي والحاضر والمستقبل. فعندما يقف الطفل على تفاصيل حياة أجداده، يتولد لديه استيعاب عميق لمفهوم الحضارة واستمراريتها."
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#111827] text-white overflow-hidden font-sans dir-rtl flex flex-col justify-between p-6 md:p-12">
      
      {/* عناصر فنية في الخلفية (أثير التاريخ) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-50 animate-bounce" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* الرأس الشاعري للمقدمة */}
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-8">
        <span className="text-amber-400 text-sm md:text-base font-bold tracking-widest uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/25 backdrop-blur-sm">
          بوابة الكروس ميديا التفاعلية
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100 leading-tight drop-shadow-sm">
          زيارة المتاحف: رحلة في بناء وعي الطفل وتأصيل هويته
        </h1>
        <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          تكنولوجيا العرض الرقمي والمحتوى المجسم تعيد صياغة علاقة أطفالنا بجذورهم الحضارية.
        </p>
      </div>

      {/* اللوحة التفاعلية في المنتصف */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full my-8">
        
        {/* الجانب الأيمن: أزرار التحكم اللمسية (الخط الزمني للحضارات) */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 justify-center w-full">
          {storySteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-full text-right p-4 rounded-xl transition-all duration-500 border backdrop-blur-md flex flex-col gap-1 ${
                activeTab === index
                  ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] translate-x-[-4px]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className={`text-xs font-bold ${activeTab === index ? 'text-amber-400' : 'text-gray-400'}`}>
                المحطة 0{index + 1}
              </span>
              <span className="font-bold text-base md:text-lg text-gray-100">{step.title}</span>
              <span className="text-xs text-gray-400 hidden md:inline">{step.subtitle}</span>
            </button>
          ))}
        </div>

        {/* الجانب الأيسر: شاشة العرض الديناميكية (اللوحة الحية) */}
        <div className="lg:col-span-8 bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-lg min-h-[300px] flex flex-col justify-between shadow-2xl relative">
          {/* تأثير بصري يحاكي زجاج المتحف المضيء */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          
          <div className="transition-all duration-500 transform translate-y-0 opacity-100">
            <span className="text-xs font-semibold text-cyan-400 tracking-wider block mb-2">
              ✦ {storySteps[activeTab].subtitle}
            </span>
            <p className="text-gray-200 text-base md:text-lg leading-loose text-justify font-light">
              {storySteps[activeTab].content}
            </p>
          </div>

          {/* تذييل تفاعلي يوضح دمج التكنولوجيا */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>مدعوم بتقنيات العرض الرقمي الحديثة</span>
            </div>
            <div className="text-amber-300 font-mono">
              {activeTab + 1} / {storySteps.length}
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر التمرير للأسفل (Scroll Indicator) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pb-4 animate-bounce mt-4">
        <span className="text-xs text-gray-400 mb-2">انزل لتدخل قصر الزعفران</span>
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;