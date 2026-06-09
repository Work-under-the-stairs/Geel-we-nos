import React, { useState } from 'react';

const NationalIdentity = () => {
  const [activeTab, setActiveTab] = useState('build');

  const palaceDetails = {
    build: {
      icon: "🏛️",
      title: "التشييد العريق",
      text: "يمثل قصر الزعفران العريق، الذي يشغل اليوم مقر إدارة جامعة عين شمس بالقاهرة، شاهداً حياً على تاريخ مصر الحديث، حيث يعود تاريخ تشييده إلى عامي 1901-1902.",
      bgImage: "/assets/crossmedia3/Zafaran_palace.jpg"
    },
    name: {
      icon: "🌸",
      title: "عبير الزعفران",
      text: "أما سر تسميته، فيرجع إلى حدائق الزعفران الشاسعة التي كانت تحيط به من كل جانب، وتعطّر أجواء المنطقة برائحتها الذكية والفريدة.",
      bgImage: "/assets/crossmedia3/palace-saffron.jpg"
    },
    treaty: {
      icon: "📜",
      title: "معاهدة 1936",
      text: "لم يكن مجرد تحفة معمارية، بل احتضنت قاعات القصر التاريخي توقيع معاهدة 1936 الشهيرة بين مصر وبريطانيا، ليحفر اسمه في ذاكرة الوطن السياسية.",
      bgImage: "/assets/crossmedia3/palace-treaty.jpg"
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#0a0806] text-[#e5e5e5] py-20 px-6 md:px-12 font-serif dir-rtl selection:bg-[#d4b483] selection:text-black overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 z-0 bg-[#0a0806]">
        {Object.keys(palaceDetails).map((key) => (
          <img
            key={key}
            src={palaceDetails[key].bgImage}
            alt={palaceDetails[key].title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeTab === key ? 'opacity-90' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#211b14] via-[#211b14]/70 to-[#211b14]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
        
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#d4b483]"></span>
            <span className="text-[#d4b483] font-bold text-sm tracking-widest uppercase font-sans">
              المحور الأول
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-sans drop-shadow-lg">
            تعزيز الهوية <span className="text-[#d4b483]">الوطنية</span>
          </h2>

          <div className="relative bg-[#14100c]/80 backdrop-blur-md border-r-4 border-[#d4b483] p-6 md:p-8 rounded-l-xl shadow-2xl mt-4">
            <span className="absolute -top-6 right-4 text-7xl text-[#d4b483]/30 font-sans">“</span>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed text-justify font-light relative z-10">
              يؤكد <strong className="text-[#d4b483] font-normal">الدكتور ولاء الدين بدوي</strong>، خبير المتاحف والتراث ومدير متحف الآثار بقصر الزعفران، أن المتاحف باتت تلعب دوراً محورياً في تعزيز الهوية الوطنية لدى الأطفال؛ إذ تحولت إلى مؤسسات تعليمية وثقافية تفاعلية تُسهم في بناء وعي الأجيال بتاريخهم وحضارتهم، بعد أن كانت في السابق مجرد قاعات جامدة لعرض القطع الأثرية أمام الزوار.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light relative z-10 mt-5 pt-5 border-t border-white/5">
              ويضيف بدوي أن المتاحف بات بمقدورها الآن تقديم التاريخ بأسلوب مبسط وتفاعلي، يعتمد فيه الطفل على الصورة والتجربة بدلاً من النصوص الجامدة، عبر التقنيات الرقمية التي تساعده على استيعاب تاريخه بطريقة ممتعة.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-5/12 relative mt-8 lg:mt-0">
          <div className="absolute inset-0 border-2 border-[#d4b483]/20 rounded-2xl transform translate-x-3 translate-y-3 pointer-events-none hidden md:block"></div>
          
          <div className="bg-[#14100c]/90 backdrop-blur-xl border border-[#d4b483]/40 p-6 md:p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] relative z-10">
            
            <div className="text-center mb-8 border-b border-[#d4b483]/10 pb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[#d4b483] font-sans mb-2 drop-shadow-md">قصر الزعفران</h3>
              <p className="text-xs md:text-sm text-gray-300 tracking-wider">شاهد حي على تاريخ مصر الحديث</p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
              {Object.keys(palaceDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border ${
                    activeTab === key 
                      ? 'bg-[#d4b483]/20 border-[#d4b483] shadow-[0_0_20px_rgba(212,180,131,0.2)] scale-105' 
                      : 'bg-black/50 border-transparent text-gray-500 hover:bg-[#1a1510] hover:border-[#d4b483]/30'
                  }`}
                >
                  <span className={`text-2xl md:text-3xl transition-all duration-300 ${activeTab === key ? 'opacity-100 drop-shadow-lg scale-110' : 'opacity-40 grayscale'}`}>
                    {palaceDetails[key].icon}
                  </span>
                  <span className={`text-[10px] md:text-xs font-sans font-bold whitespace-nowrap ${activeTab === key ? 'text-[#d4b483]' : 'text-gray-400'}`}>
                    {palaceDetails[key].title}
                  </span>
                </button>
              ))}
            </div>

            <div className="min-h-[160px] flex items-center justify-center p-5 bg-black/60 rounded-xl border border-[#d4b483]/20 transition-all duration-500 shadow-inner">
              <p className="text-gray-200 text-sm md:text-base leading-relaxed text-justify font-light">
                {palaceDetails[activeTab].text}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default NationalIdentity;