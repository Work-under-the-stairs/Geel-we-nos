import React from 'react';

const PublishingPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-primary font-arabic py-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 relative inline-block">
          سياسة النشر
          <span className="absolute bottom-[-10px] right-0 left-0 h-1.5 bg-secondary rounded-full"></span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-slate-50 border-r-4 border-primary p-6 rounded-l-2xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify font-medium">
            - يحتفظ موقع «جيل ونص» بكل حقوق نشر المحتوى المنشور على الموقع، ولا يجوز لأي طرف إذاعة أو تنزيل أو نشر أو طباعة أو اقتباس دون إذن مُسبق من المؤسسة التعليمية التابع لها الموقع.
          </p>
        </div>

        <div className="bg-slate-50 border-r-4 border-secondary p-6 rounded-l-2xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify font-medium">
            - يهدف فريق تحرير موقع «جيل ونص» إلى بناء مجتمع تفاعلي بين القراء والمحتوى المنشور، عن طريق نشر مشاركات القراء، وتخضع التعليقات للمراجعة، كما تقع المسؤولية الأدبية والقانونية على صاحبها، ولا تعبر بأي شكل من الأشكال عن رأي المؤسسة، مع الاحتفاظ بحق «جيل ونص» في حجب التعليقات التي تخرق سياسة النشر.
          </p>
        </div>

        <div className="bg-slate-50 border-r-4 border-primary p-6 rounded-l-2xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify font-medium">
            - وتعتمد سياسة النشر لدى موقع «جيل ونص» بعدم قبول أي تعليق يحتوي على ألفاظ خادشة للحياء، أو سباب، أو تحض على الكراهية، أو التمييز.
          </p>
        </div>

        <div className="bg-primary text-white border-r-4 border-secondary p-6 rounded-l-2xl shadow-md">
          <p className="text-lg md:text-xl leading-relaxed text-slate-100 text-justify font-medium">
            - التسجيل في موقع «جيل ونص»، يتطلب تزويدنا بالإسم وعنوان البريد الإلكتروني، ونحن نستخدم هذه المعلومات فقط في التثبت من حقكم في المشاركة التفاعلية لإدارة محتوى الموقع بالشكل الذي يليق بالقراء، وفي كل الأحوال يلتزم موقع «جيل ونص» بحماية خصوصية مستخدمي الموقع.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PublishingPolicy;