import React, { useState } from 'react';

const HeritageAwareness = () => {
  // حالة لمتابعة البعد الإبداعي للتراث المختار
  const [activeDimension, setActiveDimension] = useState('stories');

  const heritageDimensions = {
    stories: {
      title: "📖 القصص والأساطير القديمة",
      shield: "تحصين ضد السطحية",
      desc: "تمنح الطفل عمقاً روخياً وفلسفياً يواجه به المحتوى السريع والسطحي على منصات التواصل، وتفتح آفاق خياله ليفهم قيم الخير والعدالة والبطولة من بيئته بدلاً من الثقافات الدخيلة."
    },
    arts: {
      title: "🎨 الفنون والرسوم التراثية",
      shield: "تغذية الذوق البصري والجمالي",
      desc: "يتعرض الطفل لأنماط بصرية مشوشة يومياً؛ وهنا يأتي الفن التراثي ليعيد ضبط بوصلته الجمالية، ويعزز لديه إدراك أن الفن والجمال نابعان من جذوره وتاريخ مجتمعه."
    },
    architecture: {
      title: "🏛️ العمارة والهندسة الأثرية",
      shield: "تنمية التفكير التحليلي والإبداعي",
      desc: "حين يرى الطفل شموخ البناء وضخامة الهندسة، يستوعب أن التقدم التكنولوجي الحالي هو امتداد لتراكم معرفي وهندسي طويل، مما يزرع فيه بذور الابتكار المبكر."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#111827] to-[#17130e] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* تأثير فني عائم في الخلفية يحاكي درع الحماية الثقافي */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: فلسفة غرس الوعي والتراكم المعرفي */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-400 inline-block"></span>
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">المحور الخامس: استثمار في وعي الطفل</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            التاريخ ليس سردًا للأحداث بل <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">وسيلة لفهم التجارب الإنسانية</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            يرى د. أحمد حميدة أن عدم ارتباط الطفل بجذوره منذ الصغر قد يفقده وعيه بقيمتها مع مرور الزمن. فغرس الوعي التراثي مبكراً هو <strong className="text-amber-300 font-medium">استثمار حقيقي وحصن أمان</strong> ضد الأنماط الثقافية البعيدة كلياً عن بيئته ومجتمعه والتي تحاصره في فضاء السوشيال ميديا.
          </p>

          {/* لوحة "تراكم معرفي" تفاعلية مصغرة تثبت الفكرة فكرياً */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>معادلة الوعي الحضاري:</span>
            </div>
            <div className="text-gray-300 text-xs md:text-sm leading-relaxed flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">1. الجذور:</span> استيعاب إنجازات الأجداد وثقافتهم.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">2. التحليل:</span> إدراك أن تقدم الحاضر هو امتداد لتراكم الأمس.
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">⬅️ النتيجة:</span> جيل مبدع، محصن، وفخور بهويته الوطنية.
              </div>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: درع التراث في مواجهة السوشيال ميديا (اللوحة التفاعلية) */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-black/40 border border-indigo-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative">
            
            {/* عنوان التفاعل والتحصين الثقافي */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-200 flex items-center gap-2">
                🛡️ درع التراث: فتح آفاق الخيال والإبداع
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                اضغط على أبعاد التراث أدناه لترى كيف تحمي عقل طفلك من طوفان منصات التواصل الافتراضية:
              </p>
            </div>

            {/* الأزرار التفاعلية لتجربة أبعاد التراث */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {Object.keys(heritageDimensions).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDimension(key)}
                  className={`p-3 text-right rounded-xl transition-all duration-300 border flex flex-col gap-1 ${
                    activeDimension === key
                      ? 'bg-indigo-500/20 border-indigo-400 shadow-md shadow-indigo-500/10'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <span className={`font-bold text-xs md:text-sm ${activeDimension === key ? 'text-indigo-300' : 'text-gray-300'}`}>
                    {heritageDimensions[key].title.split(' ')[0]} {heritageDimensions[key].title.split(' ').slice(1).join(' ')}
                  </span>
                  <span className="text-[10px] text-gray-400 font-light">
                    {heritageDimensions[key].shield}
                  </span>
                </button>
              ))}
            </div>

            {/* شاشة العرض الديناميكية لنتائج التحصين والوعي */}
            <div className="bg-indigo-950/20 border border-indigo-400/20 p-5 rounded-xl min-h-[160px] flex flex-col justify-center transition-all duration-500">
              <span className="text-xs font-bold text-indigo-400 mb-2 block uppercase tracking-wider">
                ✦ أثر الغرس المبكر للتراث:
              </span>
              <p className="text-gray-200 text-sm md:text-base leading-loose text-justify font-light">
                {heritageDimensions[activeDimension].desc}
              </p>
            </div>

            {/* تذييل تفاعلي ملهم */}
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <span className="text-[11px] text-gray-500 italic block">
                "حين يتعرف الطفل على التاريخ كأنماط حياة وتجارب متكاملة، ينجو من فخ الانفصال عن مجتمعه."
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeritageAwareness;