import React, { useState } from 'react';

const FinalLegacy = () => {
  // حالة لمتابعة الأثر التربوي المستكشف داخل سمات الطفل
  const [activeTrait, setActiveTrait] = useState('initiative');

  const childTraits = {
    initiative: {
      title: "⚡ مبادر تفاعلي",
      desc: "يتحول الطفل من زائر صامت يتلقى التلقين إلى عنصر حركي يبادر بالتجربة، يلمس الشاشات الرقمية، ويقود جولته الاستكشافية بنفسه داخل القصر."
    },
    curious: {
      title: "👁️ مندهش وفضولي",
      desc: "تثير تقنيات الهولوجرام والواقع الافتراضي دهشة الصغير، وتحول فضوله الفطري نحو استكشاف أسرار أجداده والبحث عن جذوره الحضارية."
    },
    researcher: {
      title: "🔍 يسأل ويبحث",
      desc: "الربط الذكي بين المنهج المدرسي والسينوغرافيا يدفع الطفل لطرح أسئلة عميقة وعفوية، محاولاً تفكيك وتحليل التجارب الإنسانية للماضي."
    },
    guardian: {
      title: "🛡️ حارس للتراث",
      desc: "القمة والهدف الأسمى؛ حيث يولد لدى الطفل شعور حقيقي بالمسؤولية والانتماء، فيشعر من أعماقه أنه حارس ووريث شرعي لهذا التاريخ العريق."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#061d24] via-[#0f1423] to-[#1a120b] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* جزيئات ضوئية ذهبية ناعمة تتطاير وتتلاشى في الأسفل ترمز لخلود الأثر والذاكرة */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-t from-amber-500/10 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center gap-12">
        
        {/* الجزء العلوي: رسالة الأسر وميثاق الاستثمار الحقيقي */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/25 backdrop-blur-sm animate-pulse">
            ✉️ رسالة ختامية إلى الأسر المصرية
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-150 leading-tight">
            اصطحاب طفلك للمتحف ليس نزهة عابرة.. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">بل استثمار في هويته!</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify sm:text-center font-light">
            في عصر تستحوذ فيه وسائل التواصل الاجتماعي على الجزء الأكبر من اهتمام الصغار، يمثل المتحف التفاعلي الذكي مساحة الاكتشاف الحقيقية لبناء الشخصية، الوعي، والثقافة، وتأصيل روح الانتماء في وجدان جيل الغد.
          </p>
        </div>

        {/* المنتصف: لوحة التفاعل وسمات الطفل الأربعة المتطورة */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-lg shadow-2xl relative">
          
          {/* شريط زينة علوي مضيء يختم اللوحة */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          {/* الجانب الأيمن للوحة: أزرار السمات الأربعة */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2 w-full">
            {Object.keys(childTraits).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTrait(key)}
                className={`p-4 text-right rounded-2xl transition-all duration-300 border flex flex-col gap-1 ${
                  activeTrait === key
                    ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-xl shadow-amber-400/10'
                    : 'bg-black/40 border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <span className="text-sm md:text-base font-bold">
                  {childTraits[key].title}
                </span>
                <span className={`text-[9px] ${activeTrait === key ? 'text-black/70' : 'text-gray-500'}`}>
                  انقري لرصد الأثر
                </span>
              </button>
            ))}
          </div>

          {/* الجانب الأيسر للوحة: شاشة رصد الأثر النفسي للسمة المفعّلة */}
          <div className="lg:col-span-7 bg-black/50 border border-white/5 p-6 rounded-2xl min-h-[160px] flex flex-col justify-center transition-all duration-500">
            <span className="text-[10px] font-bold text-amber-400 mb-1 block uppercase tracking-wider">
              🎯 الأثر الحقيقي في وعي الصغير ومشاعرها:
            </span>
            <h4 className="text-gray-200 font-bold text-base mb-2">
              كيف يصنع قصر الزعفران طفلاً {childTraits[activeTrait].title.split(' ').slice(1).join(' ')}؟
            </h4>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-justify font-light">
              {childTraits[activeTrait].desc}
            </p>
          </div>

        </div>

        {/* التوقيع والمقتبس الملكي الأخير للمقال */}
        <div className="w-full border-t border-white/10 pt-8 text-center flex flex-col items-center gap-3">
          <p className="text-amber-300 font-serif text-lg md:text-2xl max-w-2xl mx-auto italic leading-relaxed font-light">
            "النجاح الحقيقي للمتحف لا يُقاس فقط بعدد الزوار، بل بقدرته على ترك أثر حقيقي في وعي الطفل ومشاعره وذاكرته."
          </p>
          <span className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">
            — ختام حديث د. أحمد محمد حميدة • رئيس قطاع المتاحف
          </span>
        </div>

      </div>
    </section>
  );
};

export default FinalLegacy;