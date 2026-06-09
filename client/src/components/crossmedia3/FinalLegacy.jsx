import React, { useState } from 'react';

const childTraits = {
  initiative: {
    title: "مبادر تفاعلي",
    icon: "✦",
    desc: "يتحول الطفل من زائر صامت يتلقى التلقين إلى عنصر حركي يبادر بالتجربة، يلمس الشاشات الرقمية، ويقود جولته الاستكشافية بنفسه داخل القصر."
  },
  curious: {
    title: "مندهش وفضولي",
    icon: "◈",
    desc: "تثير تقنيات الهولوجرام والواقع الافتراضي دهشة الصغير، وتحول فضوله الفطري نحو استكشاف أسرار أجداده والبحث عن جذوره الحضارية."
  },
  researcher: {
    title: "يسأل ويبحث",
    icon: "◎",
    desc: "الربط الذكي بين المنهج المدرسي والسينوغرافيا يدفع الطفل لطرح أسئلة عميقة وعفوية، محاولاً تفكيك وتحليل التجارب الإنسانية للماضي."
  },
  guardian: {
    title: "حارس للتراث",
    icon: "⬡",
    desc: "القمة والهدف الأسمى؛ حيث يولد لدى الطفل شعور حقيقي بالمسؤولية والانتماء، فيشعر من أعماقه أنه حارس ووريث شرعي لهذا التاريخ العريق."
  }
};

const traitKeys = Object.keys(childTraits);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');

  .fl-root {
    direction: rtl;
    font-family: 'Cairo', 'Segoe UI', system-ui, sans-serif;
    background: #0f0a06;
    color: #e8dcc8;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    position: relative;
    overflow: hidden;
  }

  .fl-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 40% at 50% 100%, rgba(180,115,20,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 30% 30% at 10% 20%, rgba(180,115,20,0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  .fl-grain {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .fl-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 56px;
    align-items: center;
  }

  /* ── Header ── */
  .fl-header {
    text-align: center;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .fl-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8921a;
    background: rgba(200,146,26,0.08);
    border: 0.5px solid rgba(200,146,26,0.3);
    padding: 6px 18px;
    border-radius: 100px;
  }

  .fl-badge::before,
  .fl-badge::after {
    content: '—';
    opacity: 0.5;
  }

  .fl-headline {
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 900;
    line-height: 1.35;
    color: #f0e6d0;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .fl-headline em {
    font-style: normal;
    color: #c8921a;
  }

  /* ── Intro text ── */
  .fl-intro {
    max-width: 820px;
    text-align: center;
  }

  .fl-intro-text {
    font-size: 15px;
    font-weight: 300;
    color: #a89878;
    line-height: 2;
    text-align: justify;
    margin: 0;
  }

  .fl-intro-text strong {
    color: #d4b870;
    font-weight: 600;
  }

  /* ── Main grid ── */
  .fl-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* ── Display image ── */
  .fl-display-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 0.5px solid rgba(200,146,26,0.2);
    display: block;
    margin-bottom: 20px;
    opacity: 0.9;
  }

  /* ── Panel ── */
  .fl-panel {
    background: rgba(30,18,8,0.7);
    border: 0.5px solid rgba(200,146,26,0.2);
    border-radius: 20px;
    padding: 36px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .fl-panel-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 640px) {
    .fl-panel-grid {
      grid-template-columns: 5fr 7fr;
    }
  }

  /* ── Trait buttons ── */
  .fl-traits {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .fl-trait-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: 12px;
    border: 0.5px solid rgba(200,146,26,0.15);
    background: rgba(255,255,255,0.02);
    cursor: pointer;
    text-align: right;
    transition: background 0.2s ease, border-color 0.2s ease;
    outline: none;
    width: 100%;
  }

  .fl-trait-btn:hover {
    background: rgba(200,146,26,0.07);
    border-color: rgba(200,146,26,0.3);
  }

  .fl-trait-btn.active {
    background: rgba(200,146,26,0.12);
    border-color: rgba(200,146,26,0.5);
  }

  .fl-trait-btn.active::before {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 2px;
    background: #c8921a;
    border-radius: 2px;
  }

  .fl-trait-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    background: rgba(200,146,26,0.08);
    border: 0.5px solid rgba(200,146,26,0.2);
    color: #c8921a;
    order: 1;
  }

  .fl-trait-btn.active .fl-trait-icon {
    background: rgba(200,146,26,0.2);
    border-color: rgba(200,146,26,0.5);
  }

  .fl-trait-text {
    flex: 1;
    order: 0;
  }

  .fl-trait-name {
    font-size: 14px;
    font-weight: 700;
    color: #d4c4a8;
    display: block;
    margin-bottom: 2px;
    transition: color 0.2s;
  }

  .fl-trait-btn.active .fl-trait-name {
    color: #e8d4a0;
  }

  .fl-trait-hint {
    font-size: 10px;
    color: #5a4a30;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .fl-trait-btn.active .fl-trait-hint {
    color: #8a6a30;
  }

  /* ── Display ── */
  .fl-display {
    background: rgba(0,0,0,0.3);
    border: 0.5px solid rgba(200,146,26,0.15);
    border-radius: 14px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 420px;
  }

  .fl-display-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #8a6820;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fl-display-label::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: rgba(200,146,26,0.2);
  }

  .fl-display-title {
    font-size: 17px;
    font-weight: 700;
    color: #e8d4a0;
    margin: 0 0 14px;
    line-height: 1.4;
  }

  .fl-display-desc {
    font-size: 14px;
    font-weight: 300;
    color: #a89878;
    line-height: 1.9;
    text-align: justify;
    margin: 0;
  }

  /* ── Divider ── */
  .fl-divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    opacity: 0.3;
  }

  .fl-divider-line {
    flex: 1;
    height: 0.5px;
    background: #c8921a;
  }

  .fl-divider-diamond {
    width: 6px;
    height: 6px;
    background: #c8921a;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Closing message box ── */
  .fl-closing-box {
    width: 100%;
    background: rgba(30,18,8,0.7);
    border: 0.5px solid rgba(200,146,26,0.2);
    border-radius: 20px;
    padding: 40px 44px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fl-closing-eyebrow {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #8a6820;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .fl-closing-eyebrow::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: rgba(200,146,26,0.2);
  }

  .fl-closing-body {
    font-size: 15px;
    font-weight: 300;
    color: #a89878;
    line-height: 2;
    text-align: justify;
    margin: 0;
  }

  .fl-closing-body strong {
    color: #d4b870;
    font-weight: 600;
  }

  .fl-closing-highlight {
    background: rgba(200,146,26,0.08);
    border-right: 2px solid #c8921a;
    border-radius: 6px;
    padding: 16px 20px;
    font-size: 14px;
    font-weight: 400;
    color: #c8aa78;
    line-height: 1.9;
    font-style: italic;
  }

  /* ── Footer ── */
  .fl-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-top: 40px;
    border-top: 0.5px solid rgba(200,146,26,0.2);
  }

  .fl-ornament {
    display: flex;
    align-items: center;
    gap: 16px;
    opacity: 0.35;
  }

  .fl-ornament-line {
    width: 60px;
    height: 0.5px;
    background: #c8921a;
  }

  .fl-ornament-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #c8921a;
  }

  .fl-quote {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: clamp(15px, 2vw, 22px);
    font-weight: 400;
    font-style: italic;
    color: #c8aa78;
    text-align: center;
    line-height: 1.7;
    max-width: 720px;
    margin: 0;
    quotes: '"' '"';
  }

  .fl-quote::before { content: open-quote; }
  .fl-quote::after  { content: close-quote; }

  .fl-attribution {
    font-size: 10px;
    color: #4a3820;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: 'Cairo', monospace;
  }

  .fl-attribution strong {
    color: #6a5030;
    font-weight: 600;
  }
`;

const FinalLegacy = () => {
  const [activeTrait, setActiveTrait] = useState('initiative');
  const trait = childTraits[activeTrait];

  return (
    <>
      <style>{styles}</style>
      <section className="fl-root">
        <div className="fl-grain" aria-hidden="true" />

        <div className="fl-wrap">

          {/* Header */}
          <header className="fl-header">
            <span className="fl-badge">رسالة ختامية إلى الأسر المصرية</span>
            <h2 className="fl-headline">
              اصطحاب طفلك للمتحف ليس نزهة عابرة..{' '}
              <em>بل استثمار في هويته!</em>
            </h2>
          </header>

          {/* Intro paragraph — full text from the article */}
          <div className="fl-intro">
            <p className="fl-intro-text">
              وعن رسالته للأسر المصرية، قال حميدة إنها تتلخص في أن{' '}
              <strong>اصطحاب الأطفال إلى المتاحف لم يعد مجرد نشاط ترفيهي أو زيارة عابرة</strong>،
              بل هو استثمار حقيقي في وعي الطفل، وثقافته، وشخصيته، وهويته الوطنية؛
              فالمتحف بات مساحة للتعلم والاكتشاف وبناء الانتماء،
              في عصر أصبحت فيه التكنولوجيا ووسائل التواصل تستحوذ على{' '}
              <strong>الجزء الأكبر من اهتمام الصغار</strong>.
            </p>
          </div>

          {/* Main */}
          <div className="fl-grid">

            {/* Interaction panel */}
            <div className="fl-panel">
              <div className="fl-panel-grid">

                {/* Trait buttons */}
                <div className="fl-traits" role="tablist" aria-label="اختر الأثر لاستعراضه">
                  {traitKeys.map((key) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={activeTrait === key}
                      aria-controls="trait-display"
                      onClick={() => setActiveTrait(key)}
                      className={`fl-trait-btn${activeTrait === key ? ' active' : ''}`}
                    >
                      <span className="fl-trait-text">
                        <span className="fl-trait-name">{childTraits[key].title}</span>
                        <span className="fl-trait-hint">اضغط لرصد الأثر</span>
                      </span>
                      <span className="fl-trait-icon" aria-hidden="true">
                        {childTraits[key].icon}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Display */}
                <div
                  id="trait-display"
                  className="fl-display"
                  role="tabpanel"
                  aria-live="polite"
                >
                  <img
                    src="/images/IM1.jpeg"
                    alt="أطفال في المتحف"
                    className="fl-display-img"
                  />
                  <span className="fl-display-label">الأثر الحقيقي في وعي الصغير</span>
                  <h3 className="fl-display-title">
                    كيف يصنع قصر الزعفران طفلاً {trait.title}؟
                  </h3>
                  <p className="fl-display-desc">{trait.desc}</p>
                </div>

              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="fl-divider" aria-hidden="true">
            <div className="fl-divider-line" />
            <div className="fl-divider-diamond" />
            <div className="fl-divider-line" />
          </div>

          {/* Closing statement — full closing paragraph */}
          <div className="fl-closing-box">
            <div className="fl-closing-eyebrow">خلاصة حديث د. أحمد محمد حميدة • رئيس قطاع المتاحف</div>
            <p className="fl-closing-body">
              وختم حديثه مؤكداً أن متحف قصر الزعفران{' '}
              <strong>"نجح في الوصول إلى الطفل المصري"</strong>،
              الذي تحوّل من{' '}
              <strong>زائر صامت</strong>{' '}
              إلى{' '}
              <strong>مبادر تفاعلي ومندهش وفضولي</strong>؛
              يسأل ويبحث ويريد أن يكتشف المزيد بنفسه.
            </p>
            <div className="fl-closing-highlight">
              فالنجاح الحقيقي للمتحف لا يُقاس فقط بعدد الزوار، بل بقدرته على ترك أثر حقيقي في وعي الطفل ومشاعره وذاكرته.
            </div>
          </div>

          {/* Footer quote */}
          <footer className="fl-footer">
            <div className="fl-ornament" aria-hidden="true">
              <div className="fl-ornament-line" />
              <div className="fl-ornament-dot" />
              <div className="fl-ornament-line" />
            </div>
            <blockquote className="fl-quote">
              النجاح الحقيقي للمتحف لا يُقاس فقط بعدد الزوار، بل بقدرته على ترك أثر حقيقي في وعي الطفل ومشاعره وذاكرته.
            </blockquote>
            <p className="fl-attribution">
              ختام حديث <strong>د. أحمد محمد حميدة</strong> • رئيس قطاع المتاحف
            </p>
          </footer>

        </div>
      </section>
    </>
  );
};

export default FinalLegacy;
