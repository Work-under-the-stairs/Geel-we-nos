import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DigitalDocumentation = () => {
  // حالة لمتابعة نمط العرض والتوثيق المختار
  const [activeMode, setActiveMode] = useState('hologram');

  const docFeatures = {
    archive: {
      title: "التوثيق العلمي",
      target: "لأغراض البحث والتعليم بكفاءة",
      desc: "حفظ البيانات، الصور، والمعلومات الخاصة بالمقتنيات رقمياً؛ بما يضمن حمايتها والحفاظ عليها علمياً، وإتاحتها بكفاءة عالية جداً للأغراض البحثية والتعليمية للأجيال القادمة."
    },
    hologram: {
      title: "تقنيات الهولوجرام",
      target: "إضفاء بعد درامي وتفاعلي حي",
      desc: "استخدام طيف الهولوجرام لمساعدة المتحف على تقديم الشخصيات التاريخية والعناصر التراثية بصورة مجسمة، جذابة وحية، مما يسهل التواصل مع الطفل ويضاعف تأثير الرسالة المتحفية."
    },
    multimedia: {
      title: "الوسائط المتعددة",
      target: "تفاعل مباشر يجمع الصوت والصورة",
      desc: "منظومة تتيح للزائر التفاعل المباشر مع المحتوى، واستكشاف معلومات ممتدة بطريقة معاصرة تتناسب بالكامل مع طبيعة واهتمامات الجمهور الجديد المحب للبصريات."
    }
  };

  return (
    <section className="relative min-h-screen bg-[#3e2723] text-stone-100 py-20 px-6 md:px-16 font-sans dir-rtl flex flex-col justify-center items-center overflow-hidden">
      
      {/* أيقونات ديناميكية عائمة مع تأثير دمج لجعلها تبدو شفافة */}
      <motion.img 
        src="/images/mask-icon.png" 
        alt="Tutankhamun Mask"
        className="absolute top-20 right-10 w-32 opacity-20 pointer-events-none mix-blend-multiply"
        animate={{ y: [0, 30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
       

      {/* خلفية بتأثيرات دافئة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600 via-[#3e2723] to-[#261614]"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: المحتوى النصي */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="w-12 h-[2px] bg-amber-500 inline-block"></span>
            <span className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em]">التوثيق والبعد الدرامي</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-stone-50 leading-tight">
            تجسيد الشخصيات <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">بصورة حية</span>
          </h2>

          <p className="text-stone-300 text-lg leading-relaxed text-justify font-light border-r-4 border-amber-600 pr-6">
            دمج دقة التوثيق العلمي مع سحر العرض البصري. لم يعد المتحف يعرض حجراً جامداً، بل يفتح شاشات ذكية ووسائط تجمع بين <strong className="text-amber-400">الصوت والصورة والفيديو</strong> لتناسب طبيعة الأجيال الجديدة.
          </p>
        </div>

        {/* الجانب الأيسر: قاعة العرض */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-[#261614]/60 border border-amber-900/50 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl">
            
            {/* الأزرار التفاعلية */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {Object.keys(docFeatures).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMode(key)}
                  className={`p-4 text-center rounded-2xl transition-all duration-300 border ${
                    activeMode === key
                      ? 'bg-amber-600/20 border-amber-500 shadow-inner'
                      : 'bg-[#3e2723] border-amber-900/30 text-stone-400 hover:border-amber-700'
                  }`}
                >
                  <span className="block text-2xl mb-2">{key === 'archive' ? '📜' : key === 'hologram' ? '👁️' : '🏺'}</span>
                  <span className={`font-bold text-sm ${activeMode === key ? 'text-amber-400' : 'text-stone-300'}`}>
                    {docFeatures[key].title}
                  </span>
                </button>
              ))}
            </div>

            {/* صندوق العرض */}
            <div className="bg-[#1b0f0e] border border-amber-800/30 p-10 rounded-2xl min-h-[280px] flex flex-col justify-center items-start relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-4 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                {docFeatures[activeMode].target}
              </span>
              <p className="text-stone-200 text-base md:text-lg leading-loose font-medium">
                {docFeatures[activeMode].desc}
              </p>
              
              {/* زخرفة ذهبية خفيفة */}
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-amber-700/30 rounded-br-2xl"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalDocumentation;