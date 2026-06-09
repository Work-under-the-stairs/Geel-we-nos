import React, { useState } from 'react';

const FutureEngagement = () => {
  // حالة لمتابعة نمط تجربة الطفل (العرض التقليدي ضد التفاعلي المعاصر)
  const [experienceMode, setExperienceMode] = useState('interactive');
  // حالة لمتابعة نافذة الرؤية المستقبلية (الذكاء الاصطناعي والتعميم)
  const [futureTab, setFutureTab] = useState('ai');

  const futureVision = {
    ai: {
      title: "🤖 رادار الذكاء الاصطناعي (AI)",
      badge: "الرؤية المستقبلية",
      desc: "يمثل التوسع في دمج أدوات الذكاء الاصطناعي جزءاً أساسياً من خطة التطوير القادمة داخل قصر الزعفران، لمواكبة التحول العالمي نحو مؤسسات متحفية تتوقع اهتمامات الطفل وتخصص له مساراً معرفياً ذكياً يناسب فضوله."
    },
    generalization: {
      title: "🗺️ تعميم التجربة على متاحف مصر",
      badge: "الاستراتيجية الوطنية",
      desc: "إمكانية نقل فلسفة قصر الزعفران الناجحة إلى مختلف متاحف الجمهورية؛ عبر المزاوجة بين الهوية التاريخية والتكنولوجيا، وتحويل القاعات الجامدة إلى مؤسسات تفاعلية قادرة على التواصل الفعّال مع المجتمع."
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#061d24] text-white py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* دوائر نيون مشعة خفيفة في الخلفية ترمز للمستقبل والذكاء الاصطناعي */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن: كسر الملل وتكرار الزيارة (اللوحة التفاعلية الأولى) */}
        <div className="lg:col-span-6 w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span>
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">المحور الحادي عشر: تكرار الزيارة واستدامة الوعي</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-100 leading-tight">
            من متلقٍ سلبي إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300">مستكشف يطرح الأسئلة!</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify font-light">
            يوضح د. حميدة أن التكنولوجيا غيرت معادلة الاستيعاب؛ فالطفل لم يعد يكتفي بالمشاهدة العابرة بل أصبح أكثر تركيزاً، وكل جولة باتت تحمل له عنصراً متجدداً يدفعه لتكرار الزيارة. اضغط لمعاينة سلوك الطفل:
          </p>

          {/* وحدة التحكم في معاينة سلوك الطفل */}
          <div className="bg-black/40 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex flex-col gap-4">
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setExperienceMode('traditional')}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                  experienceMode === 'traditional' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-400'
                }`}
              >
                🚫 أسلوب العرض القديم
              </button>
              <button
                onClick={() => setExperienceMode('interactive')}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                  experienceMode === 'interactive' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400'
                }`}
              >
                ✨ توظيف الوسائط الرقمية
              </button>
            </div>

            {/* شاشة رصد رد فعل الطفل الافتراضية */}
            <div className="min-h-[100px] flex flex-col justify-center">
              {experienceMode === 'traditional' ? (
                <div className="text-gray-400 text-sm leading-relaxed text-justify flex items-start gap-2 animate-fadeIn">
                  <span className="text-red-400 text-base">😞</span>
                  <p>في السابق، كان الأطفال يشعرون <span className="text-red-400 font-semibold">بالملل السريع</span> نتيجة التلقين العابر والمشاهدة الصامتة خلف زجاج مغلق، مما يجعل الزيارة روتينية ولا تولد أي رغبة في العودة.</p>
                </div>
              ) : (
                <div className="text-gray-200 text-sm leading-relaxed text-justify flex items-start gap-2 animate-fadeIn">
                  <span className="text-emerald-400 text-base">🤩</span>
                  <p>الآن، أضحى الطفل <span className="text-emerald-400 font-semibold">يضغط، يستكشف، يتفاعل، ويشارك بنفسه</span> عبر الألعاب والواقع الافتراضي، مما يضاعف ارتباطه بالمحتوى ويدفعه للمطالبة بتكرار الزيارة للاكتشاف.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: الذكاء الاصطناعي والمستقبل (اللوحة التفاعلية الثانية) */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-black/50 border border-emerald-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-lg shadow-2xl relative">
            
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-bold text-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                🚀 قصر الزعفران ونوافذ الغد الرقمي
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                انقر على التبويبات لاستشراف دمج الذكاء الاصطناعي وتعميق التجربة محلياً:
              </p>
            </div>

            {/* أزرار التنقل بين الذكاء الاصطناعي والتعميم */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => setFutureTab('ai')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  futureTab === 'ai'
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
              >
                🤖 ذكاء اصطناعي مستقبلي
              </button>
              <button
                onClick={() => setFutureTab('generalization')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  futureTab === 'generalization'
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
              >
                🗺️ خطة التعميم الوطني
              </button>
            </div>

            {/* شاشة محاكاة رؤية الغد المضيئة */}
            <div className="bg-emerald-950/10 border border-emerald-500/20 p-5 rounded-xl min-h-[160px] flex flex-col justify-center transition-all duration-500">
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2 mb-3">
                <h4 className="font-bold text-sm md:text-base text-gray-200">
                  {futureVision[futureTab].title}
                </h4>
                <span className="text-[9px] font-bold bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  {futureVision[futureTab].badge}
                </span>
              </div>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed text-justify font-light">
                {futureVision[futureTab].desc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FutureEngagement;