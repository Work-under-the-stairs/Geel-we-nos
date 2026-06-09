import React, { useState } from 'react';

const ModernDisplayTechniques = () => {
  // حالة لمتابعة المحور النشط المختار للعرض التفاعلي في القائمة المائلة
  const [activeTab, setActiveTab] = useState('knowledge');

  // الأيقونات الهندسية النظيفة (بدون إيموجي) المتوافقة مع أسلوب العرض المتحفي
  const icons = {
    knowledge: (
      <svg className="w-10 h-10 text-stone-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    message: (
      <svg className="w-10 h-10 text-stone-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501c1.153-.086 2.294-.213 3.422-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    participation: (
      <svg className="w-10 h-10 text-stone-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    decorativeLine: (
      <svg className="w-5 h-5 text-[#c5a880] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 18a9 9 0 110-18 9 9 0 010 18z" />
      </svg>
    )
  };

  // مصفوفة البيانات المبنية بالكامل وحصرياً على النص المزود دون أي إضافات خارجية
  const museumData = {
    knowledge: {
      id: 'knowledge',
      title: "تبسيط المادة المعرفية وعناصر الجذب",
      text: "ومن هذا المنطلق، نجحت التجربة في بناء جسور التواصل مع الأجيال الجديدة بفضل تبسيط المادة المعرفية، واعتماد عناصر الجذب البصرية والتفاعلية، الأمر الذي جعل النشء أكثر تلاحماً مع تاريخهم، وأشد تمسكاً بهويتهم الثقافية في زمن الطفرات التكنولوجية المتسارعة."
    },
    message: {
      id: 'message',
      title: "رسالة متحف قصر الزعفران للأطفال",
      text: "وذكر حميدة أن متحف قصر الزعفران يوظف التجارب التفاعلية في توصيل رسالة للأطفال ملخصها أن \"التاريخ والتراث ليسا شيئاً جامداً، أو بعيداً عن حياتهم\"، بل هما تجربة حية وممتعة يمكنهم التفاعل معها، واستيعابها، والشعور بالانتماء إليها."
    },
    participation: {
      id: 'participation',
      title: "الاستكشاف والتعلم بالمشاركة والتجربة",
      text: "وغيّرت التجارب التفاعلية الصورة النمطية للمتحف التقليدي القائم على المشاهدة الصامتة، إذ باتت تدفع الطفل نحو الاستكشاف والتعلم بالمشاركة والتجربة. فحين يقترب الصغير من القطع التراثية ويتعرف على قيمتها الإنسانية والتاريخية، يبدأ في إدراك أهمية حماية هذا الموروث والحفاظ عليه للأجيال القادمة، ومن ثمَّ ينمو لديه شعورٌ بالمسؤولية والانتماء."
    }
  };

  return (
    <section className="relative min-h-screen bg-museum-grid text-stone-100 py-24 px-6 md:px-12 font-sans flex flex-col justify-center items-center overflow-hidden" dir="rtl">
      
      {/* ستايل مخصص لتطبيق شبكة الخطوط الذهبية المائلة الموازية بناءً على مرجع صورة image_0c03b3.png */}
      <style>{`
        .bg-museum-grid {
          background-color: #1a130e;
          background-image: repeating-linear-gradient(
            -35deg,
            transparent,
            transparent 45px,
            rgba(197, 168, 128, 0.04) 45px,
            rgba(197, 168, 128, 0.04) 47px
          );
        }
        .skewed-container {
          transform: rotate(-4deg);
        }
      `}</style>
      
      {/* توهج ضوئي دافئ لتعزيز الطابع المتحفي المعاصر */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* الجانب الأيمن: العنوان الرئيسي والتوثيق السردي المعتمد على النص فقط */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-right">
          <div className="flex items-center gap-3 justify-start">
            <span className="w-8 h-[2px] bg-[#c5a880] inline-block"></span>
            <span className="text-[#c5a880] font-bold text-xs uppercase tracking-wider">آليات العرض الحديثة</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            تبسيط المادة المعرفية <br />
            <span className="text-[#dfc5a3] font-light block mt-1">وتعزيز الهوية الثقافية للنشء</span>
          </h2>

          <div className="bg-[#120b06]/60 border-r-4 border-[#c5a880] p-5 rounded-l-xl backdrop-blur-sm flex items-start gap-3">
            {icons.decorativeLine}
            <p className="text-stone-300 text-sm md:text-base leading-relaxed text-justify font-light">
              نجحت التجربة المتحفية من خلال كسر الصورة النمطية للعرض التقليدي، وتوظيف الأدوات التفاعلية المباشرة لتحويل التاريخ إلى تجربة حية قريبة من وعي ومستقبل الأجيال الجديدة.
            </p>
          </div>
        </div>

        {/* الجانب الأيسر: الهيكل المائل تماماً المكون من بطاقات متراكمة قابلة للتمدد التفاعلي وفقاً لـ image_0c03b3.png */}
        <div className="lg:col-span-7 w-full flex justify-center items-center py-6">
          <div className="skewed-container flex flex-col gap-5 w-full max-w-[600px]">
            
            {/* المحور الأول: تبسيط المادة المعرفية وعناصر الجذب */}
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`w-full text-right p-6 rounded-2xl transition-all duration-500 border flex flex-col justify-center ${
                activeTab === 'knowledge'
                  ? 'bg-[#14100c] border-[#c5a880] shadow-[0_15px_40px_rgba(197,168,128,0.12)] ring-1 ring-[#c5a880]/20 scale-[1.02]'
                  : 'bg-[#120d09]/95 border-stone-800/80 text-stone-400 hover:bg-[#15100b]'
              }`}
            >
              <div className="w-full flex items-center justify-between">
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${activeTab === 'knowledge' ? 'text-[#dfc5a3]' : 'text-stone-300'}`}>
                  {museumData.knowledge.title}
                </h3>
                <div className={`transition-colors duration-300 ${activeTab === 'knowledge' ? 'text-[#dfc5a3]' : 'text-stone-600'}`}>
                  {icons.knowledge}
                </div>
              </div>
              {activeTab === 'knowledge' && (
                <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed text-justify mt-4 border-t border-stone-800/60 pt-3 transition-all duration-500">
                  {museumData.knowledge.text}
                </p>
              )}
            </button>

            {/* المحور الثاني: رسالة متحف قصر الزعفران للأطفال */}
            <button
              onClick={() => setActiveTab('message')}
              className={`w-full text-right p-6 rounded-2xl transition-all duration-500 border flex flex-col justify-center ${
                activeTab === 'message'
                  ? 'bg-[#14100c] border-[#c5a880] shadow-[0_15px_40px_rgba(197,168,128,0.12)] ring-1 ring-[#c5a880]/20 scale-[1.02]'
                  : 'bg-[#120d09]/95 border-stone-800/80 text-stone-400 hover:bg-[#15100b]'
              }`}
            >
              <div className="w-full flex items-center justify-between">
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${activeTab === 'message' ? 'text-[#dfc5a3]' : 'text-stone-300'}`}>
                  {museumData.message.title}
                </h3>
                <div className={`transition-colors duration-300 ${activeTab === 'message' ? 'text-[#dfc5a3]' : 'text-stone-600'}`}>
                  {icons.message}
                </div>
              </div>
              {activeTab === 'message' && (
                <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed text-justify mt-4 border-t border-stone-800/60 pt-3 transition-all duration-500">
                  {museumData.message.text}
                </p>
              )}
            </button>

            {/* المحور الثالث: الاستكشاف والتعلم بالمشاركة والتجربة */}
            <button
              onClick={() => setActiveTab('participation')}
              className={`w-full text-right p-6 rounded-2xl transition-all duration-500 border flex flex-col justify-center ${
                activeTab === 'participation'
                  ? 'bg-[#14100c] border-[#c5a880] shadow-[0_15px_40px_rgba(197,168,128,0.12)] ring-1 ring-[#c5a880]/20 scale-[1.02]'
                  : 'bg-[#120d09]/95 border-stone-800/80 text-stone-400 hover:bg-[#15100b]'
              }`}
            >
              <div className="w-full flex items-center justify-between">
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${activeTab === 'participation' ? 'text-[#dfc5a3]' : 'text-stone-300'}`}>
                  {museumData.participation.title}
                </h3>
                <div className={`transition-colors duration-300 ${activeTab === 'participation' ? 'text-[#dfc5a3]' : 'text-stone-600'}`}>
                  {icons.participation}
                </div>
              </div>
              {activeTab === 'participation' && (
                <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed text-justify mt-4 border-t border-stone-800/60 pt-3 transition-all duration-500">
                  {museumData.participation.text}
                </p>
              )}
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ModernDisplayTechniques;