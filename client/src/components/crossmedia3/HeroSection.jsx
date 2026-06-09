import React, { useState } from 'react';

const HeroSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const floatingArtifacts = [
    {
      id: 1,
      era: "فرعوني",
      name: "قناع توت عنخ آمون الذهبي",
      image: "/assets/crossmedia3/pharaoh-mask.png",
      positionClass: "top-[5%] left-[5%] md:left-[10%]",
      animationClass: "animate-bounce",
      tiltClass: "rotate-6 md:rotate-[12deg]",
      style: { animationDuration: '6s' }
    },
    {
      id: 2,
      era: "يوناني",
      name: "تمثال الإسكندر الأكبر الرخامي",
      image: "/assets/crossmedia3/greek-statue.png",
      positionClass: "top-[28%] right-[5%] md:right-[8%]",
      animationClass: "animate-pulse",
      tiltClass: "-rotate-6 md:-rotate-[15deg]",
      style: { animationDuration: '4s' }
    },
    {
      id: 3,
      era: "روماني",
      name: "عملة رومانية أثرية ذهبية",
      image: "/assets/crossmedia3/roman-coin.png",
      positionClass: "top-[60%] left-[8%] md:left-[12%]",
      animationClass: "animate-bounce",
      tiltClass: "rotate-6 md:rotate-[10deg]",
      style: { animationDuration: '8s' }
    },
    {
      id: 4,
      era: "إسلامي",
      name: "مشكاة السلطان حسن",
      image: "/assets/crossmedia3/islamic-lamp.png",
      positionClass: "top-[85%] right-[8%] md:right-[12%]",
      animationClass: "animate-pulse",
      tiltClass: "-rotate-6 md:-rotate-[12deg]",
      style: { animationDuration: '5s' }
    },
    // {
    //   id: 5,
    //   era: "إسلامي",
    //   name: "مشكاة زجاجية مموهة بالمينا",
    //   image: "/assets/crossmedia3/islamic-lamp.png",
    //   positionClass: "bottom-[2%] left-[15%]",
    //   animationClass: "animate-bounce",
    //   tiltClass: "rotate-6 md:rotate-[10deg]",
    //   style: { animationDuration: '7s' }
    // }
  ];

  const renderArtifact = (artifact, isMobile) => {
    if (!artifact) return null;
    return (
      <div
        key={artifact.id + (isMobile ? '-mobile' : '-desktop')}
        className={`${
          isMobile 
            ? 'relative flex md:hidden justify-center items-center my-2 z-20 w-full' 
            : `hidden md:block absolute ${artifact.positionClass} z-20`
        } ${artifact.animationClass} pointer-events-auto group cursor-pointer`}
        style={artifact.style}
        onMouseEnter={() => setHoveredItem(artifact.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className={`transform ${artifact.tiltClass} transition-transform duration-300 group-hover:scale-110`}>
          <img 
            src={artifact.image} 
            alt={artifact.name}
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className={`absolute ${isMobile ? 'bottom-full mb-2' : 'bottom-full mb-3'} left-1/2 transform -translate-x-1/2 w-64 bg-[#1a130e]/95 border border-[#d4b483]/50 p-4 rounded-xl text-center backdrop-blur-md transition-all duration-300 z-30 ${
          hoveredItem === artifact.id ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-2 scale-95'
        }`}>
          <span className="text-sm md:text-base font-bold text-[#d4b483] block uppercase mb-1 tracking-wider">العصر {artifact.era}</span>
          <p className="text-white text-base md:text-lg font-light leading-normal">{artifact.name}</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#1a130e] border-r border-b border-[#d4b483]/50 rotate-45"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full bg-[#48392a] text-[#e5e5e5] font-serif dir-rtl overflow-hidden selection:bg-[#d4b483] selection:text-black">
      
      <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
        <img 
          src="/assets/crossmedia3/herobg2.png" 
          alt="خلفية المتاحف" 
          className="w-full h-auto opacity-40 block" 
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#48392a] to-transparent"></div>
      </div>

      <section className="relative z-10 min-h-[60vh] md:min-h-screen w-full flex flex-col justify-start pt-32 md:justify-center md:pt-0 items-center px-6 text-center">
        
        {/* <span className="text-[#d4b483] text-xs md:text-sm font-bold tracking-widest uppercase bg-[#2a2118]/60 px-5 py-2 rounded-full border border-[#d4b483]/30 backdrop-blur-md inline-block mb-6 shadow-xl">
          لوحة الكروس ميديا التفاعلية
        </span> */}
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight font-sans max-w-5xl"
          style={{ textShadow: '0px 4px 20px rgba(0, 0, 0, 0.9), 0px 1px 5px rgba(0, 0, 0, 0.8)' }}
        >
          زيارة المتاحف: <span className="text-[#d4b483]">رحلة في بناء وعي الطفل</span> وتأصيل هويته
        </h1>
        
        <div className="mt-8 w-24 h-[3px] bg-[#d4b483] mx-auto rounded-full shadow-[0_0_15px_rgba(212,180,131,0.8)]"></div>

        {/* <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray-300 font-sans tracking-wider uppercase drop-shadow-md">
            اسحبي لأسفل للاستكشاف
          </span>
          <svg className="w-5 h-5 text-[#d4b483] drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div> */}
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-10 flex flex-col gap-6 md:gap-16 mt-6 md:mt-16">
        
        <div className="w-full md:w-3/5 md:self-start bg-[#2a2118]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#2a2118]/80">
          <p className="text-gray-200 text-base md:text-xl leading-relaxed text-justify font-light">
            لم تعد زيارة الأطفال للمتاحف مجرد نزهة ترفيهية أو بند روتيني على الأجندة المدرسية السنوية؛ بل تحولت في الآونة الأخيرة إلى رحلة استكشاف حية للتاريخ، تهدف إلى تعميق وعي الطفل بالمسار الحضاري لبلاده عبر العصور المختلفة، وتنشئته ليكون أكثر تفاعلاً وارتباطاً بقضايا مجتمعه ووطنه.
          </p>
        </div>

        {renderArtifact(floatingArtifacts[0], true)}

        <div className="w-full md:w-3/5 md:self-end bg-[#2a2118]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#2a2118]/80">
          <p className="text-gray-200 text-base md:text-xl leading-relaxed text-justify font-light">
            تسهم المتاحف -على تنوعها واختلافها بين أثرية وتاريخية وعسكرية ودينية وعلمية وفنية وزراعية- في تشكيل هوية الطفل وإذكاء روح الانتماء داخله، فضلاً عن تعريفه بتاريخ وحضارة بلده؛ فمصر التي تميزت بتعاقب حضاري فريد، يشمل العصور الفرعونية واليونانية والرومانية والقبطية والإسلامية، تمنح الطفل زاداً معرفياً ينمي لديه مشاعر الفخر، ويعزز وعيه بضرورة صون التراث.
          </p>
        </div>

        {renderArtifact(floatingArtifacts[1], true)}

        <div className="w-full md:w-3/5 md:self-start bg-[#2a2118]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#2a2118]/80">
          <p className="text-gray-200 text-base md:text-xl leading-relaxed text-justify font-light">
            لا يُنظر إلى المتاحف الآن بوصفها مجرد ساحات لعرض المقتنيات القديمة، بل بصفتها مدارس تثري الروح، وتخلق حواراً ممتداً بين الماضي والحاضر والمستقبل. فعندما يقف الطفل على تفاصيل حياة أجداده، ويرى كيف تطورت العلوم والفنون والعادات في وطنه عبر القرون؛ يتولد لديه استيعاب عميق لمفهوم الحضارة واستمراريتها، ويزداد اعتزازاً بالانتماء إليها.
          </p>
        </div>

        {renderArtifact(floatingArtifacts[2], true)}

        <div className="w-full md:w-3/5 md:self-end bg-[#2a2118]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#d4b483]/40 hover:bg-[#2a2118]/80">
          <p className="text-gray-200 text-base md:text-xl leading-relaxed text-justify font-light">
            من جانبها، تكثف الجهات الحكومية والوزارات المعنية جهودها لتحديث منظومة تشغيل المتاحف مواكبةً للثورة التكنولوجية؛ إذ تبنت تقنيات متطورة تهدف إلى إثراء تجربة الزوار المعرفية والتوثيقية، عبر توظيف أدوات التكنولوجيا التفاعلية كخرائط العرض الرقمي، وأنظمة تحويل النصوص المكتوبة إلى محتوى صوتي مجسم.
          </p>
        </div>

        {renderArtifact(floatingArtifacts[3], true)}

        <div className="absolute inset-0 pointer-events-none hidden md:block z-20">
          {floatingArtifacts.map((artifact) => renderArtifact(artifact, false))}
        </div>

      </section>
      
      <div className="h-16 md:h-20"></div>
    </div>
  );
};

export default HeroSection;