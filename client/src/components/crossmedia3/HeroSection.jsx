import React, { useState } from 'react';

const HeroSection = () => {
  // حالة لمتابعة العنصر اللي عليه هوفر ومكان ظهور النص المنبثق
  const [hoveredItem, setHoveredItem] = useState(null);

  // قائمة العناصر الأثرية الطايرة (تقدري تعدلي اللينكات والكلام براحتك)
  const floatingArtifacts = [
    {
      id: 1,
      era: "فرعوني",
      name: "قناع توت عنخ آمون الذهبي",
      image: "/images/pharaoh-mask.png", // حطي مسار الصورة بدون خلفية هنا
      positionClass: "top-[15%] left-[5%] md:left-[10%]", // مكانها حوالين البراجراف الأول
      animationClass: "animate-bounce",
      style: { animationDuration: '6s' }
    },
    {
      id: 2,
      era: "يوناني",
      name: "تمثال الإسكندر الأكبر الرخامي",
      image: "/images/greek-statue.png",
      positionClass: "top-[32%] right-[5%] md:right-[8%]", // مكانها حوالين البراجراف الثاني
      animationClass: "animate-pulse",
      style: { animationDuration: '4s' }
    },
    {
      id: 3,
      era: "روماني",
      name: "عملة رومانية أثرية ذهبية",
      image: "/images/roman-coin.png",
      positionClass: "top-[50%] left-[8%] md:left-[12%]", // مكانها حوالين البراجراف الثالث
      animationClass: "animate-bounce",
      style: { animationDuration: '8s' }
    },
    {
      id: 4,
      era: "قبطي",
      name: "أيقونة قبطية خشبية أثرية",
      image: "/images/coptic-icon.png",
      positionClass: "top-[68%] right-[8%] md:right-[12%]", // مكانها حوالين البراجراف الرابع
      animationClass: "animate-pulse",
      style: { animationDuration: '5s' }
    },
    {
      id: 5,
      era: "إسلامي",
      name: "مشكاة زجاجية مموهة بالمينا",
      image: "/images/islamic-lamp.png",
      positionClass: "bottom-[5%] left-[15%]", // طايرة في النهاية
      animationClass: "animate-bounce",
      style: { animationDuration: '7s' }
    }
  ];

  return (
    // الخلفية كاملة بلون موحد يطابق نهاية صورتك الرئيسية (مثلاً الأسود الرخامي الداكن)
    <section className="relative min-h-screen bg-[#0d0d0d] text-[#e5e5e5] font-serif dir-rtl overflow-hidden pb-20">
      
      {/* 1. جزء الهيدر والصورة الرئيسية */}
      <div 
        className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/images/hero-museum-banner.jpg')" }} // حطي باث صورتك الرئيسية هنا
      >
        {/* طبقة تظليل ناعمة تمزج الصورة باللون الموحد اللي تحتها */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/40 to-[#0d0d0d]"></div>
        
        {/* العنوان فوق الصورة */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-black text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-sans">
            زيارة المتاحف: <span className="text-[#d4b483]">رحلة في بناء وعي الطفل</span> وتأصيل هويته
          </h1>
          <p className="mt-4 text-gray-300 text-sm md:text-lg max-w-xl mx-auto drop-shadow-md">
            مخطوطة تفاعلية تستكشف المسار الحضاري لأجيال الغد
          </p>
        </div>
      </div>

      {/* 2. جزء المحتوى والعناصر الطايرة المتفاعلة */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 mt-12 flex flex-col gap-16 md:gap-24">
        
        {/* البراجراف الأول: يمين */}
        <div className="w-full md:w-3/5 md:self-start bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-xl transition-all hover:border-[#d4b483]/3xl">
          <p className="text-gray-300 text-base md:text-xl leading-relaxed text-justify font-light">
            لم تعد زيارة الأطفال للمتاحف مجرد نزهة ترفيهية أو بند روتيني على الأجندة المدرسية السنوية؛ بل تحولت في الآونة الأخيرة إلى رحلة استكشاف حية للتاريخ، تهدف إلى تعميق وعي الطفل بالمسار الحضاري لبلاده عبر العصور المختلفة، وتنشئته ليكون أكثر تفاعلاً وارتباطاً بقضايا مجتمعه ووطنه.
          </p>
        </div>

        {/* البراجراف الثاني: شمال */}
        <div className="w-full md:w-3/5 md:self-end bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-xl transition-all hover:border-[#d4b483]/3xl">
          <p className="text-gray-300 text-base md:text-xl leading-relaxed text-justify font-light">
            تسهم المتاحف -على تنوعها واختلافها بين أثرية وتاريخية وعسكرية ودينية وعلمية وفنية وزراعية- في تشكيل هوية الطفل وإذكاء روح الانتماء داخله، فضلاً عن تعريفه بتاريخ وحضارة بلده؛ فمصر التي تميزت بتعاقب حضاري فريد، يشمل العصور الفرعونية واليونانية والرومانية والقبطية والإسلامية، تمنح الطفل زاداً معرفياً ينمي لديه مشاعر الفخر، ويعزز وعيه بضرورة صون التراث.
          </p>
        </div>

        {/* البراجراف الثالث: يمين */}
        <div className="w-full md:w-3/5 md:self-start bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-xl transition-all hover:border-[#d4b483]/3xl">
          <p className="text-gray-300 text-base md:text-xl leading-relaxed text-justify font-light">
            لا يُنظر إلى المتاحف الآن بوصفها مجرد ساحات لعرض المقتنيات القديمة, بل بصفتها مدارس تثري الروح، وتخلق حواراً ممتداً بين الماضي والحاضر والمستقبل. فعندما يقف الطفل على تفاصيل حياة أجداده، ويرى كيف تطورت العلوم والفنون والعادات في وطنه عبر القرون؛ يتولد لديه استيعاب عميق لمفهوم الحضارة واستمراريتها، ويزداد اعتزازاً بالانتماء إليها.
          </p>
        </div>

        {/* البراجراف الرابع: شمال */}
        <div className="w-full md:w-3/5 md:self-end bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-xl transition-all hover:border-[#d4b483]/3xl">
          <p className="text-gray-300 text-base md:text-xl leading-relaxed text-justify font-light">
            من جانبها، تكثف الجهات الحكومية والوزارات المعنية جهودها لتحديث منظومة تشغيل المتاحف مواكبةً للثورة التكنولوجية؛ إذ تبنت تقنيات متطورة تهدف إلى إثراء تجربة الزوار المعرفية والتوثيقية، عبر توظيف أدوات التكنولوجيا التفاعلية كخرائط العرض الرقمي، وأنظمة تحويل النصوص المكتوبة إلى محتوى صوتي مجسم.
          </p>
        </div>

      </div>

      {/* 3. طبقة الأثر والعناصر الطايرة (تظهر بشكل مطلق فوق السكشن بالكامل) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {floatingArtifacts.map((artifact) => (
          <div
            key={artifact.id}
            className={`absolute ${artifact.positionClass} ${artifact.animationClass} pointer-events-auto group cursor-pointer`}
            style={artifact.style}
            onMouseEnter={() => setHoveredItem(artifact.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* صورة العنصر الأثري */}
            <img 
              src={artifact.image} 
              alt={artifact.name}
              className="w-16 h-16 md:w-28 md:h-28 object-contain drop-shadow-[0_10px_15px_rgba(212,180,131,0.3)] transition-transform duration-300 group-hover:scale-110"
            />

            {/* الكلام اللي هيظهر فوق العنصر لما نعمل هوفر (Tool-tip فني) */}
            <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 border border-[#d4b483]/60 p-2.5 rounded-lg text-center backdrop-blur-md transition-all duration-300 ${
              hoveredItem === artifact.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
            }`}>
              <span className="text-[10px] font-bold text-[#d4b483] block uppercase mb-0.5">العصر {artifact.era}</span>
              <p className="text-white text-xs font-light">{artifact.name}</p>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-[#d4b483]/60 rotate-45"></div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HeroSection;