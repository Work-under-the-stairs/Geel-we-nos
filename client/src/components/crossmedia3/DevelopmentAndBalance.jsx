import React, { useState } from 'react';

const DevelopmentAndBalance = () => {
  // حالة لمتابعة ركيزة التوازن النشطة
  const [activePillar, setActivePillar] = useState('heritage');

  const balancePillars = {
    heritage: {
      title: "🏛️ صون روح المكان وهويته المعمارية",
      subtitle: "الحفاظ على القيمة التاريخية والأصالة",
      desc: "يقع المتحف داخل قصر الزعفران التاريخي (1901)، وهو أحد أهم القصور ذات الطابع المعماري المميز في مصر. صون هذه الروح الهندسية وربط المقتنيات بتاريخ جامعة عين شمس يمثل ركيزة أساسية تحترم أصالة المكان وقيمته الأثرية دون طمسها."
    },
    technology: {
      title: "🎮 دمج التقنيات والألعاب الرقمية",
      subtitle: "جعل التاريخ أشد جذباً للأطفال والشباب",
      desc: "عدم الفصل بين التكنولوجيا والتراث عبر توظيف أدوات مثل الواقع الافتراضي، التطبيقات التفاعلية، والألعاب التعليمية الرقمية. هذه الأدوات كفيلة بتحويل التاريخ إلى تجربة غامرة تزيد من قدرته على التأثير في وعي الصغار."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#17130e] via-[#1a2230] to-[#0f172a] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* خطوط شبكية تحاكي التصاميم الهندسية والمعمارية في الخلفية */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: الدعوة لعدم الفصل ومعادلة التوازن */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500 inline-block"></span>
            <span className="text-amber-500 font-bold text-sm uppercase tracking-wider">المحور السادس: التحديث والتطوير</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            قصر الزعفران: نموذج لـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-cyan-300">المتحف الجامعي المتوازن</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            يدعو د. أحمد حميدة إلى عدم الفصل بين التكنولوجيا والتراث، مؤكداً أن قصر الزعفران يمثل نموذجاً طليعياً استطاع تحقيق <strong className="text-cyan-300 font-medium">معادلة التوازن الذهبية</strong> بين الحفاظ على العراقة المعمارية وتوظيف الرقمنة لمخاطبة عقول الأطفال والشباب.
          </p>

          {/* محاكاة بصرية لأدوات الجذب الثلاثية */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
              <span className="text-xl block mb-1">🕶️</span>
              <span className="text-[11px] font-medium text-gray-300 block">واقع افتراضي</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
              <span className="text-xl block mb-1">📱</span>
              <span className="text-[11px] font-medium text-gray-300 block">تطبيقات تفاعلية</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center backdrop-blur-sm">
              <span className="text-xl block mb-1">🎮</span>
              <span className="text-[11px] font-medium text-gray-300 block">ألعاب رقمية</span>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: لوحة كفتي الميزان (اللوحة التفاعلية) */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative">
            
            <div className="mb-6 text-center border-b border-white/15 pb-4">
              <span className="text-xs text-amber-400 font-bold block mb-1">⚖️ ميزان العرض المتحفي المعاصر</span>
              <h3 className="text-base md:text-lg font-bold text-gray-200">
                كيف يتحقق التوازن بين الأصالة والروح الرقمية؟
              </h3>
            </div>

            {/* أزرار كفتي الميزان */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setActivePillar('heritage')}
                className={`p-4 rounded-xl text-right transition-all border duration-300 flex flex-col gap-1 ${
                  activePillar === 'heritage'
                    ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className={`font-bold text-xs md:text-sm ${activePillar === 'heritage' ? 'text-amber-400' : 'text-gray-300'}`}>
                  الكفة الأثريّة 🏛️
                </span>
                <span className="text-[10px] text-gray-500">صون روح القصر</span>
              </button>

              <button
                onClick={() => setActivePillar('technology')}
                className={`p-4 rounded-xl text-right transition-all border duration-300 flex flex-col gap-1 ${
                  activePillar === 'technology'
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className={`font-bold text-xs md:text-sm ${activePillar === 'technology' ? 'text-cyan-400' : 'text-gray-300'}`}>
                  الكفة الرقميّة 🎮
                </span>
                <span className="text-[10px] text-gray-500">أدوات الجذب الحديثة</span>
              </button>
            </div>

            {/* شاشة تجسيد تفاصيل الكفة المختارة */}
            <div className={`p-5 rounded-xl border transition-all duration-500 min-h-[170px] flex flex-col justify-center ${
              activePillar === 'heritage' 
                ? 'bg-amber-950/10 border-amber-500/20' 
                : 'bg-cyan-950/10 border-cyan-500/20'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${activePillar === 'heritage' ? 'text-amber-400' : 'text-cyan-400'}`}>
                ✦ {balancePillars[activePillar].subtitle}
              </span>
              <h4 className="text-gray-200 font-bold text-sm md:text-base mb-2">
                {balancePillars[activePillar].title}
              </h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-justify font-light">
                {balancePillars[activePillar].desc}
              </p>
            </div>

            {/* رسالة التوازن الوسطى المضيئة */}
            <div className="mt-4 pt-4 border-t border-white/5 text-center flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>النتيجة في قصر الزعفران: "الحفاظ على التراث لا يتعارض مع التطور بل يسيران معاً"</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DevelopmentAndBalance;