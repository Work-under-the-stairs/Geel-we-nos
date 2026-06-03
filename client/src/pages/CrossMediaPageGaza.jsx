import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── DATASET MAPPED DIRECTLY TO ALL YOUR UPLOADED FILES ──────────────────────
const stories = [
  {
    id: "adham",
    country: "فلسطين · غزة",
    flag: "🇵🇸",
    name: "أدهم عزام",
    age: "٧ سنوات",
    title: "روح غزة الأبية",
    subtitle: "يدي سبقتني إلى الجنة",
    dream: "العودة إلى غزة موطنه الأصلي وبنائها من جديد",
    color: "#0f1e2d",
    textColors: { primary: "#ffffff", secondary: "#3498db", bg: "#172a3a" },
    images: [
      { src: "./public/assets/images/adham_prewar.jpeg", caption: "أدهم قبل الحرب بابتسامته البريئة" },
      { src: "./public/assets/images/adhamwlama1.jpeg", caption: "أدهم والشهيدة ألمى على شاطئ بحر غزة" },
      { src: "./public/assets/images/lama.jpeg", caption: "شقيقته الراحلة الطفلة الشهيدة ألمى" },
      { src: "./public/assets/images/adhamatschool.jpeg", caption: "تكريم أدهم ضمن أوائل الطلبة بجمهورية مصر" }
    ],
    audioTracks: [
      { src: "./public/assets/audio/edysaba2tny.ogg", label: "إيدي سبقتني على الجنة" },
      { src: "./public/assets/audio/anarady.ogg", label: "أنا راضٍ بقضاء الله" },
      { src: "./public/assets/audio/adhamissining.ogg", label: "أنشودة أدهم لـ غزة العزة" },
      { src: "./public/assets/audio/anabat3alemfmaser.ogg", label: "حديثه عن التعليم والمدرسة بمصر" }
    ],
    quote: "الحمد لله على كل حال، فيدي سبقتني إلى الجنة، وأنا راضٍ بقضاء الله",
    body: [
      "يحب أدهم عزام، ابن قطاع غزة، القراءة والغناء ولعب كرة القدم، ولديه من الإخوة فادي وألمى، إلا أنه فقد الأخيرة إثر تعرض منزلهم لقصف إسرائيلي، في وقت لم يكن يتجاوز فيه عمرها عشر سنوات.",
      "يصف أدهم حالته النفسية بعد القصف بقوله: \"نفسيتي كتير كتير تعبت\"، فقد بُترت يد أدهم نتيجة القصف، ويقول عن محنته هذه: \"الحمد لله على كل حال، فيدي سبقتني إلى الجنة، وأنا راضٍ بقضاء الله\"؛ وهو حديث يعكس إيمان أدهم وقوته، وطريقة تربيته وتعامل أسرته مع ظروف الحرب.",
      "ويضيف أدهم بفخرٍ أنه \"يحب قراءة القرآن، وحفظ سورة التكوير غيبًا\".",
      "يتميز أدهم كباقي أطفال غزة بحبه للدراسة؛ فهو سعيدٌ باستكمال دراسته في مصر، وتكريمه ضمن أوائل الصف الأول الابتدائي. وأراد أدهم خلال حفل التكريم أن يضيف مقطعًا غنائياً يعبر فيه عن حبه لـ \"غزة العزة\" كما يصفها.",
      "يعرب أدهم، الذي لم يتعدَّ عمره السنوات السبع، عن رغبته في العودة إلى غزة موطنه الأصلي؛ المكان الذي فقد فيه يده، وهو ما يجعله نموذجًا لأجيال الحروب التي تتحمل ظروفًا يصعب على غيرها تحملها.",
      "عبر أدهم إلى الحدود المصرية، علمًا بأن عائلته لا تملك مصدرًا للرزق، وتعتمد على المساعدات التي وصفتها أمه بأنها \"شحيحة\"."
    ],
    tags: ["إيمان راسخ", "حفظ القرآن", "أوائل الطلبة"]
  },
  {
    id: "ghazal",
    country: "فلسطين · غزة",
    flag: "🇵🇸",
    name: "غزل رفعت",
    age: "١٢ عامًا",
    title: "صحافية المستقبل",
    subtitle: "بلا بيتٍ ولا رفاق.. لم يتبق في هذه الحياة سوى التعلم",
    dream: "أن تصبح صحفية تنقل ما يعيشه الأطفال في الحروب للعالم أجمع، حتى يسمع صوتهم من يتجاهل صراخهم",
    color: "#132313",
    textColors: { primary: "#ffffff", secondary: "#2ecc71", bg: "#1e351e" },
    images: [
      { src: "./public/assets/images/ghazal.jpeg", caption: "غزل ابنة غزة الواعدة" },
      { src: "./public/assets/images/marcava.jpeg", caption: "قصيدتها المكتوبة بخط يدها عن طائرة ودبابة الميركافا" },
      { src: "./public/assets/images/ghazalpaintforgaza.jpeg", caption: "لوحة تعبيرية رسمتها غزل: فلسطين سوف تنتصر بإذن الله" },
      { src: "./public/assets/images/favpaint.jpeg", caption: "الرسمة المقربة لقلب غزل التي تعبر عن براءتها وسلب حقوقها" }
    ],
    audioTracks: [
      { src: "./public/assets/audio/favstudying.ogg", label: "حديثها عن شغف وحب الدراسة" },
      { src: "./public/assets/audio/herreading1.ogg", label: "قراءتها للشعر - المقطع الأول" },
      { src: "./public/assets/audio/herreading2.ogg", label: "قراءتها للشعر - المقطع الثاني" },
      { src: "./public/assets/audio/herreading3.ogg", label: "قراءتها للشعر - المقطع الثالث" }
    ],
    quote: "تعلمت من المطالعة أن الاستسلام ليس خياراً، والأبطال لا يسقطون",
    body: [
      "تعلمت غزل رفعت، ابنة قطاع غزة البالغة من العمر 12 عامًا، من مطالعة الكتب أن الاستسلام ليس خيارًا، وأن الأبطال يحاولون دومًا ولا يسقطون؛ لذلك تحولت إلى بطلة داخل أسرتها التي عانت من ويلات الحرب، وحُرمت من أشياء كانت تمثل لها الحياة.",
      "استعانت غزل بموهبتها في كتابة الشعر لتتخطى ما مرت به من ألم وخذلان؛ إذ إن ما عاشته حوّلها من طفلة إلى امرأة ناضجة لديها الخبرة الكافية في الحياة. كتبت غزل الشعر لتعبر عن واقعها، فحررت قصيدة عن طائرة صغيرة، تمثّل لها مصدراً للإزعاج من ناحية، وتذكّرها من ناحية أخرى بفقد عزيز عليها (كما يظهر في شعرها).",
      "كما لجأت إلى الرسم لتعبر عن طفولتها، وبراءتها التي سلبتها منها الحرب (كما يتضح في رسوماتها)؛ وظلت غزل تحلم باستكمال دراستها، مرددةً بصوت مفعم بالأمل: \"نفسي ترجع الدراسة\".",
      "سعت غزل للمحافظة على ما تعلمته بالقراءة يوميًا، ومحاولة اكتساب معلومات جديدة كلما توفرت لديها شبكة الإنترنت؛ إذ حددت حلمها بأن تصبح صحفية تنقل ما يعيشه الأطفال في الحروب للعالم أجمع، حتى يسمع صوتهم من يتجاهل صراخهم.",
      "ورغم المخاطر المحيطة بمهنة الصحافة، تصر غزل على أن تصبح صحافية، قائلة بصوت واثق. فكل ما تريده غزل ألا تنتظر المساعدات، وأن تعود الحياة يومًا كما كانت."
    ],
    tags: ["الشعر والأدب", "توثيق صحفي", "إرادة وعزيمة", "صحافة المستقبل"]
  },
  {
    id: "doaa",
    country: "فلسطين · غزة",
    flag: "🇵🇸",
    name: "دعاء أبو جزر",
    age: "٦ سنوات",
    title: "طبيبة المستقبل",
    subtitle: "ألم كبير في جسد صغير",
    dream: "أن تصبح طبيبة لتساهم في مداواة آلام الناس وجراح الأطفال",
    color: "#1c1414",
    textColors: { primary: "#ffffff", secondary: "#e74c3c", bg: "#2d1f1f" },
    images: [
      { src: "./public/assets/images/doaa_1.jpeg", caption: "دعاء ترفع علامة النصر بابتسامة صامدة رغم بتر قدمها" }
    ],
    audioTracks: [],
    quote: "أريد أن أعود إلى اللعب مع إخوتي بصورة طبيعية",
    body: [
      "دفع الأطفال في غزة ثمنًا فادحًا للحرب الإسرائيلية الغاشمة على القطاع (2023-2025)، التي أودت بحياة أكثر من 70 ألف شهيد، فضلًا عن إصابة ما يناهز 170 ألف فلسطيني، من بينهم الطفلة دعاء أبو جزر البالغة من العمر 6 سنوات، التي فقدت ساقها في غارة لطيران الاحتلال، والتي وصفها جدها بأن \"شخصيتها حلوة تحب اللعب\"؛ إذ كانت لا تتوقف عن الركض وممارسة الألعاب حول بيتها قبيل الحرب، وفي الشوارع المحيطة مثل بقية الأطفال.",
      "في البداية، اعتقدت دعاء أن الطرف الصناعي يمثل فرصة لعودتها إلى اللعب مع إخوتها، غير أنها مع الوقت أدركت صعوبة العودة إلى حياتها قبل الإصابة؛ خصوصًا عندما ترى الأطفال في عمرها يعيشون حياة طبيعية بدون أطراف صناعية، بالإضافة إلى صعوبة فترة التأهيل والعلاج.",
      "تعاني دعاء من حالة نفسية سيئة منذ أن بُتِرت ساقها، رغم محاولة أفراد العائلة التخفيف عنها؛ ومع ذلك، فهي تحتفظ بابتسامتها وبراءتها عند الحديث عن إصابتها، وعن خوفها من أزيز الطائرات، والأعباء المتعلقة بسفرها لتلقي العلاج، أو حاجتها لتغيير الطرف الصناعي دورياً بسبب نمو جسدها.",
      "تحلم دعاء بأن تصبح طبيبة لتساهم في مداواة آلام الناس، متمسكةً بحقها في التمتع بطفولتها، واستخدام السبورة للرسم والتلوين، تمهيدًا للعودة إلى الدراسة بعد الحرب. تتلقى دعاء العلاج في مصر برفقة جديها، وحين تخطو خطوات بسيطة للعب مع أقرانها تغمرها السعادة، الأمر الذي يخفف عنها معاناتها لرؤية الأطفال وهم يجرون من حولها، ويمارسون حياتهم بصورة طبيعية."
    ],
    tags: ["طبيبة المستقبل", "بتر الأطراف", "علاج تأهيلي", "إرادة بطلة", "حق الطفولة"]
},
  {
    id: "hassan",
    country: "السودان",
    flag: "🇸🇩",
    name: "حسن أحمد",
    age: "٦ سنوات",
    title: "حلم الملاذ الآمن",
    subtitle: "عقله وبراءته.. تفوق المحارب",
    dream: "أن ينشئ مكاناً مخصصاً للأطفال يعيشون فيه دون خوف أو ترويع",
    color: "#221911",
    textColors: { primary: "#ffffff", secondary: "#e67e22", bg: "#35271b" },
    images: [
      { src: "./public/assets/images/hassan.jpeg", caption: "حسن ينظر من النافذة متأملاً انتهاء سحب الدخان والدمار" }
    ],
    audioTracks: [],
    quote: "آمن ودافئ.. هكذا أتمنى أن يكون مكان الأطفال دائماً وألا يختبروا الفزع",
    body: [
      "طفولة ضجّت بالحركة والمرح عاشها الطفل السوداني حسن أحمد، ذو الست أعوام، قبل أن تغيّر الحرب حياته بالكامل.",
      "كان يحب المدرسة كثيرًا، ويقضي أوقاته في اللعب والجري كأي طفل في عمره، كما عُرف بنشاطه وحبه للتعلم، خاصة مادة اللغة الإنجليزية التي كان يستمتع بدراستها دائماً.",
      "طفولة سرقتها الحرب: اندلعت الحرب في السودان، وذبُلت حياة حسن، الذي فقد شقيقه فيها، ليجد نفسه وحيدا وسط أجواء الخوف والدمار.",
      "صارت أصوات الانفجارات جزءًا أساسيًا من حياة حسن، إذ كان يستيقظ يوميًا على دوي القصف، ليُصاب بنوبات متكررة من القلق والفزع وهو ما دفع عائلته للفرار إلى مصر.",
      "ومع مرور الوقت، تعلّق حسن بوالدته بشكل أكبر، وأصبح يخشى الابتعاد عنها أو الخروج بمفرده. فقد الفتى شعوره بالأمان، وبات يخاف من الذهاب إلى المدرسة رغم حبه الشديد لها.",
      "ولكن شغفه بالتعلّم دفعه لمواصلة دراسة اللغة الإنجليزية، ولكن هذه المرة في المنزل، الذي يقضي فيه معظم وقته وحيدًا حتى أثناء اللعب.",
      "أمل بريء كطفولته: حلمه كبير، رغم صغر سنه، حيث يتمنى حسن عندما يكبر أن ينشئ مكاناً مخصصاً للأطفال، يستطيعون فيه العيش واللعب دون خوف.",
      "\"آمن ودافئ\"، هكذا يتمنى حسن، أن يكون ذلك المكان، وأن يجد فيه الأطفال من يحتضنهم ويطمئنهم عندما يشعرون بالخوف، تماما كما كان يرغب لنفسه في الحرب."
    ],
    tags: ["السودان", "تجاوز الصدمات", "اللغة الإنجليزية", "فقدان الأمان"]
  },
  {
    id: "ahmed",
    country: "السودان",
    flag: "🇸🇩",
    name: "أحمد حامد يحيى",
    age: "١٣ عامًا",
    title: "مهندس إعادة الإعمار",
    subtitle: "متلازمة القلق.. وحلم البناء",
    dream: "أن يصير مهندساً معمارياً ليساهم في إعادة إعمار بلاده السودان",
    color: "#1d122b",
    textColors: { primary: "#ffffff", secondary: "#9b59b6", bg: "#2d1d42" },
    images: [
      { src: "./public/assets/images/ahmed_sudan1.jpeg", caption: "أحمد يمارس مهارات كرة القدم في شوارع اللجوء الآمنة" }
    ],
    audioTracks: [
      { src: "./public/assets/audio/dreaming_L9GYIEzS.mp3", label: "تسجيل صوتي لأحمد يعبر فيه عن طموحه" }
    ],
    quote: "عشرات العمارات نُسفت، ولكن كلي أمل أن يعود السودان آمنًا كما كان ونبنيه مجدداً",
    body: [
      "أحمد حامد يحيى، البالغ من العمر ثلاثة عشر عامًا، لا تختلف قصته كثيرًا عن حسن. كلاهما كانت حياته طبيعية حتى حلّت الحرب.",
      "يفتقد أحمد مدرسته وأصدقاءه، وتمرين كرة القدم، الذي كان مولعاً به. ويروي تفاصيل تلك الأيام الصعبة قائلًا: \"عاشت عائلتي في عزلة تامة داخل المنزل خوفاً من القصف\".",
      "مراراً حاول أحمد التظاهر بالقوة وعدم الخوف، إلا أن أصوات الضرب والانفجارات القريبة، تركت أثراً نفسياً كبيراً بداخله، وجعلته يخشى الخروج إلى الشارع، حسب تعبيره.",
      "\"حتى بعد لجوئي إلى مصر، لا تزال الكوابيس تلاحقني، أستيقظ على أصوات الانفجارات، وأسترجع اللحظات القاسية\".",
      "يحاول أحمد أن يبدأ حياةً جديدةً، فهو يقضي يومه بين الدراسة وحلّ الواجبات واللعب مع أصدقائه، وكرة القدم التي يصفها بأنها \"مصدر سعادته الأكبر\".",
      "يخفف عنه وطأة الفراق، تواصله الدائم مع أعمامه وخالاته، الذي طال انقطاعه عنهم، بسبب الحرب، ليتمكن من محادثتهم فور وصوله إلى مصر.",
      "بناء الوطن: يحلم أحمد باليوم الذي يصير فيه مهندسًا ليساهم في إعادة إعمار ما دمرته الحرب في وطنه السودان.",
      "ويختم حديثه قائلًا: \"عشرات العمارات والمنشآت نُسفت خلال الحرب، ولكن كلّي أمل أن يعود السودان آمنًا كما كان\"."
    ],
    tags: ["إعادة الأعمار", "عزيمة الشباب", "كرة القدم", "بناء الوطن"]
  }
];

const chartStats = [
  { label: "شهداء غزة الإجمالي", value: 70000, targetPercent: 85, color: "#e74c3c" },
  { label: "المصابين والجرحى الموثقين", value: 170000, targetPercent: 100, color: "#e67e22" },
  { label: "الأطفال المتضررين بالنزاع بالشام والسودان", value: 12500000, targetPercent: 65, color: "#f1c40f" }
];

// ─── ROBUST MULTI-TRACK AUDIO ENGINE ────────────────────────────────
function MultiAudioPlayer({ tracks, accentColor }) {
  const [activeTrack, setActiveTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  if (!tracks || tracks.length === 0) {
    return null;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.load();
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.load();
    }
  }, [activeTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.error("Audio Playback Error:", err);
          setPlaying(false);
        });
    }
  };

  return (
    <div className="multi-audio-box w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="audio-tabs-list flex flex-wrap gap-2 mb-3">
        {tracks.map((track, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTrack(idx)}
            className={`audio-tab-item px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
              activeTrack === idx
                ? "bg-white/20 text-white font-medium ring-1 ring-white/30"
                : "bg-black/30 text-gray-300 hover:bg-white/10"
            }`}
          >
            🔊 {track.label}
          </button>
        ))}
      </div>

      <div className="custom-audio-player flex items-center gap-3 w-full">
        <button
          onClick={togglePlay}
          className="audio-play-btn w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: accentColor || "#ffffff", color: "#000" }}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="audio-timeline-track flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="audio-timeline-fill h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, backgroundColor: accentColor || "#ffffff" }}
          />
        </div>
      </div>
      <audio ref={audioRef} src={tracks[activeTrack]?.src} preload="metadata" />
    </div>
  );
}

// ─── INTERACTIVE CHART INFOGRAPHIC ───────────────────────────────────────────
function InteractiveChart() {
  const chartWrapperRef = useRef(null);

  useEffect(() => {
    const bars = chartWrapperRef.current.querySelectorAll(".chart-bar-fill");
    const counters = chartWrapperRef.current.querySelectorAll(".counter-val");

    gsap.fromTo(bars, { width: "0%" }, {
      width: (i, el) => el.getAttribute("data-percentage"),
      duration: 2, ease: "power3.out",
      scrollTrigger: { trigger: chartWrapperRef.current, start: "top 85%" }
    });

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target, duration: 2.5, ease: "power2.out",
        scrollTrigger: { trigger: chartWrapperRef.current, start: "top 85%" },
        onUpdate: () => { counter.textContent = Math.floor(obj.value).toLocaleString() + "+"; }
      });
    });
  }, []);

  return (
    <section className="interactive-chart-section max-w-4xl mx-auto py-16 px-4 md:px-6" ref={chartWrapperRef}>
      <div className="chart-header-block text-center mb-12">
        <h2 className="font-amiri text-3xl md:text-4xl font-bold mb-2">البيانات والمسوح الميدانية</h2>
        <p className="text-gray-400 text-lg">فاتورة الحروب بالأرقام الإحصائية</p>
      </div>
      <div className="chart-grid-layout flex flex-col gap-6">
        {chartStats.map((stat, idx) => (
          <div key={idx} className="chart-row-item">
            <div className="chart-meta-info flex justify-between items-baseline flex-wrap gap-2">
              <span className="font-medium text-gray-200">{stat.label}</span>
              <span className="counter-val text-xl font-bold" data-target={stat.value}>0</span>
            </div>
            <div className="chart-bar-bg w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="chart-bar-fill h-full rounded-full"
                data-percentage={`${stat.targetPercent}%`}
                style={{ backgroundColor: stat.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── STICKY SHOWCASE SECTION - IMAGES FIRST ON MOBILE, NO CAPTIONS, DOTS AND AGE AT BOTTOM ────────────
function StickyShowcaseSection({ story, index }) {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    if (story.images.length > 1) {
      const interval = setInterval(() => {
        setActiveImgIdx((prev) => (prev + 1) % story.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [story.images.length]);

  useEffect(() => {
    const textElements = textContainerRef.current?.querySelectorAll(".reveal-fade-item");
    if (textElements && textElements.length) {
      gsap.fromTo(textElements, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: textContainerRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%", end: "bottom 50%",
      onEnter: () => gsap.to("body", { backgroundColor: story.color, color: "#fff", duration: 0.6 }),
      onEnterBack: () => gsap.to("body", { backgroundColor: story.color, color: "#fff", duration: 0.6 }),
    });
  }, [story]);

  const hasMultipleImages = story.images.length > 1;

  return (
    <div ref={sectionRef} className="w-full overflow-hidden">
      {/* Mobile Layout: Image First, Text Below */}
      <div className="block lg:hidden">
        {/* Image Section - Full width on mobile */}
        <div className="relative h-[60vh] w-full bg-black overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Ambient Blur Backdrop */}
            {story.images[activeImgIdx] && (
              <img
                src={story.images[activeImgIdx].src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top blur-2xl brightness-50 scale-110 pointer-events-none"
              />
            )}

            {/* Core Media Render */}
            {hasMultipleImages ? (
              <div className="relative z-10 grid grid-cols-2 grid-rows-2 gap-3 w-[90%] h-[80%] p-2">
                {story.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setActiveImgIdx(imgIdx)}
                    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ${
                      activeImgIdx === imgIdx
                        ? "opacity-100 scale-[1.02] ring-2 ring-white/40 shadow-2xl z-10"
                        : "opacity-40 scale-95 grayscale-[20%]"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full p-4 z-10 relative">
                <img
                  src={story.images[0]?.src}
                  alt=""
                  className="w-auto h-full max-h-[85%] object-contain rounded-xl shadow-2xl"
                />
              </div>
            )}

            {/* Flag & Country Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
              <span>{story.flag}</span>
              <span className="text-sm font-medium">{story.country}</span>
            </div>

            {/* Bottom Controls - Dots and Age only (no caption) */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-row items-center justify-center gap-4 z-20">
              {hasMultipleImages && (
                <div className="gallery-navigation-dots flex gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                  {story.images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setActiveImgIdx(imgIdx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeImgIdx === imgIdx ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
                {story.age}
              </div>
            </div>
          </div>
        </div>

        {/* Text Section - Below image on mobile */}
        <div 
          ref={textContainerRef}
          className="w-full p-6 overflow-y-auto"
          style={{ direction: 'rtl' }}
        >
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 pb-8">
            <div className="text-xs font-semibold tracking-wider text-white/70 reveal-fade-item">
              {story.title} — {story.subtitle}
            </div>
            <h2 className="font-amiri text-3xl font-bold leading-tight reveal-fade-item">
              {story.name}
            </h2>
            <div className="font-amiri text-lg italic border-r-2 pr-4 text-gray-200 reveal-fade-item" style={{ borderRightColor: story.textColors?.secondary || "#fff" }}>
              <span className="text-2xl opacity-40 ml-1">“</span>
              {story.quote}
              <span className="text-2xl opacity-40 mr-1">”</span>
            </div>
            <div className="flex flex-col gap-3 reveal-fade-item">
              {story.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-sm text-gray-300 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-4 border-r-4 reveal-fade-item" style={{ borderRightColor: story.textColors?.secondary || "#fff" }}>
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">✦ الحلم المستقبلي:</span>
              <p className="text-base font-medium mt-1">{story.dream}</p>
            </div>
            <div className="flex flex-wrap gap-2 reveal-fade-item">
              {story.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="reveal-fade-item mt-2">
              <MultiAudioPlayer tracks={story.audioTracks} accentColor={story.textColors?.secondary || "#ffffff"} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Image and Text Side by Side with alternating order */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen w-full">
        {/* Image Pane */}
        <div 
          className={`relative lg:sticky lg:top-0 h-screen w-full overflow-hidden bg-black ${
            index % 2 === 0 ? 'order-first' : 'order-last'
          }`}
          style={{ direction: 'ltr' }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {story.images[activeImgIdx] && (
              <img
                src={story.images[activeImgIdx].src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top blur-2xl brightness-50 scale-110 pointer-events-none"
              />
            )}

            {hasMultipleImages ? (
              <div className="relative z-10 grid grid-cols-2 grid-rows-2 gap-4 w-[90%] h-[80%] p-2">
                {story.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => setActiveImgIdx(imgIdx)}
                    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ${
                      activeImgIdx === imgIdx
                        ? "opacity-100 scale-[1.02] ring-2 ring-white/40 shadow-2xl z-10"
                        : "opacity-40 scale-95 grayscale-[20%]"
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full p-6 z-10 relative">
                <img
                  src={story.images[0]?.src}
                  alt=""
                  className="w-auto h-full max-h-[85%] object-contain rounded-xl shadow-2xl"
                />
              </div>
            )}

            <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
              <span>{story.flag}</span>
              <span className="text-sm font-medium">{story.country}</span>
            </div>

            {/* Bottom Controls - Dots and Age only (no caption) */}
            <div className="absolute bottom-6 left-0 right-0 flex flex-row items-center justify-center gap-4 z-20">
              {hasMultipleImages && (
                <div className="flex gap-2 bg-black/50 px-4 py-2 rounded-full">
                  {story.images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setActiveImgIdx(imgIdx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeImgIdx === imgIdx ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm whitespace-nowrap">
                {story.age}
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Content Panel - Desktop */}
        <div 
          ref={textContainerRef}
          className={`flex items-start w-full p-12 overflow-y-auto overflow-x-hidden ${
            index % 2 === 0 ? 'order-last' : 'order-first'
          }`}
          style={{ direction: 'rtl', maxHeight: '100vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="w-full max-w-xl mx-auto flex flex-col gap-6 pb-8">
            <div className="text-sm font-semibold tracking-wider text-white/70 reveal-fade-item">
              {story.title} — {story.subtitle}
            </div>
            <h2 className="font-amiri text-5xl lg:text-6xl font-bold leading-tight reveal-fade-item">
              {story.name}
            </h2>
            <div className="font-amiri text-xl italic border-r-3 pr-4 text-gray-200 reveal-fade-item" style={{ borderRightColor: story.textColors?.secondary || "#fff" }}>
              <span className="text-2xl opacity-40 ml-1">“</span>
              {story.quote}
              <span className="text-2xl opacity-40 mr-1">”</span>
            </div>
            <div className="flex flex-col gap-3 reveal-fade-item">
              {story.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-base text-gray-300 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-5 border-r-4 reveal-fade-item hover:bg-white/10 transition-all duration-300" style={{ borderRightColor: story.textColors?.secondary || "#fff" }}>
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">✦ الحلم المستقبلي:</span>
              <p className="text-lg font-medium mt-1">{story.dream}</p>
            </div>
            <div className="flex flex-wrap gap-2 reveal-fade-item">
              {story.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="reveal-fade-item mt-2">
              <MultiAudioPlayer tracks={story.audioTracks} accentColor={story.textColors?.secondary || "#ffffff"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO SECTION (KEEP ORIGINAL HEADER IMAGE) ───────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-animate'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <section ref={heroRef} className="premium-fullscreen-hero relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="hero-parallax-bg-layer absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://cdn.observer.co.uk/media/original_images/18005.jpeg')", backgroundSize: 'cover' }} />
      <div className="hero-center-content-box relative z-10 max-w-3xl px-6 md:px-8">
        <div className="hero-animate text-amber-500 text-sm md:text-base font-bold mb-3 tracking-wider">ملف استقصائي عابر للوسائط</div>
        <h1 className="hero-animate font-amiri text-5xl sm:text-7xl md:text-8xl font-bold leading-tight">أطفال الحروب</h1>
        <p className="hero-animate text-gray-300 text-base md:text-lg mt-6 max-w-2xl mx-auto">
          موقع توثيقي يجمع الكلمة الصادقة، الصورة الفوتوغرافية الانسيابية، والتسجيلات الحية لأطفال غزة والسودان في تجربة تفاعلية غامرة.
        </p>
      </div>
    </section>
  );
}

// ─── MASTER ENTRY APPLICATION VIEW ───────────────────────────────────────────
export default function App() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = stories[0]?.color || "#0f1e2d";
    document.body.style.color = "#ffffff";
    document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div className="app-root w-full overflow-x-hidden">
      <HeroSection />
      <InteractiveChart />
      {stories.map((story, index) => (
        <StickyShowcaseSection key={story.id} story={story} index={index} />
      ))}

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .single-showcase-img {
          opacity: 1 !important;
        }
        .hero-animate {
          will-change: transform, opacity;
        }
        .reveal-fade-item {
          will-change: transform, opacity;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.2s ease;
        }
      `}</style>
    </div>
  );
}