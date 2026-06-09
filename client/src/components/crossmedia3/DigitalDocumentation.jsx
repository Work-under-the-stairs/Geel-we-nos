import React, { useState } from 'react';

const DigitalDocumentation = () => {
  // حالة لمتابعة نمط العرض والتوثيق المختار
  const [activeMode, setActiveMode] = useState('hologram');

  const docFeatures = {
    archive: {
      title: "📊 أساليب التوثيق الرقمي العلمي",
      target: "لأغراض البحث والتعليم بكفاءة",
      desc: "حفظ البيانات، الصور، والمعلومات الخاصة بالمقتنيات رقمياً؛ بما يضمن حمايتها والحفاظ عليها علمياً، وإتاحتها بكفاءة عالية جداً للأغراض البحثية والتعليمية للأجيال القادمة."
    },
    hologram: {
      title: "🧞‍♂️ تقنيات الهولوجرام والعروض الدرامية",
      target: "إضفاء بعد درامي وتفاعلي حي",
      desc: "استخدام طيف الهولوجرام لمساعدة المتحف على تقديم الشخصيات التاريخية والعناصر التراثية بصورة مجسمة، جذابة وحية، مما يسهل التواصل مع الطفل ويضاعف تأثير الرسالة المتحفية."
    },
    multimedia: {
      title: "🎥 الشاشات الذكية والوسائط المتعددة",
      target: "تفاعل مباشر يجمع الصوت والصورة والفيديو",
      desc: "منظومة تتيح للزائر التفاعل المباشر مع المحتوى، واستكشاف معلومات ممتدة بطريقة معاصرة تتناسب بالكامل مع طبيعة واهتمامات الجمهور الجديد المحب للبصريات."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1e1510] via-[#0f172a] to-[#111827] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* لمسات بصرية تحاكي أشعة الليزر العمودية الخاصة بأجهزة الهولوجرام */}
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-amber-400/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: فلسفة التوثيق ومضاعفة تأثير الرسالة */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-400 inline-block"></span>
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">المحور العاشر: التوثيق والبعد الدرامي</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            تجسيد الشخصيات بصورة حية <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-cyan-300">لتسهيل التواصل مع الزوار</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            تابع د. أحمد حميدة موضحاً أن الهدف من هذه المنظومة الرقمية هو دمج دقة التوثيق العلمي مع سحر العرض البصري. لم يعد المتحف يعرض حجراً جامداً، بل يفتح شاشات ذكية ووسائط تجمع بين <strong className="text-cyan-300 font-medium">الصوت والصورة والفيديو</strong> لتناسب طبيعة الأجيال الجديدة.
          </p>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm">
            <span className="text-cyan-400 text-xl">💾</span>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              تضمن أساليب التوثيق الرقمي الحديثة إتاحة البيانات التاريخية بكفاءة عالية للأغراض البحثية والمدرسية.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: قاعة الهولوجرام والوسائط الافتراضية (اللوحة التفاعلية) */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative">
            
            {/* واجهة التحكم بالمؤثرات البصرية */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-200">
                  🛸 منصة إطلاق العروض المجسمة والبيانات
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  انقري فوق الأدوات الرقمية أدناه لتفعيل تكنولوجيا العرض:
                </p>
              </div>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-md border border-cyan-500/20 self-start sm:self-center">
                SYSTEM: ACTIVE 🟢
              </span>
            </div>

            {/* الأزرار التفاعلية الثلاثية */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
              {Object.keys(docFeatures).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMode(key)}
                  className={`p-3 text-right rounded-xl transition-all duration-300 border flex flex-col gap-0.5 ${
                    activeMode === key
                      ? 'bg-gradient-to-b from-cyan-500/15 to-transparent border-cyan-400 shadow-lg shadow-cyan-500/5'
                      : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className={`font-bold text-xs ${activeMode === key ? 'text-cyan-300' : 'text-gray-300'}`}>
                    {docFeatures[key].title.split(' ')[0]} {docFeatures[key].title.split(' ').slice(1).join(' ')}
                  </span>
                  <span className="text-[9px] text-gray-500 truncate">
                    {docFeatures[key].target}
                  </span>
                </button>
              ))}
            </div>

            {/* صندوق محاكاة مسرح الهولوجرام والوسائط المتعددة المضيء */}
            <div className="bg-black/60 border border-white/5 p-6 rounded-xl min-h-[170px] flex flex-col justify-center relative overflow-hidden transition-all duration-500">
              
              {/* مخروط الضوء الافتراضي المنبثق من الأسفل في وضع الهولوجرام */}
              {activeMode === 'hologram' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent blur-xl pointer-events-none animate-pulse"></div>
              )}

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border w-fit mb-2 ${
                activeMode === 'hologram' ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400' : 'bg-amber-400/10 border-amber-400/30 text-amber-400'
              }`}>
                🎯 {docFeatures[activeMode].target}
              </span>

              <p className="text-gray-200 text-xs md:text-sm leading-loose text-justify font-light relative z-10">
                {docFeatures[activeMode].desc}
              </p>
            </div>

            <p className="text-center text-[10px] text-gray-600 mt-4 italic">
              * تدمج هذه التقنيات الصوت والصورة لإلغاء الجمود وجذب انتباه الجيل الرقمي الجديد
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DigitalDocumentation;