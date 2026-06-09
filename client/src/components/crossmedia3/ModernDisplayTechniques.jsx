import React, { useState } from 'react';

const ModernDisplayTechniques = () => {
  // حالة لمتابعة أسلوب العرض الحديث المختار
  const [activeTechnique, setActiveTechnique] = useState('visualPath');

  const techniques = {
    visualPath: {
      title: "👁️ تنظيم المسارات البصرية والسينوغرافيا",
      concept: "بديل لـ 'صف القطع التقليدي'",
      desc: "توظيف هندسة إضاءة متطورة ومسارات بصرية مدروسة توجه عين الطفل تلقائياً نحو قصة القطعة الأثرية، مما يخلق تجربة درامية تفاعلية جذابة للزوار دون الإخلال بالهوية التاريخية للمقتنيات."
    },
    digitalScreens: {
      title: "🖥️ الشاشات التفاعلية والوسائل الرقمية",
      concept: "تبسيط المعلومات في قالب عصري",
      desc: "استعانة المتحف بشاشات لمس ذكية ووسائط رقمية متعددة لتبسيط التاريخ المعقد؛ مما يجعل التراث الثقافي الأصيل أكثر قرباً وفهماً للأجيال الجديدة المعتادة كلياً على التكنولوجيا."
    },
    liveWorkshops: {
      title: "🎭 البرامج والأنشطة والورش التعليمية",
      concept: "الزيارة كتجربة معرفية متكاملة",
      desc: "تنظيم ورش عمل وبرامج ثقافية حية تضمن تحول زيارة الطفل من مجرد مشاهدة عابرة إلى تجربة تفاعلية تمس مشاعره وتزرع في وعيه أن التراث المصري عنصر ممتد في تفاصيل الحاضر."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a120b] to-[#111827] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* هالة ضوئية ناعمة تحاكي كشافات الإضاءة المتحفية الذكية */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: فلسفة كسر التقليد والرسالة التعليمية */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span>
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">المحور السابع: أساليب العرض الحديثة</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            التاريخ ليس ماضياً منفصلاً بل <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">عنصر حي يمتد في حاضرنا</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            تأككيداً لرؤية د. أحمد حميدة، نجح قصر الزعفران في كسر الصورة النمطية للعرض عبر دمج أدوات التطور الرقمي لحماية أصالة المكان. اضغط على أساليب العرض لاستكشاف الكواليس:
          </p>

          {/* اقتباس الرسالة الذهبية للدكتور حميدة */}
          <div className="bg-white/5 border-r-4 border-cyan-400 p-4 rounded-l-xl backdrop-blur-sm">
            <p className="text-amber-300 text-xs font-bold mb-1">🎯 رسالة المتحف للأجيال:</p>
            <p className="text-gray-300 text-xs md:text-sm italic font-light">
              \"العرض المتحفي داخل قصر تاريخي بالتوازي مع توظيف أدوات حديثة يبعث برسالة مفادها أن الحفاظ على التراث لا يتعارض مع التطور، بل يمكنهما السير معاً جنباً إلى جنب\"
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: لوحة التحكم في المسارات وأساليب العرض (اللوحة التفاعلية) */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl flex flex-col gap-6">
            
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-200">
                🧭 استكشف الهندسة الجديدة للعرض المتحفي
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                انقر على الأساليب لتكتشف كيف تحولت المقتنيات من قطع صامتة إلى قصص حية:
              </p>
            </div>

            {/* الأزرار التفاعلية للمسارات */}
            <div className="flex flex-col gap-3">
              {Object.keys(techniques).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTechnique(key)}
                  className={`w-full text-right p-4 rounded-xl transition-all duration-300 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 ${
                    activeTechnique === key
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/5'
                      : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className={`font-bold text-xs md:text-sm ${activeTechnique === key ? 'text-cyan-300' : 'text-gray-300'}`}>
                    {techniques[key].title}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    activeTechnique === key ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-gray-500'
                  }`}>
                    {techniques[key].concept}
                  </span>
                </button>
              ))}
            </div>

            {/* شاشة العرض والشرخ الفني للمسار المختار */}
            <div className="bg-black/60 border border-white/5 p-5 rounded-xl min-h-[140px] flex flex-col justify-center transition-all duration-500">
              <span className="text-[11px] font-bold text-amber-400 mb-1.5 block uppercase tracking-wider">
                ✦ فلسفة التصميم المعاصر:
              </span>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-justify font-light">
                {techniques[activeTechnique].desc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ModernDisplayTechniques;