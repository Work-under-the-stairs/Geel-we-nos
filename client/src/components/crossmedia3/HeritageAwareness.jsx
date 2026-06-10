import React from 'react';

const HeritageAwareness = () => {
  return (
    <section className="relative min-h-screen text-stone-100 pt-20 pb-20 md:pt-28 md:pb-28 px-4 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden bg-[#2d2219]">
      
      {/* حركات الدوران المداري المخصصة للهوية البصرية */}
      <style>{`
        @keyframes museumOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes museumCounterOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-museum-orbit {
          animation: museumOrbit 40s linear infinite;
        }
        .animate-museum-counter {
          animation: museumCounterOrbit 40s linear infinite;
        }
        .orbit-group:hover .animate-museum-orbit,
        .orbit-group:hover .animate-museum-counter {
          animation-play-state: paused;
        }
      `}</style>

      {/* الخلفية التراثية المتدرجة */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#201812] via-[#2d2219] to-[#1a140f] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#c5a88004_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
      {/* شبكة العرض الرئيسية المكونة من 12 عموداً */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: المحتوى المعرفي (غرس الوعي التراثي) */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-right">
          <div className="flex items-center gap-3 justify-start">
            <span className="w-12 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-xs uppercase tracking-wider">الهوية والوعي المعرفي</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#dfc5a3] leading-tight">
            غرس الوعي التراثي
          </h2>

          {/* الفقرة الأولى */}
          <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
            فحين يتعرف الطفل على إنجازات الحضارات السابقة، يدرك أن التقدم الذي يعيشه اليوم ما هو إلا امتداد 
            <strong className="text-[#dfc5a3] font-medium"> لتراكم معرفي وثقافي طويل</strong>؛ وهو ما يعزز لديه احترام التاريخ، واستيعاب قيمة الحضارة الإنسانية.
          </p>

          {/* الفقرة الثانية */}
          <div className="bg-[#1a130e]/80 border-r-4 border-[#c5a880] p-5 rounded-l-xl backdrop-blur-md shadow-xl">
            <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
              ولأن الأجيال الجديدة هي المسؤولة عن الحفاظ على هذا التراث، فإن عدم ارتباط الطفل بجذوره منذ الصغر قد يفقده وعيه بقيمتها مع مرور الزمن. ومن هذا المنطلق، يرى <strong className="text-[#dfc5a3] font-medium">حميدة</strong> أن غرس الوعي التراثي مبكراً يمثل استثماراً حقيقياً في حماية الهوية الثقافية، باعتبار أن التاريخ ليس مجرد سرد للأحداث، بل وسيلة لفهم التجارب الإنسانية وتحليلها.
            </p>
          </div>

          {/* الفقرة الثالثة */}
          <div className="p-5 rounded-2xl bg-gradient-to-l from-[#1e1610]/50 to-transparent border border-[#c5a880]/10">
            <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-justify font-light">
              كما أن التراث، بما يحتويه من قصص وفنون وعمارة وأساطير, يفتح آفاق الخيال والإبداع لدى الطفل، الذي بات يتعرض لكم هائل من المحتوى عبر منصات التواصل الاجتماعي، يعكس في أغلبه أنماطاً ثقافية بعيدة كلياً عن بيئته ومجتمعه.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: مشغل الفيديو المحلي الفاخر المدمج بالتصميم المتحفي */}
        <div className="lg:col-span-6 w-full flex justify-center items-center py-6">
          <div className="w-full max-w-[640px] bg-[#14100c] border border-[#c5a880]/40 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
            
            {/* تأثير توهج خلفي ناعم */}
            <div className="absolute inset-0 bg-[#c5a880]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* حاوية الفيديو بنسبة عرض 16:9 القياسية */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-stone-800/80 z-10 bg-black">
              <video
                className="absolute top-0 left-0 w-full h-full object-contain"
                src="assets/crossmedia3/vedio.mp4"
                controls
                playsInline
                preload="metadata"
              >
                تصفحك لا يدعم تشغيل هذا الفيديو.
              </video>
            </div>

            {/* شريط زينة سفلي يعكس فخامة الهوية البصرية للمتحف */}
            <div className="w-1/4 h-[2px] bg-[#c5a880]/60 mx-auto mt-3 rounded-full opacity-60"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeritageAwareness;