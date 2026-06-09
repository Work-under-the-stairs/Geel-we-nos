import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FutureEngagement = () => {
  const [experienceMode, setExperienceMode] = useState('interactive');
  const [futureTab, setFutureTab] = useState('ai');

  const futureVision = {
    ai: {
      title: " رادار الذكاء الاصطناعي (AI)",
      badge: "الرؤية المستقبلية",
      desc: "يمثل التوسع في دمج أدوات الذكاء الاصطناعي جزءاً أساسياً من خطة التطوير القادمة داخل قصر الزعفران، لمواكبة التحول العالمي نحو مؤسسات متحفية تتوقع اهتمامات الطفل وتخصص له مساراً معرفياً ذكياً يناسب فضوله."
    },
    generalization: {
      title: " تعميم التجربة على متاحف مصر",
      badge: "الاستراتيجية الوطنية",
      desc: "إمكانية نقل فلسفة قصر الزعفران الناجحة إلى مختلف متاحف الجمهورية؛ عبر المزاوجة بين الهوية التاريخية والتكنولوجيا، وتحويل القاعات الجامدة إلى مؤسسات تفاعلية قادرة على التواصل الفعّال مع المجتمع."
    }
  };

  return (
    // الخلفية باللون البني الغامق
    <section className="relative min-h-screen bg-[#2d1b19] text-stone-100 py-16 px-6 md:px-12 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* الجانب الأيمن */}
        <div className="lg:col-span-6 w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500 inline-block"></span>
            <span className="text-amber-500 font-bold text-sm uppercase tracking-wider">المحور الحادي عشر: تكرار الزيارة واستدامة الوعي</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-stone-50 leading-tight">
            من متلقٍ سلبي إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">مستكشف يطرح الأسئلة!</span>
          </h2>

          <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
            يوضح د. حميدة أن التكنولوجيا غيرت معادلة الاستيعاب؛ فالطفل لم يعد يكتفي بالمشاهدة العابرة بل أصبح أكثر تركيزاً، وكل جولة باتت تحمل له عنصراً متجدداً يدفعه لتكرار الزيارة. اضغط لمعاينة سلوك الطفل:
          </p>

          {/* الصناديق باللون البني الفاتح */}
          <div className="bg-[#4e342e] border border-amber-900/30 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex bg-[#3e2723] p-1 rounded-xl border border-amber-900/50">
              <button
                onClick={() => setExperienceMode('traditional')}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                  experienceMode === 'traditional' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'text-stone-400'
                }`}
              >
                  أسلوب العرض القديم
              </button>
              <button
                onClick={() => setExperienceMode('interactive')}
                className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                  experienceMode === 'interactive' ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30' : 'text-stone-400'
                }`}
              >
                 توظيف الوسائط الرقمية
              </button>
            </div>

            <div className="min-h-[100px] flex flex-col justify-center">
              {experienceMode === 'traditional' ? (
                <div className="text-stone-300 text-sm leading-relaxed text-justify flex items-start gap-2">
                  <p>في السابق، كان الأطفال يشعرون <span className="text-amber-400 font-semibold">بالملل السريع</span> نتيجة التلقين العابر والمشاهدة الصامتة خلف زجاج مغلق، مما يجعل الزيارة روتينية ولا تولد أي رغبة في العودة.</p>
                </div>
              ) : (
                <div className="text-stone-100 text-sm leading-relaxed text-justify flex items-start gap-2">
                  <p>الآن، أضحى الطفل <span className="text-amber-400 font-semibold">يضغط، يستكشف، يتفاعل، ويشارك بنفسه</span> عبر الألعاب والواقع الافتراضي، مما يضاعف ارتباطه بالمحتوى ويدفعه للمطالبة بتكرار الزيارة للاكتشاف.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* الجانب الأيسر */}
        <div className="lg:col-span-6 w-full">
          {/* الصندوق باللون البني الفاتح */}
          <div className="bg-[#4e342e] border border-amber-800/30 rounded-2xl p-6 md:p-8 relative">
            
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-bold text-stone-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  قصر الزعفران ونوافذ الغد الرقمي
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => setFutureTab('ai')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  futureTab === 'ai'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-[#3e2723] border-transparent text-stone-400'
                }`}
              >
                  ذكاء اصطناعي مستقبلي
              </button>
              <button
                onClick={() => setFutureTab('generalization')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  futureTab === 'generalization'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-[#3e2723] border-transparent text-stone-400'
                }`}
              >
                  خطة التعميم الوطني
              </button>
            </div>

            <div className="bg-[#3e2723] border border-amber-900/50 p-5 rounded-xl min-h-[160px] flex flex-col justify-center">
              <div className="flex items-center justify-between gap-2 border-b border-stone-700 pb-2 mb-3">
                <h4 className="font-bold text-sm md:text-base text-amber-200">
                  {futureVision[futureTab].title}
                </h4>
                <span className="text-[9px] font-bold bg-amber-900 text-amber-400 px-2 py-0.5 rounded-full">
                  {futureVision[futureTab].badge}
                </span>
              </div>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed text-justify font-light">
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