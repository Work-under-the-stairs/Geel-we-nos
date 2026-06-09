import React from 'react';

const OurVision = () => {
  return (
    <div className="min-h-screen bg-white text-[#111827] font-arabic py-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 relative inline-block">
          رؤيتنا
          <span className="absolute bottom-[-10px] right-0 left-0 h-1.5 bg-secondary rounded-full"></span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <section className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-primary"></div>
          
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 text-justify font-medium">
            - يلتزم الفريق التحريري لموقع «جيل ونص» بمعايير الصحافة الأخلاقية، والتحقق الدقيق قبل النشر، كما يُدعم الموقع الموضوعات الصحفية بالوسائط المتعددة (الفيديو- الصوت- الصورة)، وأساليب التفاعلية مع المستخدمين.
          </p>
        </section>
      </div>
    </div>
  );
};

export default OurVision;