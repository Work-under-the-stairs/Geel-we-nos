import React, { useState } from 'react';

// تأكد من وضع الصور في مجلد public واستخدام المسارات الصحيحة
const PHARAOH_IMAGE_URL = "images/pharaoh-mask.png"; 

const DigitalDocumentation = () => {
  const [activeMode, setActiveMode] = useState('hologram');

  const docFeatures = {
    archive: {
      icon: '📜',
      title: "التوثيق العلمي",
      target: "لأغراض البحث والتعليم بكفاءة",
      desc: "حفظ البيانات، الصور، والمعلومات الخاصة بالمقتنيات رقمياً؛ بما يضمن حمايتها والحفاظ عليها علمياً، وإتاحتها بكفاءة عالية جداً للأغراض البحثية والتعليمية للأجيال القادمة."
    },
    hologram: {
      icon: '👁️',
      title: "تقنيات الهولوجرام",
      target: "إضفاء بعد درامي وتفاعلي حي",
      desc: "استخدام طيف الهولوجرام لمساعدة المتحف على تقديم الشخصيات التاريخية والعناصر التراثية بصورة مجسمة، جذابة وحية، مما يسهل التواصل مع الطفل ويضاعف تأثير الرسالة المتحفية."
    },
    multimedia: {
      icon: '🏺',
      title: "الوسائط المتعددة",
      target: "تفاعل مباشر يجمع الصوت والصورة",
      desc: "منظومة تتيح للزائر التفاعل المباشر مع المحتوى، واستكشاف معلومات ممتدة بطريقة معاصرة تتناسب بالكامل مع طبيعة واهتمامات الجمهور الجديد المحب للبصريات."
    }
  };

  return (
    <>
      <style>{`
        @keyframes floatMask {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          33%      { transform: translateY(-22px) rotate(0deg); }
          66%      { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(201,168,76,0.5)); }
          50%      { filter: drop-shadow(0 0 30px rgba(201,168,76,0.9)) drop-shadow(0 0 50px rgba(201,168,76,0.4)); }
        }
        .mask-float {
          animation: floatMask 6s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
        }
        .feature-btn { transition: all 0.25s ease; }
        .feature-btn:hover { transform: translateY(-2px); }
      `}</style>

      <section
        dir="rtl"
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #3e2723 0%, #261614 60%, #1b0f0e 100%)',
          color: '#f5e8d0',
          padding: '80px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          fontFamily: "'Georgia', serif",
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(201,168,76,0.12) 0%, transparent 65%)',
        }} />

        {/* صورة القناع الرئيسية */}
        <img
          src={PHARAOH_IMAGE_URL}
          alt="Pharaoh Mask"
          className="mask-float"
          style={{
            position: 'absolute',
            top: 40,
            right: 48,
            width: 140,
            pointerEvents: 'none',
            zIndex: 1,
            objectFit: 'contain'
          }}
        />

        {/* صورة القناع المعكوسة */}
        <img
          src={PHARAOH_IMAGE_URL}
          alt="Pharaoh Mask Mirror"
          style={{
            position: 'absolute',
            bottom: 60,
            left: 32,
            width: 80,
            opacity: 0.35,
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'floatMask 9s ease-in-out infinite reverse',
            transform: 'scaleX(-1)',
            objectFit: 'contain'
          }}
        />

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}>

          {/* عمود النص */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #C9A84C, #E8C878)', display: 'inline-block', borderRadius: 2 }} />
              <span style={{ color: '#C9A84C', fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>
                التوثيق والبعد الدرامي
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, lineHeight: 1.15, margin: 0, color: '#F5EDD6' }}>
              تجسيد الشخصيات<br />
              <span style={{ background: 'linear-gradient(90deg, #E8C878, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                بصورة حية
              </span>
            </h2>

            <p style={{ fontFamily: "'Arial', sans-serif", fontSize: 16, lineHeight: 1.85, color: 'rgba(245,237,214,0.72)', borderRight: '3px solid #C9A84C', paddingRight: 20, margin: 0, textAlign: 'justify' }}>
              دمج دقة التوثيق العلمي مع سحر العرض البصري. لم يعد المتحف يعرض حجراً جامداً، بل يفتح شاشات ذكية ووسائط تجمع بين{' '}
              <strong style={{ color: '#E8C878' }}>الصوت والصورة والفيديو</strong>{' '}
              لتناسب طبيعة الأجيال الجديدة.
            </p>
          </div>

          {/* لوحة التحكم */}
          <div style={{ background: 'rgba(38,22,20,0.7)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '40px 36px', backdropFilter: 'blur(8px)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
              {Object.keys(docFeatures).map((key) => {
                const active = activeMode === key;
                return (
                  <button key={key} className="feature-btn" onClick={() => setActiveMode(key)} style={{ padding: '16px 8px', textAlign: 'center', borderRadius: 12, border: active ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.15)', background: active ? 'rgba(201,168,76,0.15)' : 'rgba(62,39,35,0.8)', cursor: 'pointer' }}>
                    <span style={{ display: 'block', fontSize: 26, marginBottom: 8 }}>{docFeatures[key].icon}</span>
                    <span style={{ fontFamily: "'Arial', sans-serif", fontSize: 12, fontWeight: 700, color: active ? '#E8C878' : 'rgba(245,237,214,0.55)' }}>{docFeatures[key].title}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ background: '#1b0f0e', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '36px 32px', minHeight: 220, position: 'relative' }}>
              <span style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 999, color: '#C9A84C', fontFamily: "'Arial', sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
                {docFeatures[activeMode].target}
              </span>
              <p style={{ fontFamily: "'Arial', sans-serif", fontSize: 15, lineHeight: 1.9, color: 'rgba(245,237,214,0.82)', margin: 0 }}>{docFeatures[activeMode].desc}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalDocumentation;