import React, { useState } from 'react';

// ── Inline SVG Pharaoh Mask ───────────────────────────────────────────────
const PharaohMaskSVG = ({ style }) => (
  <svg
    viewBox="0 0 160 260"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    aria-hidden="true"
  >
    {/* Nemes headdress stripes */}
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8C878" />
        <stop offset="50%" stopColor="#C9A84C" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1A4A8A" />
        <stop offset="100%" stopColor="#0D2B5C" />
      </linearGradient>
      <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D4A843" />
        <stop offset="100%" stopColor="#A07820" />
      </linearGradient>
    </defs>

    {/* ── Nemes side-panels ── */}
    <path d="M 30 60 Q 8 100 12 180 L 35 175 Q 32 110 42 70 Z" fill="url(#goldGrad)" />
    <path d="M 130 60 Q 152 100 148 180 L 125 175 Q 128 110 118 70 Z" fill="url(#goldGrad)" />

    {/* Nemes stripes on side panels */}
    {[80, 95, 110, 125, 140, 155, 170].map((y, i) => (
      <React.Fragment key={i}>
        <line x1="13" y1={y} x2="34" y2={y - 2} stroke="#8B6914" strokeWidth="1.5" opacity="0.6" />
        <line x1="147" y1={y} x2="126" y2={y - 2} stroke="#8B6914" strokeWidth="1.5" opacity="0.6" />
      </React.Fragment>
    ))}

    {/* ── Nemes top (headdress crown) ── */}
    <path d="M 42 70 Q 50 20 80 15 Q 110 20 118 70 Q 100 55 80 53 Q 60 55 42 70 Z" fill="url(#goldGrad)" />

    {/* Crown stripes */}
    {[30, 38, 46, 54].map((y, i) => (
      <line key={i} x1={60 - i * 3} y1={y} x2={100 + i * 3} y2={y} stroke="#8B6914" strokeWidth="1.2" opacity="0.5" />
    ))}

    {/* Uraeus (cobra) on forehead */}
    <path d="M 75 28 Q 73 20 78 15 Q 83 10 85 15 Q 87 20 82 24 Q 88 22 90 16 Q 88 8 82 6 Q 74 5 72 14 Q 70 22 75 28 Z" fill="#C9A84C" />
    <ellipse cx="81" cy="8" rx="4" ry="3" fill="#E8C878" />
    {/* Cobra head */}
    <ellipse cx="83" cy="6" rx="3" ry="2.5" fill="#C9A84C" />
    <circle cx="82" cy="5" r="0.8" fill="#1A1A1A" />

    {/* ── Face ── */}
    <path d="M 42 70 Q 38 120 42 160 Q 50 210 80 218 Q 110 210 118 160 Q 122 120 118 70 Q 100 55 80 53 Q 60 55 42 70 Z" fill="url(#faceGrad)" />

    {/* Face shading */}
    <path d="M 42 70 Q 40 120 44 155 Q 50 195 65 210 Q 50 180 48 140 Q 44 100 46 72 Z" fill="rgba(0,0,0,0.12)" />

    {/* ── Eyes ── */}
    {/* Left eye */}
    <ellipse cx="62" cy="105" rx="13" ry="8" fill="#1A0A00" />
    <ellipse cx="62" cy="105" rx="10" ry="6" fill="#2A1500" />
    <ellipse cx="62" cy="105" rx="6" ry="5" fill="#0A0A0A" />
    <circle cx="62" cy="105" r="3.5" fill="#111" />
    <circle cx="64" cy="103" r="1.2" fill="rgba(255,255,255,0.7)" />
    {/* Kohl eye-line left */}
    <path d="M 48 105 Q 55 100 62 99 Q 72 99 76 103 L 75 107 Q 70 111 62 111 Q 52 110 48 105 Z" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
    {/* Extended kohl line */}
    <line x1="48" y1="105" x2="40" y2="103" stroke="#1A1A1A" strokeWidth="1.5" />

    {/* Right eye */}
    <ellipse cx="98" cy="105" rx="13" ry="8" fill="#1A0A00" />
    <ellipse cx="98" cy="105" rx="10" ry="6" fill="#2A1500" />
    <ellipse cx="98" cy="105" rx="6" ry="5" fill="#0A0A0A" />
    <circle cx="98" cy="105" r="3.5" fill="#111" />
    <circle cx="100" cy="103" r="1.2" fill="rgba(255,255,255,0.7)" />
    {/* Kohl eye-line right */}
    <path d="M 112 105 Q 105 100 98 99 Q 88 99 84 103 L 85 107 Q 90 111 98 111 Q 108 110 112 105 Z" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
    <line x1="112" y1="105" x2="120" y2="103" stroke="#1A1A1A" strokeWidth="1.5" />

    {/* ── Nose ── */}
    <path d="M 78 115 Q 75 130 74 140 Q 78 145 80 145 Q 82 145 86 140 Q 85 130 82 115 Z" fill="rgba(0,0,0,0.15)" />
    <path d="M 74 140 Q 70 144 68 147 L 92 147 Q 90 144 86 140 Z" fill="rgba(0,0,0,0.2)" />

    {/* ── Lips ── */}
    <path d="M 68 158 Q 74 155 80 156 Q 86 155 92 158 Q 86 162 80 162 Q 74 162 68 158 Z" fill="#8B4513" />
    <path d="M 68 158 Q 74 155 80 156 Q 86 155 92 158" fill="none" stroke="#6B3410" strokeWidth="1" />

    {/* ── Collar / Usekh ── */}
    {/* Outer arc */}
    <path d="M 35 178 Q 38 200 42 218 Q 55 230 80 233 Q 105 230 118 218 Q 122 200 125 178 Z" fill="url(#goldGrad)" />
    {/* Blue collar band */}
    <path d="M 37 182 Q 40 198 44 212 Q 57 224 80 227 Q 103 224 116 212 Q 120 198 123 182 Z" fill="url(#blueGrad)" />
    {/* Gold inner */}
    <path d="M 42 186 Q 45 200 50 210 Q 62 220 80 223 Q 98 220 110 210 Q 115 200 118 186 Z" fill="url(#goldGrad)" />
    {/* Collar stripes */}
    {[190, 198, 206, 214].map((y, i) => (
      <path
        key={i}
        d={`M ${46 + i * 2} ${y} Q 80 ${y + 3} ${114 - i * 2} ${y}`}
        fill="none"
        stroke="#8B6914"
        strokeWidth="1.2"
        opacity="0.5"
      />
    ))}
    {/* Collar dots */}
    {[0, 1, 2, 3, 4, 5, 6].map((j) => (
      <circle key={j} cx={52 + j * 8} cy="195" r="2" fill="#E8C878" opacity="0.7" />
    ))}

    {/* ── Beard ── */}
    <path d="M 70 218 Q 72 240 75 252 Q 78 258 80 258 Q 82 258 85 252 Q 88 240 90 218 Z" fill="url(#goldGrad)" />
    {[224, 232, 240, 248].map((y, i) => (
      <line key={i} x1={73 + i * 0.5} y1={y} x2={87 - i * 0.5} y2={y} stroke="#8B6914" strokeWidth="1" opacity="0.5" />
    ))}

    {/* Subtle glow rim around face */}
    <path
      d="M 42 70 Q 38 120 42 160 Q 50 210 80 218 Q 110 210 118 160 Q 122 120 118 70 Q 100 55 80 53 Q 60 55 42 70 Z"
      fill="none"
      stroke="rgba(232,200,120,0.25)"
      strokeWidth="2"
    />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────
const DigitalDocumentation = () => {
  const [activeMode, setActiveMode] = useState('hologram');

  // Floating animation via CSS
  const floatStyle = {
    animation: 'floatMask 6s ease-in-out infinite',
  };

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
          33%       { transform: translateY(-22px) rotate(0deg); }
          66%       { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(201,168,76,0.5)); }
          50%       { filter: drop-shadow(0 0 30px rgba(201,168,76,0.9)) drop-shadow(0 0 50px rgba(201,168,76,0.4)); }
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
        {/* ── Radial warm glow background ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(201,168,76,0.12) 0%, transparent 65%)',
        }} />

        {/* ── Floating Pharaoh Mask (TOP RIGHT) ── */}
        <div
          className="mask-float"
          style={{
            position: 'absolute',
            top: 40,
            right: 48,
            width: 140,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <PharaohMaskSVG style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* ── Smaller second mask (BOTTOM LEFT, mirrored) ── */}
        <div
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
          }}
        >
          <PharaohMaskSVG style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* ── Main content grid ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}>

          {/* ── Left: Text column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 48, height: 2,
                background: 'linear-gradient(90deg, #C9A84C, #E8C878)',
                display: 'inline-block', borderRadius: 2,
              }} />
              <span style={{
                color: '#C9A84C', fontFamily: "'Arial', sans-serif",
                fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
              }}>
                التوثيق والبعد الدرامي
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 400, lineHeight: 1.15, margin: 0,
              color: '#F5EDD6',
            }}>
              تجسيد الشخصيات
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #E8C878, #C9A84C)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                بصورة حية
              </span>
            </h2>

            <p style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: 16, lineHeight: 1.85, color: 'rgba(245,237,214,0.72)',
              borderRight: '3px solid #C9A84C', paddingRight: 20, margin: 0,
              textAlign: 'justify',
            }}>
              دمج دقة التوثيق العلمي مع سحر العرض البصري. لم يعد المتحف يعرض حجراً جامداً، بل يفتح
              شاشات ذكية ووسائط تجمع بين{' '}
              <strong style={{ color: '#E8C878' }}>الصوت والصورة والفيديو</strong>{' '}
              لتناسب طبيعة الأجيال الجديدة.
            </p>

            {/* Stat chips */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { n: 'VR', l: 'الواقع الافتراضي' },
                { n: 'AR', l: 'الواقع المعزز' },
                { n: 'AI', l: 'ذكاء اصطناعي' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '8px 18px',
                  border: '1px solid rgba(201,168,76,0.4)',
                  borderRadius: 4,
                  background: 'rgba(201,168,76,0.07)',
                }}>
                  <span style={{ color: '#E8C878', fontFamily: "'Arial', sans-serif", fontSize: 13, fontWeight: 700 }}>{s.n}</span>
                  <span style={{ color: 'rgba(245,237,214,0.5)', fontFamily: "'Arial', sans-serif", fontSize: 11, marginRight: 6 }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Interactive panel ── */}
          <div style={{
            background: 'rgba(38,22,20,0.7)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 16,
            padding: '40px 36px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}>
            {/* Tab buttons */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 12, marginBottom: 32,
            }}>
              {Object.keys(docFeatures).map((key) => {
                const active = activeMode === key;
                return (
                  <button
                    key={key}
                    className="feature-btn"
                    onClick={() => setActiveMode(key)}
                    style={{
                      padding: '16px 8px',
                      textAlign: 'center',
                      borderRadius: 12,
                      border: active ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.15)',
                      background: active ? 'rgba(201,168,76,0.15)' : 'rgba(62,39,35,0.8)',
                      cursor: 'pointer',
                      boxShadow: active ? '0 0 20px rgba(201,168,76,0.2) inset' : 'none',
                    }}
                  >
                    <span style={{ display: 'block', fontSize: 26, marginBottom: 8 }}>
                      {docFeatures[key].icon}
                    </span>
                    <span style={{
                      fontFamily: "'Arial', sans-serif",
                      fontSize: 12, fontWeight: 700,
                      color: active ? '#E8C878' : 'rgba(245,237,214,0.55)',
                    }}>
                      {docFeatures[key].title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content display box */}
            <div style={{
              background: '#1b0f0e',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: 12,
              padding: '36px 32px',
              minHeight: 220,
              position: 'relative',
              boxShadow: '0 0 40px rgba(0,0,0,0.4) inset',
            }}>
              {/* Target badge */}
              <span style={{
                display: 'inline-block',
                padding: '4px 14px',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 999,
                color: '#C9A84C',
                fontFamily: "'Arial', sans-serif",
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                {docFeatures[activeMode].target}
              </span>

              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: 15, lineHeight: 1.9,
                color: 'rgba(245,237,214,0.82)',
                margin: 0,
              }}>
                {docFeatures[activeMode].desc}
              </p>

              {/* Decorative corner */}
              <div style={{
                position: 'absolute', bottom: 16, left: 16,
                width: 40, height: 40,
                borderBottom: '2px solid rgba(201,168,76,0.25)',
                borderLeft: '2px solid rgba(201,168,76,0.25)',
                borderRadius: '0 0 0 8px',
              }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalDocumentation;
