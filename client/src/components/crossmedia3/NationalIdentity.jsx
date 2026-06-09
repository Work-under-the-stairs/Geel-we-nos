import React, { useState } from 'react';

const NationalIdentity = () => {
  // حالة لمتابعة النقطة التاريخية النشطة داخل القصر
  const [activeFact, setActiveFact] = useState('naming');

  // البيانات التاريخية لقصر الزعفران
  const palaceFacts = {
    date: {
      title: "التشييد العريق (1901-1902)",
      desc: "يعود تاريخ تشييد هذا القصر التاريخي العريق إلى عامي 1901-1902 ليصبح شاهداً حياً على تاريخ مصر الحديث، ويشغل اليوم مقر إدارة جامعة عين شمس العريقة بالقاهرة."
    },
    naming: {
      title: "سر التسمية الفواحة",
      desc: "يرجع سر تسميته بـ 'قصر الزعفران' إلى حدائق الزعفران الشاسعة التي كانت تحيط به من كل جانب، وتعطّر أجواء المنطقة برائحتها الذكية والساحرة."
    },
    treaty: {
      title: "معاهدة 1936 الشهيرة",
      desc: "لم يكن القصر مجرد مبنى جميل، بل احتضنت قاعاته التاريخية الفخمة حدثاً سياسياً غير مجرى التاريخ؛ وهو توقيع معاهدة 1936 الشهيرة بين مصر وبريطانيا."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#111827] via-[#1f1610] to-[#1a120b] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* بتلات الزعفران الافتراضية العائمة في الخلفية */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-amber-500 rounded-full blur-sm animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 right-12 w-6 h-6 bg-yellow-600 rounded-full blur-md animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-amber-400 rounded-full opacity-70 animate-bounce" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: رأي الخبير والتحول التفاعلي */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-400 inline-block"></span>
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">المحور الأول: تعزيز الهوية الوطنية</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            المتاحف.. من قاعات جامدة إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">مختبرات لصناعة الوعي</span>
          </h2>

          {/* اقتباس د. ولاء الدين بدوي بتصميم سينمائي */}
          <div className="bg-white/5 border-r-4 border-amber-400 p-6 rounded-l-xl backdrop-blur-md relative mt-4">
            <span className="absolute -top-4 right-4 text-6xl text-amber-400/20 font-serif">“</span>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed text-justify font-light">
              يؤكد <strong className="text-amber-300 font-normal">الدكتور ولاء الدين بدوي</strong> (خبير المتاحف والتراث ومدير متحف الآثار بقصر الزعفران) أن المتاحف باتت تلعب دوراً محورياً في تعزيز الهوية الوطنية لدى الأطفال؛ إذ تحولت إلى مؤسسات تعليمية وثقافية تفاعلية تُسهم في بناء وعي الأجيال، بعد أن كانت في السابق مجرد قاعات جامدة لعرض القطع الأثرية.
            </p>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            الهدف الآن هو تقديم التاريخ بأسلوب مبسط يعتمد فيه الطفل على <span className="text-cyan-400">الصورة والتجربة</span> بدلاً من النصوص الجامدة، عبر التقنيات الرقمية التي تجعل الماضي جزءاً لا يتجزأ من هويته الحاضرة.
          </p>
        </div>

        {/* الجانب الأيسر: اللوحة التفاعلية لقصر الزعفران (صندوق الاكتشاف) */}
        <div className="lg:col-span-6 w-full flex flex-col items-center">
          <div className="w-full bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-3xl relative">
            
            {/* واجهة تحكم علوية تشبه أجهزة المتحف الرقمية */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <span className="text-xs text-gray-400 font-mono">MODEL: ZAFAARAN_PALACE.📸</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
              </div>
            </div>

            {/* أزرار استكشاف معالم القصر */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {Object.keys(palaceFacts).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFact(key)}
                  className={`py-2 px-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeFact === key
                      ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {key === 'date' && '🗓️ التشييد'}
                  {key === 'naming' && '🪻 سر التسمية'}
                  {key === 'treaty' && '📜 معاهدة 1936'}
                </button>
              ))}
            </div>

            {/* شاشة عرض معلومات القصر التفاعلية */}
            <div className="bg-black/50 border border-amber-400/20 p-6 rounded-xl min-h-[180px] flex flex-col justify-center transition-all duration-500">
              <h3 className="text-amber-300 font-bold text-lg mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                {palaceFacts[activeFact].title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
                {palaceFacts[activeFact].desc}
              </p>
            </div>

            {/* تلميح بصري للمستخدم */}
            <p className="text-center text-[11px] text-gray-500 mt-4 italic">
              * اضغط على التبويبات بالأعلى للتنقل بين أسرار القصر التاريخية
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default NationalIdentity;