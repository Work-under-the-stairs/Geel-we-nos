import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";


// ─── DATA ────────────────────────────────────────────────────────────────────
const stories = [
  {
    id: 1,
    name: "دعاء",
    location: "غزة",
    title: "دعاء طبيبة المستقبل.. ألم كبير في جسد صغير",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
    color: "#dc2626",
    dream: "طبيبة",
    age: "6 سنوات",
    paragraphs: [
      "دفع الأطفال في غزة ثمنًا فادحًا للحرب الإسرائيلية الغاشمة على القطاع (2023-2025)، التي أودت بحياة أكثر من 70 ألف شهيد، فضلًا عن إصابة ما يناهز 170 ألف فلسطيني، من بينهم الطفلة دعاء أبو جزر البالغة من العمر 6 سنوات، التي فقدت ساقها في غارة لطيران الاحتلال، والتي وصفها جدها بأن «شخصيتها حلوة تحب اللعب».",
      "في البداية، اعتقدت دعاء أن الطرف الصناعي يمثل فرصة لعودتها إلى اللعب مع إخوتها، غير أنها مع الوقت أدركت صعوبة العودة إلى حياتها قبل الإصابة؛ خصوصًا عندما ترى الأطفال في عمرها يعيشون حياة طبيعية.",
      "تعاني دعاء من حالة نفسية سيئة منذ أن بُتِرت ساقها، رغم محاولة أفراد العائلة التخفيف عنها؛ ومع ذلك، فهي تحتفظ بابتسامتها وبراءتها عند الحديث عن إصابتها.",
      "تحلم دعاء بأن تصبح طبيبة لتساهم في مداواة آلام الناس، متمسكةً بحقها في التمتع بطفولتها، واستخدام السبورة للرسم والتلوين، تمهيدًا للعودة إلى الدراسة بعد الحرب.",
    ],
    stats: { value: "6 سنوات", label: "عمر الطفلة", year: "2024" },
  },
  {
    id: 2,
    name: "غزل",
    location: "غزة",
    title: "غزل ابنة غزة: صحافية المستقبل",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    color: "#f97316",
    dream: "صحافية",
    age: "12 عاماً",
    paragraphs: [
      "تعلمت غزل رفعت، ابنة قطاع غزة البالغة من العمر 12 عامًا، من مطالعة الكتب أن الاستسلام ليس خيارًا، وأن الأبطال يحاولون دومًا ولا يسقطون؛ لذلك تحولت إلى بطلة داخل أسرتها التي عانت من ويلات الحرب.",
      "استعانت غزل بموهبتها في كتابة الشعر لتتخطى ما مرت به من ألم وخذلان؛ إذ إن ما عاشته حوّلها من طفلة إلى امرأة ناضجة لديها الخبرة الكافية في الحياة.",
      "كما لجأت إلى الرسم لتعبر عن طفولتها، وبراءتها التي سلبتها منها الحرب؛ وظلت غزل تحلم باستكمال دراستها، مرددةً بصوت مفعم بالأمل: «نفسي ترجع الدراسة».",
      "حددت حلمها بأن تصبح صحفية تنقل ما يعيشه الأطفال في الحروب للعالم أجمع، حتى يسمع صوتهم من يتجاهل صراخهم.",
    ],
    stats: { value: "12 عاماً", label: "عمر غزل", year: "2024" },
  },
  {
    id: 3,
    name: "أدهم",
    location: "غزة",
    title: "بصوته البريء يقول أدهم: يدي سبقتني إلى الجنة",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    color: "#eab308",
    dream: "حافظ قرآن",
    age: "7 سنوات",
    paragraphs: [
      "يحب أدهم عزام، ابن قطاع غزة، القراءة والغناء ولعب كرة القدم، ولديه من الإخوة فادي وألمى، إلا أنه فقد الأخيرة إثر تعرض منزلهم لقصف إسرائيلي.",
      "يصف أدهم حالته النفسية بعد القصف بقوله: «نفسيتي كتير كتير تعبت»، فقد بُترت يد أدهم نتيجة القصف، ويقول: «الحمد لله على كل حال، فيدي سبقتني إلى الجنة».",
      "ويضيف أدهم بفخرٍ أنه «يحب قراءة القرآن، وحفظ سورة التكوير غيبًا».",
      "يعرب أدهم، الذي لم يتعدَّ عمره السنوات السبع، عن رغبته في العودة إلى غزة موطنه الأصلي؛ المكان الذي فقد فيه يده.",
    ],
    stats: { value: "7 سنوات", label: "عمر أدهم", year: "2024" },
  },
  {
    id: 4,
    name: "حسن",
    location: "السودان",
    title: "عقله وبراءته.. تفوق المحارب",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    color: "#22c55e",
    dream: "بناء ملجأ للأطفال",
    age: "6 سنوات",
    paragraphs: [
      "طفولة ضجّت بالحركة والمرح عاشها الطفل السوداني حسن أحمد، ذو الست أعوام، قبل أن تغيّر الحرب حياته بالكامل. كان يحب المدرسة كثيرًا، ويقضي أوقاته في اللعب والجري كأي طفل في عمره.",
      "اندلعت الحرب في السودان، وذبُلت حياة حسن، الذي فقد شقيقه فيها، ليجد نفسه وحيدا وسط أجواء الخوف والدمار. صارت أصوات الانفجارات جزءًا أساسيًا من حياة حسن.",
      "ومع مرور الوقت، تعلّق حسن بوالدته بشكل أكبر، وأصبح يخشى الابتعاد عنها. فقد الفتى شعوره بالأمان، وبات يخاف من الذهاب إلى المدرسة رغم حبه الشديد لها.",
      "حلمه كبير، رغم صغر سنه، حيث يتمنى حسن أن ينشئ مكاناً مخصصاً للأطفال، يستطيعون فيه العيش واللعب دون خوف. «آمن ودافئ»، هكذا يتمنى حسن أن يكون ذلك المكان.",
    ],
    stats: { value: "6 سنوات", label: "عمر حسن", year: "2024" },
  },
  {
    id: 5,
    name: "أحمد",
    location: "السودان",
    title: "متلازمة القلق.. أمل في إعادة الإعمار",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&q=80",
    color: "#06b6d4",
    dream: "مهندس",
    age: "13 عاماً",
    paragraphs: [
      "أحمد حامد يحيى، البالغ من العمر ثلاثة عشر عامًا، يفتقد مدرسته وأصدقاءه، وتمرين كرة القدم، الذي كان مولعاً به. ويروي: «عاشت عائلتي في عزلة تامة داخل المنزل خوفاً من القصف».",
      "مراراً حاول أحمد التظاهر بالقوة وعدم الخوف، إلا أن أصوات الانفجارات القريبة تركت أثراً نفسياً كبيراً بداخله.",
      "«حتى بعد لجوئي إلى مصر، لا تزال الكوابيس تلاحقني، أستيقظ على أصوات الانفجارات، وأسترجع اللحظات القاسية».",
      "يحلم أحمد باليوم الذي يصير فيه مهندسًا ليساهم في إعادة إعمار ما دمرته الحرب في وطنه السودان.",
    ],
    stats: { value: "13 عاماً", label: "عمر أحمد", year: "2024" },
  },
];

// ─── MODAL ───────────────────────────────────────────────────────────────────
const StoryModal = ({ isOpen, onClose, story }) => {
  if (!story) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          dir="rtl"
          style={{ fontFamily: "'Amiri', 'Georgia', serif" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8"
        >
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          />

          {/* card */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="relative w-full max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            style={{ maxWidth: 900, background: "#0f0f0f", border: `1px solid ${story.color}30` }}
          >
            {/* close */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-50 flex items-center justify-center w-9 h-9 rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
            >
              ✕
            </button>

            {/* image panel */}
            <div className="relative w-full md:w-5/12 flex-shrink-0" style={{ minHeight: 260 }}>
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(60%)", transition: "filter 0.6s" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(60%)")}
              />
              {/* gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, #0f0f0f 0%, transparent 55%), linear-gradient(to left, #0f0f0f 0%, transparent 60%)`,
                }}
              />
              {/* label */}
              <div className="absolute bottom-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: story.color, fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>
                    📍 {story.location}
                  </span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 38, fontWeight: 900, lineHeight: 1.1 }}>{story.name}</h2>
                <div
                  className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: story.color + "22", color: story.color, border: `1px solid ${story.color}55` }}
                >
                  حلمه: {story.dream}
                </div>
              </div>
            </div>

            {/* content panel */}
            <div
              className="w-full md:w-7/12 flex flex-col overflow-y-auto"
              style={{ maxHeight: "92vh", scrollbarWidth: "thin", scrollbarColor: story.color + "44 transparent" }}
            >
              <div className="p-7 md:p-10 flex flex-col gap-6">
                {/* title */}
                <div className="flex gap-3 items-start">
                  <span style={{ color: story.color, fontSize: 28, marginTop: 2 }}>"</span>
                  <h3 style={{ color: "#e5e5e5", fontSize: 20, fontWeight: 700, lineHeight: 1.6 }}>
                    {story.title}
                  </h3>
                </div>

                {/* paragraphs */}
                <div className="flex flex-col gap-5">
                  {story.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      style={{ color: "#a3a3a3", fontSize: 15, lineHeight: 2.1 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* stats */}
                <div
                  className="mt-2 pt-6 grid grid-cols-2 gap-3"
                  style={{ borderTop: `1px solid rgba(255,255,255,0.07)` }}
                >
                  <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <p style={{ color: story.color, fontSize: 26, fontWeight: 900 }}>{story.stats.value}</p>
                    <p style={{ color: "#666", fontSize: 11, marginTop: 3 }}>{story.stats.label}</p>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <p style={{ color: "#fff", fontSize: 26, fontWeight: 900 }}>{story.location}</p>
                    <p style={{ color: "#666", fontSize: 11, marginTop: 3 }}>الموقع</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ─── CARD ────────────────────────────────────────────────────────────────────
const StoryCard = ({ story, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.08 * index, type: "spring", damping: 20 }}
    whileHover={{ y: -8, scale: 1.015 }}
    onClick={() => onClick(story)}
    className="relative rounded-3xl overflow-hidden cursor-pointer flex flex-col"
    style={{
      background: "#111",
      border: `1px solid rgba(255,255,255,0.06)`,
      transition: "border-color 0.3s",
      boxShadow: `0 0 0 0 ${story.color}`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = story.color + "60";
      e.currentTarget.style.boxShadow = `0 8px 32px ${story.color}22`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    {/* image */}
    <div className="relative overflow-hidden" style={{ height: 220 }}>
      <img
        src={story.image}
        alt={story.name}
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(50%)", transition: "transform 0.5s, filter 0.5s" }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.filter = "grayscale(0%)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.filter = "grayscale(50%)";
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #111 0%, transparent 60%)" }}
      />
      {/* location badge */}
      <div
        className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
        style={{ background: story.color + "22", color: story.color, border: `1px solid ${story.color}55`, backdropFilter: "blur(6px)" }}
      >
        {story.location}
      </div>
    </div>

    {/* text */}
    <div className="p-5 flex flex-col gap-2 flex-1" dir="rtl">
      <h2 style={{ color: "#f5f5f5", fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>{story.name}</h2>
      <p style={{ color: "#737373", fontSize: 13, lineHeight: 1.75 }} className="line-clamp-2">{story.title}</p>

      <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ color: "#555", fontSize: 12 }}>{story.age}</span>
        <span style={{ color: story.color, fontSize: 11, marginRight: "auto", fontWeight: 700 }}>
          حلمه: {story.dream} ←
        </span>
      </div>
    </div>
  </motion.div>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CrossMediaPage() {
  // داخل المكون (قبل جملة الـ return):
const [searchParams] = useSearchParams();
const storyIdFromUrl = searchParams.get("storyId");

useEffect(() => {
  if (storyIdFromUrl) {
    const story = stories.find(s => s.id == storyIdFromUrl);
    if (story) {
      setSelectedStory(story);
    }
  }
}, [storyIdFromUrl]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? stories : stories.filter(s => s.location === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div
        className="min-h-screen"
        style={{ background: "#080808", fontFamily: "'Cairo', 'Amiri', serif" }}
        dir="rtl"
      >
        {/* ── HEADER ── */}
        <header className="relative overflow-hidden py-24 px-6 text-center">
          {/* decorative lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.025) 80px)`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 16 }}
            className="relative z-10"
          >
            <p
              className="mb-4 uppercase tracking-widest"
              style={{ color: "#dc2626", fontSize: 11, letterSpacing: 5, fontFamily: "'Cairo', sans-serif" }}
            >
              تقرير صحفي · وسائط متعددة
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                fontFamily: "'Amiri', serif",
              }}
            >
              أطفال الحروب
            </h1>
            <h2
              style={{
                color: "#525252",
                fontSize: "clamp(1rem, 3vw, 1.8rem)",
                fontWeight: 400,
                marginTop: 8,
                fontFamily: "'Amiri', serif",
              }}
            >
              أجيال من العزيمة والإرادة
            </h2>
            <div
              className="mx-auto mt-5"
              style={{ width: 48, height: 2, background: "linear-gradient(90deg, #dc2626, transparent)" }}
            />
            <p style={{ color: "#525252", fontSize: 14, marginTop: 20 }}>
              قصص بصرية وصوتية من غزة والسودان
            </p>
          </motion.div>
        </header>

        {/* ── STATS BAR ── */}
        <div
          className="flex justify-center gap-10 py-8 px-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { val: "+70,000", lbl: "شهيد في غزة", color: "#dc2626" },
            { val: "5", lbl: "قصص موثقة", color: "#f97316" },
            { val: "2", lbl: "دولة", color: "#eab308" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <p style={{ color: s.color, fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 900 }}>{s.val}</p>
              <p style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{s.lbl}</p>
            </motion.div>
          ))}
        </div>

        {/* ── FILTER ── */}
        <div className="flex justify-center gap-3 py-8 px-4">
          {["all", "غزة", "السودان"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={{
                background: filter === f ? "#dc2626" : "rgba(255,255,255,0.05)",
                color: filter === f ? "#fff" : "#666",
                border: `1px solid ${filter === f ? "#dc2626" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {f === "all" ? "الكل" : f}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <main className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, i) => (
              <StoryCard key={story.id} story={story} onClick={setSelectedStory} index={i} />
            ))}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer
          className="text-center py-10 px-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#333", fontSize: 12 }}
        >
          <p>وثّقت هذه القصص لتبقى · أطفال الحروب ليسوا أرقامًا</p>
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
