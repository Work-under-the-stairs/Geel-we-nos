import React, { useState } from 'react';

const HistoricalIcons = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  const historicalFigures = [
    {
      id: 0,
      role: "القادة",
      icon: "🦅",
      title: "أبطال التحرير والتوحيد",
      description: "تقديم سير القادة العسكريين والسياسيين الذين حافظوا على تراب الوطن، ليكونوا قدوة حية للطفل في التضحية والقيادة والشجاعة."
    },
    {
      id: 1,
      role: "العلماء",
      icon: "🔭",
      title: "رواد الفكر والاكتشاف",
      description: "إبراز النماذج الوطنية في الفلك، الطب، والهندسة، لتشجيع عقل الطفل على الابتكار وإدراك إسهامات وطنه العلمية."
    },
    {
      id: 2,
      role: "المبدعين",
      icon: "✒️",
      title: "صناع الجمال والفن",
      description: "عرض روائع الفنانين والمعماريين الذين سطروا إسهامات وطنهم الحضارية بأيديهم الذهبية، لترسيخ التذوق الفني."
    }
  ];

  return (
    <section className="relative w-full bg-[#211b14] text-[#e5e5e5] py-24 px-6 md:px-12 font-serif dir-rtl selection:bg-[#d4b483] selection:text-black overflow-hidden ">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHBhdGggZD0iTTAgMGg4MHY4MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00MCA0MGw0MC00ME0wIDgwbDQwLTQwIiBzdHJva2U9IiNkNGI0ODMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>


      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#d4b483]"></span>
              <span className="text-[#d4b483] font-bold text-sm tracking-widest uppercase font-sans drop-shadow-md">
                القدوة الحية
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-sans drop-shadow-lg">
              إبراز الرموز <span className="text-[#d4b483]">التاريخية</span>
            </h2>

            <div className="relative bg-[#14100c]/80 backdrop-blur-md border-r-4 border-[#d4b483] p-6 md:p-8 rounded-l-xl shadow-2xl mt-4">
              <span className="absolute -top-6 right-4 text-7xl text-[#d4b483]/30 font-sans">“</span>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed text-justify font-light relative z-10">
                وينوه بدوي إلى ضرورة إبراز الرموز التاريخية والنماذج الوطنية في قاعات العرض، وتقديم سير القادة والعلماء والمبدعين بأسلوب مشوق؛ لتقديم قدوة حية للأطفال تغرس في نفوسهم الاعتزاز بإسهامات وطنهم الحضارية.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 relative mt-8 lg:mt-0">
            <div className="text-center mb-8 relative z-20">
              <h3 className="text-2xl font-bold text-[#d4b483] font-sans drop-shadow-md">قاعة الخالدين</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-2">انقر على الإطارات لتسليط الضوء على الرموز الوطنية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {historicalFigures.map((figure) => (
                <div 
                  key={figure.id}
                  onClick={() => setActiveIcon(figure.id)}
                  className={`group relative cursor-pointer rounded-2xl transition-all duration-500 overflow-hidden ${
                    activeIcon === figure.id 
                      ? 'bg-[#1a1510] border-2 border-[#d4b483] scale-105 shadow-[0_0_30px_rgba(212,180,131,0.2)] z-20' 
                      : 'bg-black/40 border-2 border-white/5 hover:border-[#d4b483]/40 scale-100 z-10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
                    activeIcon === figure.id ? 'bg-[#d4b483]/20 opacity-100' : 'bg-transparent opacity-0'
                  }`}></div>

                  <div className="p-6 md:p-8 flex flex-col items-center text-center h-full relative z-10">
                    <div className={`text-5xl md:text-6xl mb-6 transition-all duration-500 ${
                      activeIcon === figure.id ? 'scale-110 drop-shadow-[0_0_15px_rgba(212,180,131,0.8)]' : 'grayscale brightness-75'
                    }`}>
                      {figure.icon}
                    </div>
                    
                    <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 transition-colors duration-300 ${
                      activeIcon === figure.id ? 'text-[#d4b483]' : 'text-gray-500'
                    }`}>
                      {figure.role}
                    </span>
                    
                    <h4 className="text-white font-bold font-sans text-lg mb-4">
                      {figure.title}
                    </h4>
                    
                    <div className={`transition-all duration-500 overflow-hidden ${
                      activeIcon === figure.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                        {figure.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HistoricalIcons;