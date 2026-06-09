import React, { useState } from 'react';
import bgImage from '/assets/crossmedia3/tech.png';
const TechnologyIntegration = () => {
  // حالة لمتابعة الميزة التكنولوجية المستكشفة داخل محاكي التابلت
  const [activeFeature, setActiveFeature] = useState('tickets');

  // مكتبة الأيقونات المتجهة الاحترافية (SVG) بديلة الإيموجيز
  const icons = {
    tickets: (
      <svg className="w-5 h-5 ml-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h9.75c1.05 0 1.95.842 1.95 1.95v8.1c0 1.108-.9 1.95-1.95 1.95H7.5c-1.05 0-1.95-.842-1.95-1.95V7.95C5.55 6.842 6.45 6 7.5 6z" />
      </svg>
    ),
    display: (
      <svg className="w-5 h-5 ml-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a9 9 0 1116.5 0c0 2.25-4.05 4.5-8.25 4.5s-8.25-2.25-8.25-4.5z" />
      </svg>
    ),
    protection: (
      <svg className="w-5 h-5 ml-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3 6-6M20.25 12a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z" />
      </svg>
    ),
    maps: (
      <svg className="w-5 h-5 ml-2 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
      </svg>
    )
  };

  const techFeatures = {
    tickets: {
      title: "حجز التذاكر الرقمي",
      desc: "تسهيل آليات الدخول وحجز التذاكر إلكترونياً، مما يمنح الأسر والمدارس تجربة سلسة وسريعة تبدأ قبل دخول عتبة المتحف بلمسة زر.",
      image: "assets/crossmedia3/entry.png"
    },
    display: {
      title: "عرض المقتنيات وتوثيقها",
      desc: "تحويل البيانات المكتوبة إلى محتوى رقمي تفاعلي يتيح للطفل قراءة تفاصيل القطعة بلغة مبسطة وصور عالية الجودة تجذب انتباهه.",
      image: "assets/crossmedia3/tech.png"
    },
    protection: {
      title: "الحماية من السرقات والتهريب",
      desc: "توظيف أنظمة أمنية ذكية وشفرات رقمية لتأمين وتوثيق القطع الأثرية دولياً، لحماية ذاكرة الوطن وتراثه للأجيال القادمة.",
      image: "assets/crossmedia3/sec.png"
    },
    maps: {
      title: "الخرائط الذكية وتطبيقات التجول",
      desc: "تطبيقات الهواتف التي توفر خرائط تفاعلية داخل الصالات وبيانات وافية عن المعروضات، مما يمنح الطفل طفرة نوعية في حرية الاستكشاف.",
      image: "assets/crossmedia3/app.png"
    }
  };

  return (
    <section style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }} className="relative min-h-screen text-stone-100 pt-16 pb-40 md:pt-24 md:pb-52 px-4 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden bg-fixed ">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#16110d]/60 via-[#120d0a]/70 to-[#221811]/70 pointer-events-none"></div>
      {/* الشبكة التكنولوجية الخفيفة باللون الذهبي الرملي */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a88003_1px,transparent_1px),linear-gradient(to_bottom,#c5a88003_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: المحتوى الفلسفي بالألوان البنية والذهبية المتناسقة الأصلية */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-sm uppercase tracking-wider">المحور الرابع: مواكبة الثورة الرقمية</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#dfc5a3] leading-tight">
            تحديث آليات المتاحف: <span className="text-stone-100 font-light">بين الرقمنة العصرية وصون الهوية</span>
          </h2>

          {/* اقتباس د. أحمد محمد حميدة */}
          <div className="bg-[#1a130e]/60 border-r-4 border-[#c5a880] p-5 rounded-l-xl backdrop-blur-sm">
            <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
              يؤكد <strong className="text-[#dfc5a3] font-medium">الدكتور أحمد محمد حميدة</strong> (رئيس قطاع المتاحف بالمجلس الأعلى للآثار) على أهمية ربط الطفل بالتاريخ والتراث، محذراً من أن التكنولوجيا -رغم ما توفره من معرفة ضخمة- قد تؤدي أحياناً إلى <span className="text-orange-300 font-semibold">تراجع الوعي بالهوية الثقافية والانتماء</span>، ما لم تُصاحبها معرفة وثيقة بالجذور التاريخية.
            </p>
          </div>

          {/* حكمة الختام لأستاذ بدوي */}
          <div className="p-5 rounded-2xl bg-gradient-to-l from-[#2c2016]/30 to-transparent border border-[#c5a880]/10">
            <h4 className="text-amber-200 font-bold text-sm mb-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] inline-block"></span>
              معيار النجاح الحضاري:
            </h4>
            <p className="text-stone-300 text-sm leading-relaxed text-justify font-light">
              وفي ختام حديثه, يشير <strong className="text-[#dfc5a3] font-medium">بدوي</strong> إلى أن المتحف الناجح هو الذي يملك القدرة على <span className="text-[#dfc5a3] font-semibold">تحويل الطفل من مجرد مشاهدٍ صامت إلى مشاركٍ فاعل</span>، ومن زائرٍ عابر إلى حارسٍ للتراث يشعر أنه جزء منه؛ فبناء الهوية الوطنية لا يمر عبر قنوات الحفظ والتلقين، بل يصنع بالتجربة الحية والتفاعل المستمر.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: محاكي التابلت (Tablet) باللون البني الأصلي وبحجم وارتفاع أكبر */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-[410px] bg-[#1a130e] border-[10px] border-[#2d2219] rounded-[48px] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-sm">
            
            {/* الكاميرا العلوية للتابلت */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#2d2219] rounded-full z-20"></div>
            
            {/* شاشة التابلت الداخلية الممتدة الارتفاع (min-h-[640px]) باللون الداكن الأصلي */}
            <div className="bg-[#120d0a] rounded-[36px] p-5 pt-7 min-h-[640px] flex flex-col justify-between relative overflow-hidden">
              
              {/* ترويسة التطبيق */}
              <div className="border-b border-stone-800/60 pb-3 text-center relative z-10">
                <span className="text-sm font-bold text-[#dfc5a3] tracking-wide block">تطبيق المتحف الذكي</span>
                <span className="text-[10px] text-stone-500">منظومة المجلس الأعلى للآثار</span>
              </div>

              {/* شاشة العرض المركزية الكبيرة للتابلت */}
              <div className="bg-[#1c1410] border border-[#c5a880]/10 p-4 rounded-2xl my-4 flex-grow flex flex-col gap-4 justify-between relative z-10 shadow-inner">
                
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#dfc5a3] font-bold text-sm flex items-center">
                    {icons[activeFeature]}
                    <span className="mr-1">{techFeatures[activeFeature].title}</span>
                  </h4>
                  <p className="text-stone-400 text-xs leading-relaxed text-justify font-light">
                    {techFeatures[activeFeature].desc}
                  </p>
                </div>

                {/* الحاوية البصرية الكبيرة المقطوعة بحواف الورق التراثي الممزق (بدون أي نصوص أو تعليقات) */}
                <div className="relative h-44 w-full overflow-hidden border border-[#c5a880]/20 bg-stone-950 group [clip-path:url(#torn-paper-clip)]">
                  <img 
                    src={techFeatures[activeFeature].image} 
                    alt={techFeatures[activeFeature].title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

              </div>

              {/* شبكة الأزرار الأربعة للتابلت بالثيم الأصلي الداكن */}
              <div className="grid grid-cols-2 gap-2 relative z-10">
                {Object.keys(techFeatures).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveFeature(key)}
                    className={`p-3 rounded-xl transition-all text-right border text-xs flex flex-col gap-0.5 ${
                      activeFeature === key
                        ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#dfc5a3] shadow-lg ring-1 ring-[#c5a880]/30'
                        : 'bg-stone-900/50 border-stone-800/40 text-stone-400 hover:bg-stone-800/40 hover:text-stone-200'
                    }`}
                  >
                    <span className="font-semibold flex items-center justify-between w-full">
                      <span>
                        {key === 'tickets' && 'التذاكر'}
                        {key === 'display' && 'التوثيق'}
                        {key === 'protection' && 'التأمين'}
                        {key === 'maps' && 'الخرائط'}
                      </span>
                      <span className={activeFeature === key ? 'text-[#c5a880]' : 'text-stone-500'}>
                        {icons[key]}
                      </span>
                    </span>
                    <span className="text-[9px] text-stone-500 font-normal">اضغط للتفعيل</span>
                  </button>
                ))}
              </div>

              {/* التذييل السفلي للمحاكي */}
              <div className="text-center text-[10px] text-stone-600 mt-4 pt-2 border-t border-stone-900 relative z-10">
                اضغط على الأزرار لاستكشاف آليات التحديث الرقمي داخل التابلت
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* الـ SVG الخاص بقص الحواف مدمج في نهاية السكشن ومتوافق مع لون الهوية الأصلي */}
      <svg className="absolute w-0 h-0 text-[#c5a880]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="torn-paper-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.03,0.04 
              C 0.15,0.01 0.22,0.06 0.35,0.02 
              C 0.45,-0.01 0.52,0.05 0.62,0.01 
              C 0.75,0.04 0.88,-0.01 0.97,0.03 
              C 0.99,0.15 0.96,0.25 0.98,0.38 
              C 1.01,0.48 0.95,0.58 0.97,0.72 
              C 0.96,0.82 1.00,0.92 0.96,0.97 
              C 0.85,0.95 0.72,0.99 0.60,0.96 
              C 0.48,0.98 0.38,0.94 0.25,0.97 
              C 0.15,0.99 0.08,0.94 0.02,0.96 
              C 0.04,0.85 0.01,0.72 0.03,0.60 
              C -0.01,0.48 0.04,0.35 0.01,0.22 
              C 0.04,0.12 0.01,0.06 0.03,0.04 Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* الموجة الزخرفية السفلية مع طبقة عزل وحماية علوية تمنع التداخل */}
      <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
        <svg className="block w-full h-[90px] md:h-[130px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44C58.3,10.25,0,0,0,0V120H1200V0c0,0-93.34,58.09-256.88,58.09-110.78,0-203.88-39.79-321.73-39.79C487.2,18.3,432.49,75.24,321.39,56.44Z" fill="#2d2219" />
        </svg>
      </div>
    </section>
  );
};

export default TechnologyIntegration;