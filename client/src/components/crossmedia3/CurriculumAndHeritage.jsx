import React, { useState } from 'react';

const CurriculumAndHeritage = () => {
  // حالات التحكم في السينوغرافيا الافتراضية
  const [scenography, setScenography] = useState({
    lighting: true,
    audio: false,
    decor: false,
  });

  // حالة لمتابعة الورشة التعليمية المختارة
  const [activeWorkshop, setActiveWorkshop] = useState(0);

  const workshops = [
    {
      title: "🎨 ورشة الرسم الأثري",
      desc: "إعادة رسم النقوش التاريخية والألوان القديمة لترسيخ الأشكال الهندسية والفنية المصمتة الموجودة في الكتب المدرسية كحقيقة بصرية."
    },
    {
      title: "🏺 صناعة النماذج الطينية",
      desc: "صناعة مجسمات مصغرة للأواني والتماثيل بأيدي الأطفال، مما يحول حاسة اللمس لديهم إلى أداة تواصل وتوثيق مباشر مع الماضي."
    },
    {
      title: "🧵 تعليم الحرف التراثية",
      desc: "ممارسة حرف يدوية تقليدية كالنسيج أو الحفر على الخشب، ليتعلم الطفل أن حماية هذا التراث هي مسؤولية جماعية تمثل المواطنة."
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a120b] via-[#151d2a] to-[#0f172a] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: فلسفة العرض والسينوغرافيا (تجاوز الواجهات الزجاجية) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span>
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">المحور الثاني: السينوغرافيا والربط بالمنهج</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            المتحف ليس مكاناً لـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">"رص القطع الأثرية"</span> بل لصناعة قصة!
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-justify font-light">
            يلفت د. بدوي إلى أن العرض المعاصر يتجاوز الواجهات الزجاجية الجامدة ليتحول إلى <strong className="text-cyan-300 font-medium">"مختبر معرفي مكمل للمدرسة"</strong>. تحكّم في عناصر السينوغرافيا أدناه لترى كيف تتكامل التجربة:
          </p>

          {/* لوحة تحكم تفاعلية في عناصر السينوغرافيا */}
          <div className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col gap-3 backdrop-blur-md">
            <span className="text-xs text-gray-400 block mb-1">🎛️ وحدة التحكم في البيئة المتحفية (اضغط للتفعيل):</span>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setScenography({...scenography, lighting: !scenography.lighting})}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${scenography.lighting ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-gray-400'}`}
              >
                {scenography.lighting ? '💡 الإضاءة المتناغمة (نشطة)' : '💡 تشغيل الإضاءة'}
              </button>

              <button 
                onClick={() => setScenography({...scenography, audio: !scenography.audio})}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${scenography.audio ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400'}`}
              >
                {scenography.audio ? '🔊 المؤثرات الصوتية (تعمل)' : '🔊 تشغيل الصوت المحيطي'}
              </button>

              <button 
                onClick={() => setScenography({...scenography, decor: !scenography.decor})}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${scenography.decor ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-gray-400'}`}
              >
                {scenography.decor ? '🏛️ الديكور السينوغرافي (مفعل)' : '🏛️ بناء الديكور الحركي'}
              </button>
            </div>
          </div>

          {/* صندوق المعاينة الافتراضي المتغير بناء على الأزرار */}
          <div className={`p-6 rounded-xl border transition-all duration-700 min-h-[100px] flex items-center justify-center text-center ${
            scenography.lighting && scenography.audio && scenography.decor 
              ? 'bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-emerald-500/10 border-white/30 text-white' 
              : 'bg-black/60 border-white/5 text-gray-500'
          }`}>
            <p className="text-sm leading-relaxed">
              {scenography.lighting || scenography.audio || scenography.decor ? "⚡ " : ""}
              {scenography.lighting ? "الإضاءة تبرز تفاصيل القطعة الحية، " : "المكان معتم، "}
              {scenography.audio ? "أصوات أجدادنا تعود لتهز الوجدان، " : "الصوت صامت، "}
              {scenography.decor ? "الديكور يعيدك لزمن الفراعنة بالكامل!" : "الخلفية بيضاء صماء."}
              {scenography.lighting && scenography.audio && scenography.decor && <span className="block mt-2 text-amber-400 font-bold">🎯 هكذا تتشكل تجربة بصرية حية ترسخ الهوية في الذاكرة!</span>}
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: ورش العمل واحترام التراث عبر المشاركة */}
        <div className="lg:col-span-6 w-full flex flex-col gap-6">
          <div className="border border-white/10 bg-white/5 p-6 rounded-2xl backdrop-blur-lg">
            <h3 className="text-xl font-bold text-gray-200 mb-2 flex items-center gap-2">
              <span>🛠️ الورش التعليمية والمشاركة العملية</span>
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              المشاركة العملية داخل المتحف تنمي لدى الطفل شعوراً حقيقياً بالمواطنة والانتماء، وتخلق علاقة مباشرة بينه وبين تاريخه بدلاً من التلقين.
            </p>

            {/* الأقسام التفاعلية للورش */}
            <div className="flex flex-col gap-3">
              {workshops.map((workshop, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveWorkshop(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border duration-300 ${
                    activeWorkshop === index 
                      ? 'bg-white/10 border-cyan-400/50 shadow-md scale-[1.01]' 
                      : 'bg-black/20 border-transparent hover:border-white/10'
                  }`}
                >
                  <h4 className={`font-bold text-base ${activeWorkshop === index ? 'text-cyan-400' : 'text-gray-300'}`}>
                    {workshop.title}
                  </h4>
                  {activeWorkshop === index && (
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed transition-opacity duration-500 font-light">
                      {workshop.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CurriculumAndHeritage;