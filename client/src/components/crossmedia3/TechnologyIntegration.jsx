import React, { useState } from 'react';

const TechnologyIntegration = () => {
  // حالة لمتابعة الميزة التكنولوجية المستكشفة داخل محاكي الهاتف
  const [activeFeature, setActiveFeature] = useState('tickets');

  const techFeatures = {
    tickets: {
      title: "🎫 حجز التذاكر الرقمي",
      desc: "تسهيل آليات الدخول وحجز التذاكر إلكترونياً، مما يمنح الأسر والمدارس تجربة سلسة وسريعة تبدأ قبل دخول عتبة المتحف بلمسة زر."
    },
    display: {
      title: "🏺 عرض المقتنيات وتوثيقها",
      desc: "تحويل البيانات المكتوبة إلى محتوى رقمي تفاعلي يتيح للطفل قراءة تفاصيل القطعة بلغة مبسطة وصور عالية الجودة تجذب انتباهه."
    },
    protection: {
      title: "🛡️ الحماية من السرقات والتهريب",
      desc: "توظيف أنظمة أمنية ذكية وشفرات رقمية لتأمين وتوثيق القطع الأثرية دولياً، لحماية ذاكرة الوطن وتراثه للأجيال القادمة."
    },
    maps: {
      title: "🗺️ الخرائط الذكية وتطبيقات التجول",
      desc: "تطبيقات الهواتف التي توفر خرائط تفاعلية داخل الصالات وبيانات وافية عن المعروضات، مما يمنح الطفل طفرة نوعية في حرية الاستكشاف."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e1b4b] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* شبكة رقمية خفيفة في الخلفية ترمز للتكنولوجيا والرقمنة */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: رؤية د. أحمد حميدة وتحليل السلاح ذو الحدين */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span>
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">المحور الرابع: مواكبة الثورة الرقمية</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            دمج التكنولوجيا بالتراث: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">ضرورة لحماية جذور الطفل</span>
          </h2>

          {/* تنويه د. أحمد حميدة الذكي حول خطورة التكنولوجيا المجرّدة */}
          <div className="bg-gradient-to-l from-indigo-950/40 to-black/40 border border-indigo-500/20 p-6 rounded-2xl backdrop-blur-md">
            <h4 className="text-amber-400 font-bold text-base mb-2">💡 موازنة ذكية ورؤية أثرية:</h4>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
              يرى <strong className="text-cyan-300 font-medium">الدكتور أحمد محمد حميدة</strong> (رئيس قطاع المتاحف بالمجلس الأعلى للآثار) أن التكنولوجيا -رغم ما توفره من معرفة ضخمة- قد تؤدي أحياناً إلى <span className="text-red-400 font-semibold">تراجع الوعي بالهوية والانتماء</span>، ما لم تُصاحبها معرفة وثيقة بالتاريخ والجذور يجدها الطفل داخل المتحف.
            </p>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            لذلك، لم تعد التكنولوجيا وسيلة للترفيه فقط، بل تحولت إلى منظومة متكاملة لتحديث المتاحف وحماية الهوية الوطنية بأساليب ذكية وعصرية.
          </p>
        </div>

        {/* الجانب الأيسر: محاكي تطبيق الهاتف الذكي والمتاحف الرقمية */}
        <div className="lg:col-span-6 w-full flex justify-center">
          {/* جسم الهاتف الذكي الافتراضي */}
          <div className="w-full max-w-[360px] bg-[#090d16] border-[6px] border-gray-800 rounded-[40px] p-4 shadow-[0_0_40px_rgba(34,211,238,0.15)] relative overflow-hidden">
            
            {/* كاميرا الهاتف العلوية (الـ Notch) */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-full z-20"></div>
            
            {/* شاشة التطبيق الداخلية */}
            <div className="bg-[#0f1423] rounded-[28px] p-4 pt-6 min-h-[460px] flex flex-col justify-between">
              
              {/* ترويسة التطبيق */}
              <div className="border-b border-gray-800 pb-3 text-center">
                <span className="text-xs font-bold text-cyan-400 tracking-wide block">تطبيق المتحف الذكي</span>
                <span className="text-[10px] text-gray-500">منظومة المجلس الأعلى للآثار</span>
              </div>

              {/* شاشة عرض الميزة المفعلة */}
              <div className="bg-black/40 border border-cyan-500/10 p-4 rounded-xl my-4 flex-grow flex flex-col justify-center transition-all duration-300">
                <h4 className="text-cyan-300 font-bold text-sm mb-1.5 flex items-center gap-1.5">
                  {techFeatures[activeFeature].title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed text-justify">
                  {techFeatures[activeFeature].desc}
                </p>
              </div>

              {/* لوحة أزرار التطبيق (لوحة التحكم اللمسية) */}
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(techFeatures).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveFeature(key)}
                    className={`p-3 rounded-xl transition-all text-right border text-xs flex flex-col gap-1 ${
                      activeFeature === key
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-md'
                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-gray-200'
                    }`}
                  >
                    <span className="font-semibold">
                      {key === 'tickets' && '🎫 التذاكر'}
                      {key === 'display' && '🏺 التوثيق'}
                      {key === 'protection' && '🛡️ التأمين'}
                      {key === 'maps' && '🗺️ الخرائط'}
                    </span>
                    <span className="text-[9px] text-gray-500 hidden md:inline">اضغط للتفعيل</span>
                  </button>
                ))}
              </div>

              {/* أسفل شاشة الهاتف */}
              <div className="text-center text-[10px] text-gray-600 mt-3 pt-2 border-t border-gray-900">
                📱 اضغط على الأزرار لاستكشاف طفرة التجول
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechnologyIntegration;