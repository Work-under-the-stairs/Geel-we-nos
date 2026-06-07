import React, { useState, useRef } from 'react';
import {
  FaBookReader,
  FaPlaneDeparture,
  FaCloudShowersHeavy,
  FaRunning,
  FaDraftingCompass,
  FaPlay,
  FaPause,
  FaLightbulb,
  FaCode,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import CrossmediaFooter from '../../components/crossmedia1/Footer';

const AhmedStory = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const timelineData = [
    {
      id: 1,
      tag: "البداية في السودان",
      title: "حياة طبيعية وتفوق دراسي لا ينسى",
      description: "كان أحمد (13 عاماً) يعيش حياة مليئة بالشغف، يذهب إلى مدرسته يومياً ويحافظ على تفوقه ليكون من أوائل الطلاب. بين كتبه المدرسية، كان يعشق الرسم ولعب كرة القدم في الدوريات المدرسية مع أصدقاء طفولته.",
      icon: <FaBookReader className="text-blue-400" />,
      image: "/assets/images/ahmed_sudan1.jpeg"
    },
    {
      id: 2,
      tag: "نقطة التحول",
      title: "اندلاع الحرب والنزوح المفاجئ",
      description: "انقلبت حياته رأساً على عقب مع اندلاع الحرب. أجبرت العائلة على العزلة داخل المنزل تحت أصوات الانفجارات والقصف المستمر، مما تركه في حالة خوف دائم وقلق من الخروج، قبل أن يضطر لمغادرة بلده والابتعاد عن كل من يحب.",
      icon: <FaPlaneDeparture className="text-rose-400" />,
      image: "https://static01.nyt.com/images/2023/05/11/multimedia/11sudan-1-pmtf/11sudan-1-pmtf-videoSixteenByNineJumbo1600.jpg"
    },
    {
      id: 3,
      tag: "التحدي النفسي",
      title: "أحمد يلازمه القلق والكوابيس",
      description: "حتى بعد وصوله إلى مصر كلاجئ، لم تتركه الحرب بسلام. كان يستيقظ على كوابيس مفزعة تعيده إلى مربعات الخوف وأصوات الانفجارات القاسية في السودان, متظاهراً بالقوة أمام عائلته بينما يخوض معركته النفسية الصامتة.",
      icon: <FaCloudShowersHeavy className="text-purple-400" />,
      image: "/assets/images/kabous.png"
    },
    {
      id: 4,
      tag: "الأمل الجديد",
      title: "بداية حياة جديدة في مصر",
      description: "رغم الألم، قرر أحمد ألا يستسلم. عاد إلى مقاعد الدراسة، ونظم يومه بدقة بين المذاكرة واللعب. عاد إلى المستطيل الأخضر في النادي ليمارس كرة القدم التي تمثل مصدر سعادته الأكبر، واستعاد أخيراً التواصل مع عائلته المشتتة.",
      icon: <FaRunning className="text-emerald-400" />,
      image: "/assets/images/ahmed_new.png"
    },
    {
      id: 5,
      tag: "حلم الغد",
      title: "الهندسة حلمه.. وبناء وطنه أمله",
      description: "لم تمحُ الحرب أحلام أحمد؛ بل صقلتها. يتمسك اليوم بحلمه الكبير في أن يصبح مهندساً معمارياً ليعود يوماً ويساهم في إعادة إعمار ما دمرته الحرب في السودان، ويبني المنشآت والعمارات ليعود وطنه آمناً كما كان.",
      icon: <FaDraftingCompass className="text-amber-400" />,
      image: "https://img.freepik.com/premium-photo/civil-engineer-stands-looking-construction-site-with-sunset_15083-2098.jpg",
      hasAudio: true,
      audioSrc: "/assets/audio/dreaming_L9GYIEzS.mp3"
    }
  ];

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgressBarChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0e1e2c] font-sans antialiased text-slate-200" dir="rtl">

      <style>{`
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 24px; }
        }
        .animate-wave-bar {
          animation: soundWave 1.2s ease-in-out infinite;
        }
      `}</style>

      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="torn-paper-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.03,0.04 
              C 0.15,0.01 0.22,0.06 0.35,0.02 
              C 0.45,-0.01 0.52,0.05 0.62,0.01 
              C 0.75,0.04 0.88,-0.01 0.97,0.03 
              C 0.99,0.15 0.96,0.25 0.98,0.38 
              C 1.01,0.48 0.95,0.58 0.97,0.72 
              C 0.96,0.82 1.00,0.92 0.96,0.97 
              C 0.85,0.95 0.72,0.99 0.60,0.96 
              C 0.48,0.98 0.38,0.94 0.25,0.97 
              C 0.15,0.99 0.08,0.94 0.02,0.96 
              C 0.04,0.85 0.01,0.72 0.03,0.60 
              C -0.01,0.48 0.04,0.35 0.01,0.22 
              C 0.04,0.12 0.01,0.06 0.03,0.04 Z
            " />
          </clipPath>
        </defs>
      </svg>

      <header className="relative h-screen bg-gradient-to-b from-[#1a3147] via-[#0e1e2c] to-[#0e1e2c] flex flex-col items-center justify-center overflow-hidden px-4">
        <div style={{
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat"
        }} className="absolute inset-0 opacity-10 bg-[url('https://www.al-monitor.com/sites/default/files/styles/article_header/public/2025-04/GettyImages-2206286551.jpg?h=3d905b72&itok=I8NLU1zG')] bg-cover bg-center"></div>

        <div className="relative z-10 text-center max-w-4xl">
          <span className="bg-blue-500/10 text-blue-300 px-5 py-2 rounded-full text-xs font-semibold border border-blue-500/20 uppercase tracking-wider">
            قصتي • رحلتي • حلمي
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 mb-6 tracking-tight leading-tight">
            الهندسة حلمه.. <br className="hidden md:block" /> وبناء وطنه أمله
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            حكاية الطفل السوداني أحمد حامد، البالغ من العمر 13 عاماً، الذي غيرت الحرب واقعه لكنها عجزت عن هدم طموحه وإصراره.
          </p>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30">
          <svg className="block w-full h-[90px] md:h-[130px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44C58.3,10.25,0,0,0,0V120H1200V0c0,0-93.34,58.09-256.88,58.09-110.78,0-203.88-39.79-321.73-39.79C487.2,18.3,432.49,75.24,321.39,56.44Z" fill="#0e1e2c" />
          </svg>
        </div>
      </header>

      <main className="py-20 overflow-hidden">

        <div className="max-w-5xl mx-auto px-6 mb-20 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl text-xl border border-blue-500/20">
            <FaDraftingCompass />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">أحمد المحارب</h2>
            <p className="text-blue-300/60 text-sm mt-1">محطات حاسمة شكلت عزيمة مهندس المستقبل</p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto pr-10 pl-6 md:px-6 space-y-32">
          <div className="absolute right-4 md:right-1/2 top-4 bottom-4 w-[2px] bg-none border-r-2 border-dashed border-blue-500/30 transform md:translate-x-1/2"></div>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <section key={item.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>


                <div className="absolute right-[-31px] md:right-1/2 top-4 bg-[#0e1e2c] p-1 rounded-full border border-blue-900/60 transform md:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-[#0e1e2c] rounded-full border-2 border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]"></div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full aspect-[4/3] group transition-transform duration-500 hover:scale-[1.01]">
                    <div className="absolute inset-0 bg-black/50 blur-[4px] translate-x-2 translate-y-2 pointer-events-none" style={{ clipPath: "url(#torn-paper-clip)" }}></div>
                    <div className="w-full h-full relative overflow-hidden" style={{ clipPath: "url(#torn-paper-clip)" }}>
                      <div className="absolute inset-0 z-20 pointer-events-none opacity-25 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/rough-paper.png')]"></div>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top relative z-10 contrast-[101%] brightness-[98%] group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-30 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 text-right">
                  <div className="flex items-center gap-3 mb-4 justify-start">
                    <span className="text-blue-400 text-lg">{item.icon}</span>
                    <span className="text-[11px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-md">{item.tag}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-6">{item.description}</p>

                  {item.hasAudio && (
                    <div className="mt-6 p-4 bg-[#14283b] border border-blue-900/40 rounded-2xl max-w-md shadow-lg shadow-black/20 flex items-center gap-4">

                      <audio
                        ref={audioRef}
                        src={item.audioSrc}
                        onLoadedMetadata={handleLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleAudioEnded}
                      />

                      <button
                        onClick={toggleAudio}
                        className="w-11 h-11 rounded-xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white text-sm shadow-md shadow-blue-500/20 transition-colors flex-shrink-0 z-10"
                      >
                        {isPlaying ? <FaPause /> : <FaPlay className="mr-0.5" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5 h-6 select-none">
                          <div className="text-xs font-semibold text-blue-300">
                            {isPlaying ? "جاري الاستماع لقصة أحمد..." : "تسجيل صوتي: أحمد يروي حلمه"}
                          </div>

                          {/* إشارة الحركة الموجية الصوتية */}
                          <div className="flex items-center gap-[3px] h-6 px-1" dir="ltr">
                            {[
                              { delay: '0.1s', h: 'h-2' },
                              { delay: '0.4s', h: 'h-4' },
                              { delay: '0.2s', h: 'h-5' },
                              { delay: '0.6s', h: 'h-3' },
                              { delay: '0.3s', h: 'h-1' },
                              { delay: '0.5s', h: 'h-4' },
                              { delay: '0.2s', h: 'h-2' }
                            ].map((bar, i) => (
                              <span
                                key={i}
                                className={`w-[3px] bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-wave-bar' : bar.h
                                  }`}
                                style={{ animationDelay: isPlaying ? bar.delay : '0s' }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3" dir="ltr">
                          <span className="text-[10px] font-mono text-slate-400 min-w-[30px] text-left select-none">
                            {formatTime(currentTime)}
                          </span>

                          <div className="flex-1 relative flex items-center">
                            <input
                              type="range"
                              min="0"
                              max={duration || 100}
                              value={currentTime}
                              onChange={handleProgressBarChange}
                              className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-400 outline-none"
                              style={{
                                background: `linear-gradient(to right, #3b82f6 ${progressPercent}%, #1e293b ${progressPercent}%)`
                              }}
                            />
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 min-w-[30px] text-right select-none">
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-32 border-t border-blue-950/40 pt-12 flex justify-center items-center gap-4">


          <a
            href="/cross-media/hassan"
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#14283b] hover:bg-[#1a334d] border border-blue-900/40 text-slate-300 hover:text-white transition-all duration-300 group shadow-lg shadow-black/10"
          >
            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">القصة السابقة</span>
              <span className="text-sm font-semibold">حسن المحارب</span>
            </div>
          </a>


        </div>
      </main>

      <CrossmediaFooter />

    </div>
  );
};

export default AhmedStory;