import React from 'react';

const AboutUs = () => {
  const designers = [
    { name: "رحيق أيمن", url: "https://www.linkedin.com/in/raheeq-ayman-8b12a3281/" },
    { name: "تسنيم علاء", url: "https://www.linkedin.com/in/tasneem-alaa" },
    { name: "إيمان أشرف", url: "https://www.linkedin.com/in/eman-ashraf-fullstack/" },
  ];

  return (
    <div className="min-h-screen bg-white text-primary font-arabic py-16 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 relative inline-block">
          من نحن
          <span className="absolute bottom-[-10px] right-0 left-0 h-1.5 bg-secondary rounded-full"></span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        
        <section className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify">
            مشروع تخرج موقع «جيل ونص» هو أول موقع إلكتروني تم إطلاقه للدفعة الأولى لقسم الصحافة الإخبارية تخصص الصحافة الرقمية المصورة كلية الإعلام جامعة عين شمس ٢٠٢٦، ويقدم الموقع محتوى متخصصًا لمناقشة كل ما يخص الأسرة المصرية والجيل الحالي ومعالجتها في أشكال صحفية متنوعة حديثة وتقليدية ما بين؛ الكروس ميديا والبودكاست والإنفوجراف والفيديوجراف والتقارير المصورة والحوارات والتحقيقات.
          </p>
        </section>

        <section className="bg-primary text-white p-8 md:p-10 rounded-3xl shadow-lg">
          <p className="text-lg md:text-xl leading-relaxed text-slate-100 text-justify">
            يتبع مشروع تخرج موقع «جيل ونص» كلية الإعلام جامعة عين شمس، تحت رئاسة الأستاذة الدكتورة هبة شاهين عميدة الكلية، والإشراف العام الدكتورة مروة سعيد المدرس بقسم الصحافة الإخبارية بالكلية، ورئيس التحرير الأستاذة خلود خالد المعيدة بقسم الصحافة الإخبارية بالكلية.
          </p>
        </section>

        <section className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify">
            ويتكون فريق تحرير مشروع تخرج موقع «جيل ونص» من الطلاب (بسنت رائد- تقى عبد العزيز- جرجس نجيب- حبيبة هشام- حمزة النجار- سما هارون- عمر طارق- عمرو حامد- فوزي محمد- محمد وليد- ملك عفيفي- ملك محمود- ميسره سعيد).
          </p>
        </section>

        <section className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-justify">
            ويتكون فريق تصميم موقع «جيل ونص» من  (
            {designers.map((designer, index) => (
              <span key={index}>
                <a 
                  href={designer.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#17738a] font-semibold hover:text-secondary transition-colors duration-200 mx-1"
                >
                  {designer.name}
                </a>
                {index < designers.length - 1 ? ' - ' : ''}
              </span>
            ))}
            ).
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;