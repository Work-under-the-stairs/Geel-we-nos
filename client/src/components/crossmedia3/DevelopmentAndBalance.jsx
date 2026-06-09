import React, { useState } from 'react';

const DevelopmentAndBalance = () => {
  // حالة لمتابعة المحور النشط لعرض البيانات والصور المقترنة بها
  const [activePillar, setActivePillar] = useState('heritage');

  // الأيقونات الهندسية الرسمية بديلة الإيموجيز
  const icons = {
    heritage: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5H4.5V21m16.5 0H3" />
      </svg>
    ),
    display: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    education: (
      <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L10.74 14.027a.75.75 0 00.704 0l6.48-3.853a.75.75 0 00-.006-1.285L11.437 5.1a.75.75 0 00-.715 0L4.266 8.89a.75.75 0 00-.007 1.284z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 11.625v4.5a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-4.5m-7.5 0v4.5A1.5 1.5 0 009 17.625h1.5a1.5 1.5 0 001.5-1.5v-4.5" />
      </svg>
    ),
    techBadge: (
      <svg className="w-8 h-8 stroke-current text-[#c5a880] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    vr: (
      <svg className="w-5 h-5 mx-auto mb-1 stroke-current text-[#c5a880]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    apps: (
      <svg className="w-5 h-5 mx-auto mb-1 stroke-current text-[#c5a880]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    games: (
      <svg className="w-5 h-5 mx-auto mb-1 stroke-current text-[#c5a880]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 003-3V7.5a3 3 0 00-3-3h-9a3 3 0 00-3 3v8.25a3 3 0 003 3m9 0v1.5a2.25 2.25 0 01-2.25 2.25h-4.5A2.25 2.25 0 017.5 20.25v-1.5M9 9h.008v.008H9V9zm.375 0h.008v.008H9.375V9zm-.375 2.25h.008v.008H9v-.008zm2.25-3h.008v.008H11.25V8.25zm0 2.25h.008v.008H11.25v-.008zM14.25 9.75h1.5m-1.5 1.5h1.5" />
      </svg>
    )
  };

  // هيكلة البيانات مع دمج الصور التراثية والرقمية لكل محور بصري
  const balancePillars = {
    heritage: {
      title: "صون روح المكان وهويته المعمارية",
      subtitle: "الحفاظ على القيمة التاريخية والأصالة الأثرية",
      desc: "يقع المتحف داخل قصر الزعفران التاريخي، الذي يُعد أحد أهم القصور ذات الطابع المعماري المميز. صون روح المكان وهويته المعمارية يمثل ركيزة أساسية في فلسفة العرض، حيث جرى ربط المقتنيات والتراث بتاريخ جامعة عين شمس بطريقة تحترم أصالة المكان وقيمته الأثرية.",
      image: "assets/crossmedia3/zafranPalace.jpg",
      tag: "العمارة والأصالة"
    },
    display: {
      title: "أساليب عرض سينوغرافي وتفاعلي حديث",
      subtitle: "تنظيم المسارات البصرية والإضاءة الذكية",
      desc: "لم يعتمد المتحف على أسلوب العرض التقليدي القائم على صف القطع داخل الواجهات الزجاجية، بل وظف تقنيات حديثة في الإضاءة، والسينوغرافيا، وتنظيم المسارات البصرية؛ بما يخلق تجربة تفاعلية جذابة للزوار، مع الاستعانة بوسائل رقمية وشاشات تبسط المعلومات للأجيال الجديدة.",
      image: "assets/crossmedia3/img1_sec6.png",
      tag: "السينوغرافيا الرقمية"
    },
    education: {
      title: "البرامج والرسائل التعليمية الحية",
      subtitle: "تحويل الزيارة إلى تجربة معرفية متكاملة",
      desc: "تحرص إدارة المتحف على تقديم رسائل تعليمية وثقافية عبر تنظيم العديد من الأنشطة، والبرامج، وورش العمل؛ لضمان ترسيخ الوعي بالهوية الوطنية والتراث المصري، وتقديم التاريخ باعتباره عنصراً حياً ممتداً في تفاصيل الحاضر وليس مجرد ماضٍ منفصل.",
      image: "assets/crossmedia3/final_sec6.png",
      tag: "بناء الوعي الوطني"
    }
  };

  return (
    <section className="relative min-h-screen bg-[#2d2219] text-stone-100 py-24 px-4 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* الخلفيات الفنية العميقة لمنح التصميم فخامة متاحف عالمية */}
      <div className="absolute inset-0 bg-[radial-gradient(#c5a88003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1b140f] via-[#2d2219] to-[#241b14] pointer-events-none"></div>

      {/* حاوية شبكة المحتوى الرئيسي */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: النص السردي المطور بعناية وهيكل بصري رصين */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-right">
          <div className="flex items-center gap-3 justify-start">
            <span className="w-10 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-xs uppercase tracking-wider">عمليات تطوير وتحديث</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#dfc5a3] leading-tight">
            التحول المعاصر في <br />
            <span className="text-stone-100 font-light">متحف قصر الزعفران</span>
          </h2>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
            ودعا حميدة إلى عدم الفصل بين التكنولوجيا والتراث؛ إذ إن التقنيات الحديثة، مثل الواقع الافتراضي، والتطبيقات التفاعلية، والألعاب التعليمية الرقمية، كفيلة بأن تجعل التاريخ أشد جذباً للأطفال، وأكثر قدرة على التأثير في وعيهم الحسي والحضاري.
          </p>

          <div className="bg-[#1a130e]/40 border-r-2 border-[#c5a880]/40 p-4 rounded-l-xl backdrop-blur-sm">
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed text-justify font-light">
              أوضح حميدة أن المتحف يمثل نموذجاً بارزاً للمتاحف الجامعية الحديثة، التي استطاعت تحقيق التوازن بين الحفاظ على الهوية التاريخية، وتوظيف التقنيات الرقمية في العرض والتواصل مع الجمهور، ولا سيما الأطفال والشباب.
            </p>
          </div>

          {/* التبويبات التفاعلية الجانبية المصممة كأزرار تحكم فاخرة */}
          <div className="flex flex-col gap-2 mt-2">
            {Object.entries(balancePillars).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActivePillar(key)}
                className={`w-full p-3.5 rounded-xl text-right transition-all duration-300 flex items-center justify-between border ${
                  activePillar === key
                    ? 'bg-[#c5a880]/10 border-[#c5a880] shadow-[0_4px_20px_rgba(197,168,128,0.08)]'
                    : 'bg-[#1a130e]/30 border-[#c5a880]/5 text-stone-400 hover:bg-[#1a130e]/60 hover:border-[#c5a880]/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg transition-colors duration-300 ${activePillar === key ? 'bg-[#c5a880] text-[#1a130e]' : 'bg-[#241b14] text-[#c5a880]'}`}>
                    {icons[key]}
                  </span>
                  <div className="flex flex-col">
                    <span className={`font-bold text-xs md:text-sm ${activePillar === key ? 'text-[#dfc5a3]' : 'text-stone-300'}`}>
                      {value.title.split(' ')[0] + ' ' + value.title.split(' ')[1] + ' ' + (value.title.split(' ')[2] || '')}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{value.tag}</span>
                  </div>
                </div>
                
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activePillar === key ? 'bg-[#c5a880] scale-125' : 'bg-transparent'}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* الجانب الأيسر: لوحة العرض الفنية الرقمية */}
        <div className="lg:col-span-7 w-full flex flex-col gap-6">
          <div className="bg-[#1a130e]/85 border border-[#c5a880]/20 rounded-2xl p-4 md:p-6 shadow-2xl relative backdrop-blur-md overflow-hidden group">
            
            {/* إطار الصورة المعزز بمؤثرات بصرية وظلال متحفية */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 shadow-inner border border-[#c5a880]/10">
              {Object.entries(balancePillars).map(([key, value]) => (
                <div
                  key={key}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    activePillar === key ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
                  }`}
                >
                  <img 
                    src={value.image} 
                    alt={value.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a130e] via-transparent to-black/20"></div>
                  
                  {/* شارة التعريف الطافية على الصورة */}
                  <span className="absolute top-4 right-4 bg-[#1a130e]/90 text-[#c5a880] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-md border border-[#c5a880]/30 backdrop-blur-sm shadow-md">
                    {value.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* تفاصيل المحور المعرفي النشط المتناغم مع الصورة أعلاه */}
            <div className="px-2 min-h-[140px] flex flex-col justify-center transition-all duration-500 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider mb-1 block text-[#c5a880]/80">
                ✦ {balancePillars[activePillar].subtitle}
              </span>
              <h4 className="text-[#dfc5a3] font-black text-base md:text-lg mb-2.5 transition-colors duration-300">
                {balancePillars[activePillar].title}
              </h4>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-justify font-light">
                {balancePillars[activePillar].desc}
              </p>
            </div>

            {/* صف الأيقونات التفاعلية الرقمية المدمج بشكل أنيق */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[#c5a880]/10">
              <div className="bg-[#241b14]/50 p-2.5 rounded-xl text-center border border-[#c5a880]/5">
                {icons.vr}
                <span className="text-[10px] text-stone-400 block mt-1">واقع افتراضي</span>
              </div>
              <div className="bg-[#241b14]/50 p-2.5 rounded-xl text-center border border-[#c5a880]/5">
                {icons.apps}
                <span className="text-[10px] text-stone-400 block mt-1">تطبيقات تفاعلية</span>
              </div>
              <div className="bg-[#241b14]/50 p-2.5 rounded-xl text-center border border-[#c5a880]/5">
                {icons.games}
                <span className="text-[10px] text-stone-400 block mt-1">ألعاب تعليمية</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* الخط الفلسفي المضيء البارز - تم نقله إلى الأسفل تماماً وتكبيره وإبرازه بشكل فخم ومميز */}
      <div className="relative z-10 max-w-7xl w-full mt-16 text-right">
        <div className="bg-gradient-to-r from-[#1a130e]/90 to-[#241b14]/90 border border-[#c5a880]/30 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden backdrop-blur-md">
          
          {/* لمسة إضاءة خلفية خافتة للتمميز */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#c5a880]/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="bg-[#c5a880]/10 p-4 rounded-xl border border-[#c5a880]/20 flex items-center justify-center shadow-inner">
            {icons.techBadge}
          </div>
          
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#c5a880]">رؤية العرض الاستراتيجية</span>
            <p className="text-stone-200 text-sm md:text-base leading-relaxed font-light text-justify">
              ويستطرد قائلاً إن العرض المتحفي داخل قصر تاريخي، بالتوازي مع توظيف أدوات حديثة، يبعث برسالة مفادها أن: 
              <span className="text-[#dfc5a3] font-black text-base md:text-md block sm:inline sm:mr-1">
                ."الحفاظ على التراث لا يتعارض مع التطور، بل يمكنهما السير معاً جنباً إلى جنب"
              </span>
            </p>
          </div>
          
        </div>
      </div>

    </section>
  );
};

export default DevelopmentAndBalance;