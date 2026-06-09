import React, { useState, useEffect } from 'react';

// تأكدي من وضع الصور في مسار: public/images/
const images = [
  "/images/palais-tech.jpg", 
  "/images/vr-headset.jpg",   
  "/images/egyptian-tablet.jpeg" 
];

const DigitalTriumph = () => {
  const [techMode, setTechMode] = useState('vr');
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const techDetails = {
    vr: { 
      title: "🕶️ الواقع الافتراضي (VR)", 
      badge: "تجربة غامرة", 
      desc: "أتاحت للزائر خوض تجربة غامرة داخل البيئة التاريخية، والتفاعل مع عناصر التراث بصورة حية، بما يمنحه شعوراً بأنه يعيش في قلب الحدث نفسه، ويرفع من القيمة التعليمية والتجربة الحسية للمتحف." 
    },
    ar: { 
      title: "📱 الواقع المعزز (AR)", 
      badge: "طبقات رقمية", 
      desc: "ساعدت في إضافة طبقات رقمية وشرح تفاعلي فوق القطع والمقتنيات؛ بما يتيح للزائر مشاهدة معلومات إضافية، أو إعادة تصور الهيئة الأصلية للعناصر التاريخية، بأسلوب عصري عبر الأجهزة الذكية والشاشات المتاحة بالقاعات." 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden font-sans dir-rtl">
      
      {/* خلفية تفاعلية مع تأثير Fade */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${currentImg === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* القسم النصي */}
        <div className="lg:col-span-5 space-y-8 bg-black/40 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            توظيف التكنولوجيا الرقمية <br />
            <span className="text-amber-400 text-3xl">فوز متحف قصر الزعفران</span>
          </h2>
          <p className="text-gray-100 text-lg leading-relaxed">
            استشهد حميدة بفوز متحف قصر الزعفران بجائزة أفضل توظيف للتكنولوجيا الرقمية في الممارسات المتحفية، 
            ليكون تتويجاً لرؤية اعتمدت على دمج التراث بالتقنيات الحديثة؛ ليس بهدف الإبهار البصري وحده، 
            بل لتطوير أساليب التوثيق والعرض والتفاعل مع الجمهور والأجيال الجديدة.
          </p>

          {/* أزرار التبديل */}
          <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
            {['vr', 'ar'].map((mode) => (
              <button
                key={mode}
                onClick={() => setTechMode(mode)}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  techMode === mode 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg shadow-amber-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode === 'vr' ? 'الواقع الافتراضي' : 'الواقع المعزز'}
              </button>
            ))}
          </div>
        </div>

        {/* بطاقة عرض التفاصيل */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-500">
          <h3 className="text-2xl font-bold mb-6 text-white">{techDetails[techMode].title}</h3>
          <p className="text-gray-100 text-lg leading-relaxed min-h-[150px]">
            {techDetails[techMode].desc}
          </p>
          <div className="mt-8 pt-6 border-t border-white/10 text-amber-400 font-bold text-sm">
              #{techDetails[techMode].badge}
          </div>
        </div>
      </div>

      {/* الموجة الزخرفية */}
      <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
        <svg className="block w-full h-[90px] md:h-[130px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44C58.3,10.25,0,0,0,0V120H1200V0c0,0-93.34,58.09-256.88,58.09-110.78,0-203.88-39.79-321.73-39.79C487.2,18.3,432.49,75.24,321.39,56.44Z" fill="#2d2219" />
        </svg>
      </div>
    </section>
  );
};

export default DigitalTriumph;