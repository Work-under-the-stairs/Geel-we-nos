import React, { useState } from 'react';

const HistoricalIcons = () => {
  // حالة لمتابعة فئة الرموز التاريخية
  const [activeCategory, setActiveCategory] = useState('leaders');
  // حالة لمتابعة نمط التحول للطفل (صامت vs فاعل)
  const [childRole, setChildRole] = useState('silent');

  const iconCategories = {
    leaders: {
      label: "👑 سير القادة والزعماء",
      quote: "تقديم عبقرية القيادة وبناء الدولة بأسلوب درامي مشوق، يربط الطفل بقرارات أجداده المصيرية."
    },
    scientists: {
      label: "🧪 إسهامات العلماء",
      quote: "عرض ابتكارات علماء مصر عبر العصور لتثبت للطفل أن وطننا هو مهد العلوم والطب والهندسة الطليعية."
    },
    creators: {
      label: "🎨 إبداع الفنانين والمبدعين",
      quote: "إبراز الفنون والعمارة والأدب، لتغذية ذوق الطفل الفني وغرس الاعتزاز بالبصمة الحضارية الفريدة."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1f1610] to-[#1a120b] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* عناصر فنية في الخلفية */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-5 w-80 h-80 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: إبراز الرموز وقاعات العرض الفعالة */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-400 inline-block"></span>
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">المحور الثالث: قدوة حية لا تلقين</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            إبراز الرموز الوطنية لتقديم <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">قدوة ملهمة للأجيال</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            ينوه د. بدوي بضرورة تقديم سير الشخصيات التاريخية بأسلوب مشوق لغرس الاعتزاز داخل نفوس الصغار. اختر الفئة لاستكشاف طريقة العرض المعاصرة:
          </p>

          {/* تبويبات اختيار الرموز المضيئة */}
          <div className="flex flex-col gap-3 mt-2">
            {Object.keys(iconCategories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`w-full text-right p-4 rounded-xl transition-all duration-300 border flex items-center justify-between ${
                  activeCategory === key
                    ? 'bg-amber-400/10 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <span className={`font-bold text-sm md:text-base ${activeCategory === key ? 'text-amber-400' : 'text-gray-300'}`}>
                  {iconCategories[key].label}
                </span>
                <span className={`text-xs ${activeCategory === key ? 'opacity-100 text-amber-300' : 'opacity-0'}`}>✦ نشط الآن</span>
              </button>
            ))}
          </div>

          {/* صندوق عرض المحاكاة */}
          <div className="bg-black/50 border border-white/10 p-5 rounded-xl min-h-[100px] backdrop-blur-sm">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed italic font-light">
              "{iconCategories[activeCategory].quote}"
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: خلاصة الفلسفة والمتحف الناجح (لوحة التحول التفاعلي) */}
        <div className="lg:col-span-6 w-full flex flex-col items-center">
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg relative shadow-2xl">
            
            <h3 className="text-xl font-bold text-center text-gray-200 mb-6">
              معيار المتحف الناجح: تحول دور الطفل
            </h3>

            {/* أزرار التبديل الحركية بين الحالتين */}
            <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/10 mb-8 relative">
              <button
                onClick={() => setChildRole('silent')}
                className={`w-1/2 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                  childRole === 'silent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-400'
                }`}
              >
                🔴 مشاهد صامت وزائر عابر
              </button>
              <button
                onClick={() => setChildRole('active')}
                className={`w-1/2 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                  childRole === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400'
                }`}
              >
                🟢 مشارك فاعل وحارس للتراث
              </button>
            </div>

            {/* شاشة تجسيد حالة الطفل المستهدف */}
            <div className={`p-6 rounded-xl border transition-all duration-500 min-h-[190px] flex flex-col justify-center ${
              childRole === 'silent' 
                ? 'bg-red-950/20 border-red-900/40' 
                : 'bg-emerald-950/20 border-emerald-900/40'
            }`}>
              <h4 className={`text-base font-bold mb-3 ${childRole === 'silent' ? 'text-red-400' : 'text-emerald-400'}`}>
                {childRole === 'silent' ? '❌ النمط التقليدي (الحفظ والتلقين)' : '🎯 النمط الحديث (التجربة والتفاعل)'}
              </h4>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
                {childRole === 'silent' ? (
                  "يمر الطفل عبر قنوات التلقين الصامتة، ينظر إلى المقتنيات كأشياء قديمة ميتة لا تربطه بها صلة، ويشعر بالملل السريع وتتبخر التجربة من ذاكرته بمجرد الخروج من بوابات المتحف."
                ) : (
                  "يشتبك الطفل مع وجدان المكان، يشعر بالتحدي والمتعة، يتحول عبر التجربة الحية والتفاعل المستمر إلى حارس للتراث يحمل المسؤولية ويشعر من كل قلبه أنه جزء لا يتجزأ من هذا الوطن."
                )}
              </p>
            </div>

            <p className="text-center text-[11px] text-gray-500 mt-4 italic">
              * اضغط على الوضعين بالأعلى لتلاحظ الفرق في صياغة هوية الصغار
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HistoricalIcons;