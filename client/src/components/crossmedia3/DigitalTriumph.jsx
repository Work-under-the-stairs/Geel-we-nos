import React, { useState } from 'react';

const DigitalTriumph = () => {
  // حالة لمتابعة التكنولوجيا المستكشفة (الواقع الافتراضي أو المعزز)
  const [techMode, setTechMode] = useState('vr');

  const techDetails = {
    vr: {
      title: "🕶️ الواقع الافتراضي (VR - Virtual Reality)",
      badge: "تجربة غامرة بالكامل",
      effect: "العيش في قلب الحدث التاريخي",
      desc: "تتيح للطفل خوض تجربة غامرة داخل البيئة التاريخية القديمة، والتفاعل مع عناصر التراث بصورة حية، مما يمنحه شعوراً بأنه يعيش في قلب العصر نفسه، ويرفع من القيمة التعليمية والتجربة الحسية للمتحف."
    },
    ar: {
      title: "📱 الواقع المعزز (AR - Augmented Reality)",
      badge: "طبقات رقمية فوق الواقع",
      effect: "إعادة تصور الهيئة الأصلية للمقتنيات",
      desc: "تسمح بإضافة طبقات رقمية وشرح تفاعلي فوق القطع والمقتنيات الحقيقية؛ مما يتيح للطفل مشاهدة معلومات إضافية أو إعادة بناء الأجزاء المفقودة من العناصر التاريخية بأسلوب عصري عبر الأجهزة الذكية."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#111827] via-[#0d1527] to-[#1e1510] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* جزيئات رقمية عائمة في الخلفية تعبر عن طاقة الجائزة والابتكار */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: التتويج بالجائزة وكسر الصورة النمطية */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* بطاقة الجائزة الذهبية */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-600/10 border border-amber-500/40 p-3 rounded-2xl w-fit backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <span className="text-2xl animate-bounce">🏆</span>
            <div className="flex flex-col">
              <span className="text-amber-400 font-black text-xs uppercase tracking-wider">تتويج مستحق</span>
              <span className="text-gray-200 text-xs font-bold">جائزة أفضل توظيف للتكنولوجيا الرقمية</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            تجارب تفاعلية تنهي عصر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-amber-200">"المشاهدة الصامتة"</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            يوضح د. حميدة أن الفوز بالجائزة جاء تتويجاً لرؤية لم تستهدف الإبهار البصري وحده، بل هدفت لتبسيط المادة المعرفية وبناء جسور تواصل تجعل النشء أكثر تلاحماً مع هويتهم في زمن الطفرات التكنولوجية المتسارعة، ليتعلم الطفل بالمشاركة والتجربة وينمو لديه شعور بالمسؤولية.
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>الرسالة: التاريخ تجربة حية وليس شيئاً جامداً</span>
          </div>
        </div>

        {/* الجانب الأيسر: محاكي البوابة الافتراضية VR & AR (اللوحة التفاعلية) */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative">
            
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-bold text-gray-200">
                🎮 منصة المحاكاة الرقمية بقصر الزعفران
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                اضغط للتبديل بين التقنيات وشاهد كيف يتغير أسلوب الاستكشاف الحسي للطفل:
              </p>
            </div>

            {/* مفتاح التبديل الذكي بين تقنيات الجائزة */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-black/50 p-1.5 rounded-xl border border-white/5">
              <button
                onClick={() => setTechMode('vr')}
                className={`py-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  techMode === 'vr' 
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                🕶️ قناع الواقع الافتراضي VR
              </button>
              <button
                onClick={() => setTechMode('ar')}
                className={`py-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  techMode === 'ar' 
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                📱 شاشة الواقع المعزز AR
              </button>
            </div>

            {/* شاشة العرض الديناميكية لمحاكاة الأثر التكنولوجي */}
            <div className={`p-5 rounded-xl border transition-all duration-500 min-h-[180px] flex flex-col justify-center ${
              techMode === 'vr' 
                ? 'bg-cyan-950/10 border-cyan-500/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' 
                : 'bg-amber-950/10 border-amber-500/20 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 mb-3">
                <h4 className="font-bold text-sm md:text-base text-gray-200">
                  {techDetails[techMode].title}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  techMode === 'vr' ? 'bg-cyan-400/20 text-cyan-300' : 'bg-amber-400/20 text-amber-300'
                }`}>
                  {techDetails[techMode].badge}
                </span>
              </div>
              
              <span className={`text-xs font-medium mb-1 block ${techMode === 'vr' ? 'text-cyan-400' : 'text-amber-400'}`}>
                🎯 الهدف التعليمي: {techDetails[techMode].effect}
              </span>
              
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-justify font-light">
                {techDetails[techMode].desc}
              </p>
            </div>

            <p className="text-center text-[10px] text-gray-500 mt-4 italic">
              * وظفت هذه الأدوات لتطوير أساليب التوثيق والعرض وليس للإبهار البصري المجرّد
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DigitalTriumph;