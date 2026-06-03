import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "react-router-dom";

// ─── INLINE STYLES (keyframes + global) ──────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@300;400;600;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0000; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0000; }
  ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 2px; }

  @keyframes floatUp {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
    50%  { opacity: 0.35; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  @keyframes pulseRed {
    0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
    50%       { box-shadow: 0 0 0 12px rgba(220,38,38,0); }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes breathe {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.04); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes borderFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glitch {
    0%  { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
    5%  { clip-path: inset(80% 0 0 0);  transform: translate(2px, 0); }
    10% { clip-path: inset(40% 0 40% 0); transform: translate(0, 0); }
    100%{ clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .shimmer-text {
    background: linear-gradient(90deg, #dc2626 0%, #fff 40%, #fca5a5 60%, #dc2626 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }
  .card-hover-border {
    position: relative;
  }
  .card-hover-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(135deg, #dc2626, #7f1d1d, #dc2626, #ef4444);
    background-size: 300% 300%;
    opacity: 0;
    transition: opacity 0.4s;
    z-index: 0;
    animation: borderFlow 3s ease infinite;
  }
  .card-hover-border:hover::before { opacity: 1; }
  .card-inner {
    position: relative;
    z-index: 1;
    background: #0f0000;
    border-radius: inherit;
    overflow: hidden;
  }
`;

// ─── SVG BACKGROUND ──────────────────────────────────────────────────────────
const HeroBackground = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="rg1" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0a0000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rg2" cx="80%" cy="70%" r="40%">
        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0a0000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rg3" cx="20%" cy="80%" r="35%">
        <stop offset="0%" stopColor="#991b1b" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0a0000" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(220,38,38,0.06)" strokeWidth="0.5"/>
      </pattern>
    </defs>

    {/* Base dark red */}
    <rect width="100%" height="100%" fill="#0a0000" />
    {/* Grid */}
    <rect width="100%" height="100%" fill="url(#grid)" />
    {/* Glow blobs */}
    <rect width="100%" height="100%" fill="url(#rg1)" />
    <rect width="100%" height="100%" fill="url(#rg2)" />
    <rect width="100%" height="100%" fill="url(#rg3)" />

    {/* Diagonal accent lines */}
    {[...Array(8)].map((_, i) => (
      <line
        key={i}
        x1={`${-10 + i * 15}%`} y1="0%"
        x2={`${10 + i * 15}%`}  y2="100%"
        stroke="rgba(220,38,38,0.04)" strokeWidth="1"
      />
    ))}

    {/* Concentric rings */}
    {[180, 260, 340, 420].map((r, i) => (
      <circle
        key={i} cx="50%" cy="38%"
        r={r} fill="none"
        stroke="rgba(220,38,38,0.07)"
        strokeWidth="1"
        strokeDasharray={`${4 + i * 3} ${20 + i * 5}`}
      />
    ))}

    {/* Corner decorative geometry */}
    <polygon points="0,0 120,0 0,120" fill="rgba(220,38,38,0.07)" />
    <polygon points="100%,0 calc(100% - 120px),0 100%,120" fill="rgba(220,38,38,0.05)" />

    {/* Scan line animation */}
    <rect
      x="0" y="0" width="100%" height="2"
      fill="rgba(220,38,38,0.12)"
      style={{ animation: "scanLine 6s linear infinite" }}
    />

    {/* Small glowing dots */}
    {[
      [15,25], [85,15], [92,60], [8,75], [50,90], [35,50], [70,35], [25,65]
    ].map(([cx, cy], i) => (
      <circle
        key={i} cx={`${cx}%`} cy={`${cy}%`} r={i % 2 === 0 ? 2 : 1.5}
        fill="#dc2626"
        style={{ animation: `breathe ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`, opacity: 0.5 }}
        filter="url(#glow)"
      />
    ))}
  </svg>
);

// ─── FLOATING PARTICLES ───────────────────────────────────────────────────────
const Particles = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
    {[...Array(18)].map((_, i) => {
      const size  = 2 + Math.random() * 4;
      const left  = Math.random() * 100;
      const delay = Math.random() * 12;
      const dur   = 10 + Math.random() * 14;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-10px",
            left:  `${left}%`,
            width:  size,
            height: size,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#dc2626" : i % 3 === 1 ? "#991b1b" : "#fca5a5",
            animation: `floatUp ${dur}s ${delay}s linear infinite`,
          }}
        />
      );
    })}
  </div>
);

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const seen = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString("ar-EG")}{suffix}</span>;
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
const StoryModal = ({ isOpen, onClose, story }) => {
  if (!story) return null;
  const RED = "#dc2626";
  return (
    <AnimatePresence>
      {isOpen && (
        <div dir="rtl" style={{ fontFamily: "'Amiri', Georgia, serif" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: "rgba(5,0,0,0.96)", backdropFilter: "blur(16px)" }}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 70 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 70 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="relative w-full max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
            style={{
              maxWidth: 920,
              borderRadius: 24,
              background: "#0f0000",
              border: `1px solid ${RED}40`,
              boxShadow: `0 0 60px ${RED}20, 0 30px 80px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
              zIndex: 10,
            }} />

            {/* Close */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              onClick={onClose}
              className="absolute top-4 left-4 z-50 flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)", transition: "all 0.2s" }}
            >✕</motion.button>

            {/* Image panel */}
            <div className="relative w-full md:w-5/12 flex-shrink-0" style={{ minHeight: 280 }}>
              {/* SVG-based placeholder background for image area */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, #1a0000, #3b0000, #1a0000)`,
              }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
                  <defs>
                    <pattern id="imgGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(220,38,38,0.1)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#imgGrid)" />
                  <circle cx="50%" cy="40%" r="80" fill="rgba(220,38,38,0.08)" />
                  <circle cx="50%" cy="40%" r="55" fill="rgba(220,38,38,0.06)" />
                </svg>
              </div>
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(60%) sepia(20%)", transition: "filter 0.6s", position: "relative", zIndex: 1 }}
                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%) sepia(10%)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(60%) sepia(20%)")}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ zIndex: 2,
                background: `linear-gradient(to top, #0f0000 0%, transparent 55%), linear-gradient(to left, #0f0000 0%, transparent 60%)`,
              }} />
              {/* Red vignette */}
              <div className="absolute inset-0" style={{ zIndex: 2,
                background: `radial-gradient(ellipse at center, transparent 40%, rgba(10,0,0,0.6) 100%)`,
              }} />
              {/* Labels */}
              <div className="absolute bottom-0 right-0 p-6" style={{ zIndex: 3 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>
                    📍 {story.location}
                  </span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 38, fontWeight: 900, lineHeight: 1.1, textShadow: `0 0 30px ${RED}60` }}>
                  {story.name}
                </h2>
                <motion.div
                  animate={{ boxShadow: [`0 0 0 0 ${RED}40`, `0 0 12px 4px ${RED}20`, `0 0 0 0 ${RED}40`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${RED}22`, color: RED, border: `1px solid ${RED}55` }}
                >
                  حلمه: {story.dream}
                </motion.div>
              </div>
            </div>

            {/* Content panel */}
            <div className="w-full md:w-7/12 flex flex-col overflow-y-auto"
              style={{ maxHeight: "92vh", scrollbarWidth: "thin", scrollbarColor: `${RED}44 transparent` }}
            >
              <div className="p-7 md:p-10 flex flex-col gap-6">
                {/* Title */}
                <div className="flex gap-3 items-start">
                  <span style={{ color: RED, fontSize: 32, marginTop: -4, lineHeight: 1 }}>"</span>
                  <h3 style={{ color: "#f5f5f5", fontSize: 20, fontWeight: 700, lineHeight: 1.7 }}>
                    {story.title}
                  </h3>
                </div>
                {/* Divider */}
                <div style={{ height: 1, background: `linear-gradient(90deg, ${RED}60, transparent)` }} />

                {/* Paragraphs */}
                <div className="flex flex-col gap-5">
                  {story.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07 }}
                      style={{ color: "#c4b5b5", fontSize: 15, lineHeight: 2.1, borderRight: i === 0 ? `2px solid ${RED}` : "none", paddingRight: i === 0 ? 12 : 0 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-2 pt-6 grid grid-cols-2 gap-3"
                  style={{ borderTop: "1px solid rgba(220,38,38,0.12)" }}
                >
                  {[
                    { val: story.stats.value, lbl: story.stats.label },
                    { val: story.location,    lbl: "الموقع" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-2xl p-4"
                      style={{ background: `rgba(220,38,38,0.06)`, border: `1px solid ${RED}20` }}
                    >
                      <p style={{ color: i === 0 ? RED : "#fff", fontSize: 24, fontWeight: 900 }}>{s.val}</p>
                      <p style={{ color: "#664444", fontSize: 11, marginTop: 3 }}>{s.lbl}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── CARD ─────────────────────────────────────────────────────────────────────
const StoryCard = ({ story, onClick, index }) => {
  const RED = "#dc2626";
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, type: "spring", damping: 20 }}
      whileHover={{ y: -10, scale: 1.015 }}
      onClick={() => onClick(story)}
      className="card-hover-border rounded-3xl cursor-pointer"
      style={{ borderRadius: 24 }}
    >
      <div className="card-inner" style={{ border: "1px solid rgba(220,38,38,0.1)", borderRadius: 24 }}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 230 }}>
          {/* SVG Background — used as artistic fill / fallback */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0 }}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id={`cardBg${index}`} cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#3b0000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0a0000" stopOpacity="1" />
              </radialGradient>
              <pattern id={`dots${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(220,38,38,0.15)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#cardBg${index})`} />
            <rect width="100%" height="100%" fill={`url(#dots${index})`} />
            <circle cx="50%" cy="50%" r="60" fill="rgba(220,38,38,0.07)" />
          </svg>

          <img
            src={story.image}
            alt={story.name}
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(60%) sepia(15%)", transition: "transform 0.6s, filter 0.6s", position: "relative", zIndex: 1 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.filter = "grayscale(0%) sepia(0%)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.filter = "grayscale(60%) sepia(15%)"; }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ zIndex: 2,
            background: "linear-gradient(to top, #0f0000 0%, transparent 60%)",
          }} />

          {/* Location badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold" style={{ zIndex: 3,
            background: `${RED}22`, color: RED, border: `1px solid ${RED}55`, backdropFilter: "blur(6px)",
          }}>
            {story.location}
          </div>

          {/* Animated corner */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
            style={{
              position: "absolute", bottom: 0, left: 0, zIndex: 3,
              width: 40, height: 40,
              borderBottom: `2px solid ${RED}`,
              borderLeft:   `2px solid ${RED}`,
            }}
          />
        </div>

        {/* Text */}
        <div className="p-5 flex flex-col gap-2" dir="rtl">
          <h2 style={{ color: "#f5e8e8", fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>{story.name}</h2>
          <p style={{ color: "#7a5555", fontSize: 13, lineHeight: 1.75 }} className="line-clamp-2">{story.title}</p>
          <div className="flex items-center gap-2 mt-auto pt-3"
            style={{ borderTop: "1px solid rgba(220,38,38,0.1)" }}
          >
            <span style={{ color: "#4a2222", fontSize: 12 }}>{story.age}</span>
            <motion.span
              whileHover={{ x: -4 }}
              style={{ color: RED, fontSize: 11, marginRight: "auto", fontWeight: 700, cursor: "pointer" }}
            >
              حلمه: {story.dream} ←
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const stories = [
  {
    id: 1, name: "دعاء", location: "غزة",
    title: "دعاء طبيبة المستقبل.. ألم كبير في جسد صغير",
    image: "../../assets/images/doaa_1.jpeg",
    color: "#dc2626", dream: "طبيبة", age: "6 سنوات",
    paragraphs: [
      "دفع الأطفال في غزة ثمنًا فادحًا للحرب الإسرائيلية الغاشمة على القطاع (2023-2025)، التي أودت بحياة أكثر من 70 ألف شهيد، فضلًا عن إصابة ما يناهز 170 ألف فلسطيني، من بينهم الطفلة دعاء أبو جزر البالغة من العمر 6 سنوات، التي فقدت ساقها في غارة لطيران الاحتلال.",
      "في البداية، اعتقدت دعاء أن الطرف الصناعي يمثل فرصة لعودتها إلى اللعب مع إخوتها، غير أنها مع الوقت أدركت صعوبة العودة إلى حياتها قبل الإصابة.",
      "تعاني دعاء من حالة نفسية سيئة منذ أن بُتِرت ساقها، رغم محاولة أفراد العائلة التخفيف عنها؛ ومع ذلك، فهي تحتفظ بابتسامتها وبراءتها.",
      "تحلم دعاء بأن تصبح طبيبة لتساهم في مداواة آلام الناس، متمسكةً بحقها في التمتع بطفولتها.",
    ],
    stats: { value: "6 سنوات", label: "عمر الطفلة", year: "2024" },
  },
  {
    id: 2, name: "غزل", location: "غزة",
    title: "غزل ابنة غزة: صحافية المستقبل",
    image: "../../assets/images/ghazal.jpeg",
    color: "#dc2626", dream: "صحافية", age: "12 عاماً",
    paragraphs: [
      "تعلمت غزل رفعت، ابنة قطاع غزة البالغة من العمر 12 عامًا، من مطالعة الكتب أن الاستسلام ليس خيارًا، وأن الأبطال يحاولون دومًا ولا يسقطون.",
      "استعانت غزل بموهبتها في كتابة الشعر لتتخطى ما مرت به من ألم وخذلان.",
      "كما لجأت إلى الرسم لتعبر عن طفولتها، وبراءتها التي سلبتها منها الحرب.",
      "حددت حلمها بأن تصبح صحفية تنقل ما يعيشه الأطفال في الحروب للعالم أجمع.",
    ],
    stats: { value: "12 عاماً", label: "عمر غزل", year: "2024" },
  },
  {
    id: 3, name: "أدهم", location: "غزة",
    title: "بصوته البريء يقول أدهم: يدي سبقتني إلى الجنة",
    image: "../../assets/images/adham_prewar.jpeg",
    color: "#dc2626", dream: "حافظ قرآن", age: "7 سنوات",
    paragraphs: [
      "يحب أدهم عزام، ابن قطاع غزة، القراءة والغناء ولعب كرة القدم، إلا أنه فقد أخته إثر تعرض منزلهم لقصف إسرائيلي.",
      "يصف أدهم حالته النفسية بعد القصف بقوله: «نفسيتي كتير كتير تعبت»، فقد بُترت يده نتيجة القصف.",
      "ويضيف أدهم بفخرٍ أنه «يحب قراءة القرآن، وحفظ سورة التكوير غيبًا».",
      "يعرب أدهم عن رغبته في العودة إلى غزة موطنه الأصلي؛ المكان الذي فقد فيه يده.",
    ],
    stats: { value: "7 سنوات", label: "عمر أدهم", year: "2024" },
  },
  {
    id: 4, name: "حسن", location: "السودان",
    title: "عقله وبراءته.. تفوق المحارب",
    image: "../../assets/images/hassan.jpeg",
    color: "#dc2626", dream: "بناء ملجأ للأطفال", age: "6 سنوات",
    paragraphs: [
      "طفولة ضجّت بالحركة والمرح عاشها الطفل السوداني حسن أحمد، ذو الست أعوام، قبل أن تغيّر الحرب حياته بالكامل.",
      "اندلعت الحرب في السودان، وذبُلت حياة حسن، الذي فقد شقيقه فيها.",
      "ومع مرور الوقت، تعلّق حسن بوالدته بشكل أكبر، وأصبح يخشى الابتعاد عنها.",
      "حلمه كبير رغم صغر سنه: ينشئ مكاناً مخصصاً للأطفال يعيشون فيه دون خوف.",
    ],
    stats: { value: "6 سنوات", label: "عمر حسن", year: "2024" },
  },
  {
    id: 5, name: "أحمد", location: "السودان",
    title: "متلازمة القلق.. أمل في إعادة الإعمار",
    image: "../../assets/images/ahmed_sudan1.jpeg",
    color: "#dc2626", dream: "مهندس", age: "13 عاماً",
    paragraphs: [
      "أحمد حامد يحيى، البالغ من العمر ثلاثة عشر عامًا، يفتقد مدرسته وأصدقاءه.",
      "مراراً حاول أحمد التظاهر بالقوة وعدم الخوف، إلا أن أصوات الانفجارات القريبة تركت أثراً نفسياً كبيراً.",
      "«حتى بعد لجوئي إلى مصر، لا تزال الكوابيس تلاحقني، أستيقظ على أصوات الانفجارات».",
      "يحلم أحمد باليوم الذي يصير فيه مهندسًا ليساهم في إعادة إعمار وطنه.",
    ],
    stats: { value: "13 عاماً", label: "عمر أحمد", year: "2024" },
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CrossMediaPage() {
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get('storyId');
  const [filter, setFilter] = useState("all");
  const RED = "#dc2626";

  useEffect(() => {
    const id = searchParams.get("storyId");
    if (id) {
      const s = stories.find(x => x.id == id);
      if (s) setSelectedStory(s);
    }
  }, [searchParams]);

  const filtered = filter === "all" ? stories : stories.filter(s => s.location === filter);

  return (
    <>
      <style>{globalStyles}</style>
      <Particles />

      <div className="min-h-screen" dir="rtl"
        style={{ background: "#0a0000", fontFamily: "'Cairo', 'Amiri', serif", position: "relative", zIndex: 1 }}
      >

        {/* ── HERO HEADER ── */}
        <header className="relative overflow-hidden" style={{ paddingBottom: 80, paddingTop: 100 }}>
          <HeroBackground />

          {/* Top thin red bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${RED} 30%, ${RED} 70%, transparent 100%)`,
          }} />

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Label */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  color: RED, fontSize: 11, letterSpacing: 6, marginBottom: 16,
                  fontFamily: "'Cairo', sans-serif", fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                تقرير صحفي · وسائط متعددة
              </motion.p>

              {/* Main title */}
              <h1 className="shimmer-text" style={{
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                fontFamily: "'Amiri', serif",
                marginBottom: 12,
              }}>
                أطفال الحروب
              </h1>

              <h2 style={{
                color: "#5a3333",
                fontSize: "clamp(1rem, 3vw, 1.6rem)",
                fontWeight: 400,
                fontFamily: "'Amiri', serif",
                marginBottom: 20,
              }}>
                أجيال من العزيمة والإرادة
              </h2>

              {/* Animated divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  width: 120, height: 2, margin: "0 auto 20px",
                  background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
                }}
              />

              <p style={{ color: "#4a2020", fontSize: 14 }}>
                قصص بصرية وصوتية من غزة والسودان
              </p>
            </motion.div>

            {/* Orbiting decorative ring */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: -1 }}>
              {[0, 120, 240].map((deg, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: 6, height: 6, borderRadius: "50%",
                  background: RED, opacity: 0.3,
                  marginTop: -3, marginLeft: -3,
                  animation: `orbit ${8 + i * 2}s ${i * 1.5}s linear infinite`,
                  transformOrigin: "center center",
                  transform: `rotate(${deg}deg) translateX(${120 + i * 40}px)`,
                }} />
              ))}
            </div>
          </div>
        </header>

        {/* ── STATS BAR ── */}
        <div style={{
          borderTop: `1px solid ${RED}20`,
          borderBottom: `1px solid ${RED}20`,
          background: `linear-gradient(90deg, #0a0000, rgba(220,38,38,0.04), #0a0000)`,
          padding: "32px 16px",
        }}>
          <div className="flex justify-center gap-12 flex-wrap">
            {[
              { val: 70000, suffix: "+", lbl: "شهيد في غزة" },
              { val: 5,     suffix: "",  lbl: "قصص موثقة" },
              { val: 2,     suffix: "",  lbl: "دولة" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                className="text-center"
                style={{ minWidth: 80 }}
              >
                <p style={{ color: RED, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedCounter target={s.val} suffix={s.suffix} />
                </p>
                <p style={{ color: "#5a2222", fontSize: 12, marginTop: 4 }}>{s.lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FILTER ── */}
        <div className="flex justify-center gap-3 py-8 px-4 flex-wrap">
          {[
            { key: "all", lbl: "الكل" },
            { key: "غزة", lbl: "غزة 🇵🇸" },
            { key: "السودان", lbl: "السودان 🇸🇩" },
          ].map(f => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 22px",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s",
                background: filter === f.key ? RED : "rgba(220,38,38,0.06)",
                color:      filter === f.key ? "#fff" : "#7a3333",
                border: `1px solid ${filter === f.key ? RED : "rgba(220,38,38,0.15)"}`,
                boxShadow: filter === f.key ? `0 0 20px ${RED}40` : "none",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              {f.lbl}
            </motion.button>
          ))}
        </div>

        {/* ── GRID ── */}
        <main className="px-6 pb-24 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((story, i) => (
                <StoryCard key={story.id} story={story} onClick={setSelectedStory} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: "center",
          padding: "40px 16px",
          borderTop: `1px solid ${RED}15`,
          background: `linear-gradient(to top, rgba(220,38,38,0.03), transparent)`,
        }}>
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div style={{
              width: 32, height: 2, margin: "0 auto 16px",
              background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
            }} />
            <p style={{ color: "#4a2020", fontSize: 13, letterSpacing: 1 }}>
              وثّقت هذه القصص لتبقى · أطفال الحروب ليسوا أرقامًا
            </p>
          </motion.div>
        </footer>

        {/* ── MODAL ── */}
        <StoryModal
          isOpen={!!selectedStory}
          onClose={() => setSelectedStory(null)}
          story={selectedStory}
        />
      </div>
    </>
  );
}
